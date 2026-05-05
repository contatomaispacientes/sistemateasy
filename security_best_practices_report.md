# Security Best Practices Report — Sistemateasy

**Data:** 2026-04-28
**Stack auditada:** Next.js 16.2.4 (App Router) · React 19.2.4 · TypeScript 5 · Tailwind 4
**Escopo:** baseline estática do código atual (`app/`, `components/`, `lib/`, `next.config.ts`, `package.json`, `.gitignore`).
**Auditor:** Claude Code (skill `security-best-practices` + `vulnerability-scanner`)

---

## Sumário executivo

A landing institucional tem **superfície de ataque hoje próxima de zero**: não há formulários, autenticação, sessões, cookies, API Routes, Server Actions, banco de dados, ou qualquer chamada `fetch` para destino dinâmico. Todo o conteúdo é estático ou render server-side a partir de constantes hard-coded. Isso é o ponto de partida ideal.

A auditoria identificou **2 itens de prioridade Média** (cabeçalhos de segurança ausentes e uma vuln transitiva do `postcss`) e **3 notas de prioridade Baixa** (placeholders, observações operacionais). Nenhum item Crítico ou Alto.

| Severidade | Quantidade |
|------------|-----------:|
| Critical   | 0          |
| High       | 0          |
| Medium     | 2          |
| Low        | 2          |
| Info       | 4          |
| Falso-positivo | 1      |

Como o projeto está em fase pre-launch e ainda vai ganhar features (formulário de contato, possivelmente API Routes/auth), a recomendação principal é **fixar os headers de segurança agora** — assim qualquer feature futura já nasce protegida por defense-in-depth.

---

## Findings

### M-001 — Cabeçalhos de segurança HTTP ausentes (Medium)

**Regras:** `NEXT-HEADERS-001`, `NEXT-CSP-001`, `REACT-HEADERS-001`, `REACT-CSP-001`

**Localização:** [next.config.ts:1-11](next.config.ts#L1-L11)

**Evidência:**
```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
```

E na resposta do servidor (verificado via `curl -I localhost:3000`):
```
HTTP/1.1 200 OK
Vary: rsc, ...
Cache-Control: no-cache, must-revalidate
X-Powered-By: Next.js
Content-Type: text/html; charset=utf-8
```

Não há `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, nem clickjacking defense (`frame-ancestors` ou `X-Frame-Options`).

**Impacto:** Sem CSP, qualquer XSS futuro (introduzido por escape-hatch tipo `dangerouslySetInnerHTML`, conteúdo de CMS, etc.) tem impacto máximo. Sem `X-Content-Type-Options: nosniff`, navegadores podem inferir tipos perigosos. Sem `frame-ancestors`/`X-Frame-Options`, o site pode ser embedado em `<iframe>` em domínios maliciosos (clickjacking).

**Fix sugerido:** adicionar `headers()` no `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next dev usa eval; em produção considere remover unsafe-eval
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://images.unsplash.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};
```

**Mitigation se imediato:** se o app vai ficar atrás de Vercel/Cloudflare/Nginx em produção, a mesma config pode ser feita lá no edge. Mas ter no `next.config.ts` cobre todos os ambientes (dev, preview, prod) sem depender de infra.

**Notas:** o CSP acima ainda permite `unsafe-inline` e `unsafe-eval` em scripts — necessário porque o `motion`/`@paper-design/shaders-react` injetam estilos inline e o WebGL em dev compila shaders dinamicamente. Para produção endurecida, considere migrar para nonce-based CSP (Next.js tem [guia oficial](https://nextjs.org/docs/app/guides/content-security-policy)). Como não há render de HTML user-controlled hoje, o risco residual é baixo.

---

### M-002 — Vulnerabilidade transitiva no `postcss` (<8.5.10) — moderate (Medium)

**Regras:** `NEXT-SUPPLY-001`, `REACT-SUPPLY-001`

**Localização:** `package-lock.json` → `node_modules/next/node_modules/postcss`

**Evidência:**
```json
"postcss": {
  "severity": "moderate",
  "via": [{
    "title": "PostCSS has XSS via Unescaped </style> in its CSS Stringify Output",
    "url": "https://github.com/advisories/GHSA-qx2v-qp2m-jg93",
    "cwe": ["CWE-79"], "cvss": { "score": 6.1 },
    "range": "<8.5.10"
  }]
}
```

**Impacto:** vulnerabilidade está numa cópia de `postcss` que vem **bundled dentro do `next`** como dep transitiva. O CVE só importa se PostCSS estiver processando CSS de origem não-confiável — em build time o CSS é todo nosso (Tailwind + globals), então o risco prático aqui é baixo. O `npm audit` sugere "fix" rebaixando para `next 9.3.3`, o que é absurdo (perderia toda a stack atual). 

**Fix sugerido:** **aguardar** o release do Next.js que atualize a dep transitiva. Verificar periodicamente:
```bash
npm outdated next
npm audit
```
E quando sair `next 16.x` patch que atualize `postcss` ≥8.5.10, atualizar.

**Mitigation:** como o PostCSS só roda em build (não recebe CSS do usuário em runtime), a exploração prática é virtualmente nula nesse projeto. Aceitar e monitorar.

**False positive notes:** considerar este "no-op" enquanto não houver feature que processe CSS user-supplied (ex: editor visual, theming dinâmico). Se isso aparecer no roadmap, priorizar resolução.

---

### L-001 — `lucide-react ^1.11.0` (RESOLVIDO — falso-positivo)

**Status:** ❌ Falso-positivo, nenhuma ação necessária.

**Verificado em 2026-04-28:**
```
$ npm view lucide-react dist-tags
{ latest: '1.11.0' }

$ npm ls lucide-react
sistemateasy-app@0.1.0
`-- lucide-react@1.11.0
```

A biblioteca lucide-react fez major bump `0.577.0` → `1.0.0` → `1.11.0` no histórico recente. **Estamos no `latest` estável.** A suspeita inicial (de que `1.x` indicava versionamento incomum) estava baseada em conhecimento desatualizado do registry.

---

### L-002 — Placeholder `WHATSAPP_URL = "#contato"` e social links `href="#"` (Low / Info)

**Regras:** `REACT-URL-001`, `REACT-REDIRECT-001`

**Localização:** [app/page.tsx:13](app/page.tsx#L13), [components/Footer.tsx](components/Footer.tsx)

**Evidência:**
```ts
const WHATSAPP_URL = "#contato";
```
E social links no Footer com `href: "#"` (Instagram, LinkedIn, GitHub).

**Impacto:** nada hoje. Quando você substituir esses placeholders por URLs reais (ex: `https://wa.me/55119...`, `https://instagram.com/sistemateasy`), **se** essas URLs vierem de input/CMS/env futuramente, valide:
- scheme: aceitar só `https:` (e `mailto:`/`tel:` quando intencional)
- bloquear `javascript:` e `data:`
- considerar adicionar `rel="noopener noreferrer"` se usar `target="_blank"` (anti-tabnabbing)

**Fix sugerido (futuro):** quando colocar URLs reais e abrir em nova aba:
```tsx
<a href={url} target="_blank" rel="noopener noreferrer">...</a>
```

Hoje todos `href` são strings literais hard-coded ou `#anchor` — sem risco.

---

### L-003 — `package.json` script `dev` usa `next dev` — só dev, não produção (Low / Info)

**Regras:** `NEXT-DEPLOY-001`

**Localização:** [package.json:6-9](package.json#L6-L9)

**Evidência:**
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

**Impacto:** nenhum hoje. Só virou flag se em produção for executado `npm run dev` em vez de `npm run build && npm run start`. Em Vercel/plataforma gerenciada, isso já é tratado automaticamente.

**Fix sugerido:** quando deployar, garantir `NODE_ENV=production` e usar `npm start` (não `npm run dev`).

---

## Verificações que passaram (reportadas como Info — boas práticas já em vigor)

### I-001 — Sem sinks de XSS no código de aplicação ✅

Grep em `app/` + `components/` + `lib/` por `dangerouslySetInnerHTML`, `__html`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval(`, `new Function`, `DOMParser`, `createContextualFragment` retornou **zero matches**. Toda renderização de texto vai pelo escape default do React.

### I-002 — Zero exposição de secrets / env vars ✅

- `.env*` listado em `.gitignore` linha 34 ✅
- Nenhum `process.env` referenciado em `app/` ou `components/` ✅
- Nenhum prefixo `NEXT_PUBLIC_*` definido ✅
- Nenhum dump de configuração para o cliente

### I-003 — Sem armazenamento de tokens em Web Storage ✅

Grep por `localStorage`, `sessionStorage`, `setItem`, `getItem` em código de aplicação: zero matches. Não há autenticação no projeto ainda, mas o caminho está limpo para adotar HttpOnly cookies quando vier.

### I-004 — Image allowlist configurado ✅

[next.config.ts:5-7](next.config.ts#L5-L7) restringe `next/image` a `images.unsplash.com` via `remotePatterns`. Bom isolamento — qualquer URL de imagem fora dessa lista é rejeitada por Next.js.

---

## Não aplicável (zero superfície hoje)

| Categoria | Status |
|---|---|
| API Routes / Server Actions | Nenhum criado — `NEXT-CSRF-001`, `NEXT-AUTH-001`, `NEXT-ACTION-001` N/A |
| Sessões / Cookies | N/A (`NEXT-SESS-001`, `NEXT-SESS-002`) |
| Validação de input | N/A — sem input do usuário (`NEXT-INPUT-001`) |
| File uploads / path traversal | N/A (`NEXT-FILES-001`, `NEXT-PATH-001`) |
| SSRF | N/A — zero `fetch()` (`NEXT-SSRF-001`) |
| Open redirect | N/A — zero `redirect()` baseado em input (`NEXT-REDIRECT-001`, `REACT-REDIRECT-001`) |
| CORS | N/A (`NEXT-CORS-001`) |
| SQL/Command injection | N/A — sem DB nem `child_process` (`NEXT-INJECT-001`, `NEXT-INJECT-002`) |
| postMessage | N/A (`REACT-POSTMSG-001`) |
| Service Worker | N/A (`REACT-SW-001`) |
| Third-party scripts | N/A — fontes via `next/font/google` (self-hosted no build), zero `<script src>` externo (`REACT-3P-001`, `REACT-SRI-001`) |

---

## Próximos passos sugeridos (priorizados)

1. **Adicionar headers de segurança em `next.config.ts`** (resolve M-001) — 5 minutos, altíssimo ROI defense-in-depth
2. **Verificar e atualizar `lucide-react`** (resolve L-001) — 2 minutos
3. **Marcar M-002 (`postcss`) como aceito** e configurar `npm audit` no CI pra alertar quando o Next.js liberar patch
4. **Quando adicionar formulário de contato/auth/API Routes**, voltar pra revisão completa com `vulnerability-scanner` e `pentest-checklist` aplicados ativamente

Posso aplicar o fix do M-001 agora se quiser — só dizer.
