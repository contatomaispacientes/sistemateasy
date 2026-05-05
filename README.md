# Sistemateasy — Website Institucional

Site institucional da **Sistemateasy**, empresa brasileira de tecnologia especializada em SaaS, sites de alta performance e suporte 24/7. Construído com Next.js 16, React 19, animações avançadas e efeitos 3D.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Componentes](#componentes)
- [Sistema de Design](#sistema-de-design)
- [Configuração de Segurança](#configuração-de-segurança)
- [Deploy](#deploy)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## Visão Geral

O site é uma landing page de alta performance com as seguintes seções:

| Seção | Descrição |
|---|---|
| `IntroOverlay` | Animação de entrada com handoff suave |
| `Nav` | Barra de navegação sticky com efeito glass |
| `Hero` | Headline animada, slider e métricas de prova social |
| `Partners` | Carrossel infinito com logos de clientes |
| `Services` | Vitrine dos 3 serviços principais |
| `About` | Missão e valores da empresa |
| `Cases` | Grade interativa de cases com hover expansion |
| `CTA` | Chamada para ação final |
| `Footer` | Contato, redes sociais e links |

---

## Stack Tecnológica

### Core

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.4 | Framework principal (App Router) |
| [React](https://react.dev/) | 19.2.4 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |

### Estilo

| Tecnologia | Versão | Uso |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utilitários CSS |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Classes condicionais |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.5.0 | Merge de classes sem conflito |
| [class-variance-authority](https://cva.style/) | 0.7.1 | Variantes de componentes |

### Animação e Motion

| Tecnologia | Versão | Uso |
|---|---|---|
| [Motion](https://motion.dev/) | 12.38.0 | Animações declarativas (Framer Motion) |
| [GSAP](https://gsap.com/) | 3.15.0 | Animações imperativas de alta performance |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3.23 | Smooth scroll com física |

### 3D e Gráficos

| Tecnologia | Versão | Uso |
|---|---|---|
| [Three.js](https://threejs.org/) | 0.184.0 | WebGL e gráficos 3D |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 9.6.0 | Three.js com React |
| [Paper Design Shaders React](https://github.com/paper-design/shaders) | 0.0.76 | Efeitos visuais com shaders |

### Ícones e UI

| Tecnologia | Versão | Uso |
|---|---|---|
| [Lucide React](https://lucide.dev/) | 1.11.0 | Biblioteca de ícones SVG |
| [react-use-measure](https://github.com/pmndrs/react-use-measure) | 2.1.7 | Medição de elementos DOM |

---

## Pré-requisitos

- **Node.js** >= 18.x (recomendado 20.x LTS)
- **npm** >= 9.x
- **Git**

Verifique sua versão do Node:

```bash
node -v
```

---

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/contatomaispacientes/sistemateasy.git

# 2. Entre na pasta
cd sistemateasy

# 3. Instale as dependências
npm install
```

---

## Rodando o Projeto

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O servidor reinicia automaticamente a cada alteração (HMR).

### Build de Produção

```bash
# Gera o build otimizado
npm run build

# Inicia o servidor de produção
npm start
```

### Lint

```bash
npm run lint
```

---

## Estrutura de Pastas

```
sistemateasy/
├── app/
│   ├── page.tsx              # Página principal com todas as seções
│   ├── layout.tsx            # Layout raiz — fontes, metadata, providers
│   └── globals.css           # Variáveis de tema, estilos base, scrollbar
│
├── components/
│   ├── Nav.tsx               # Barra de navegação
│   ├── Hero.tsx              # Seção hero
│   ├── Partners.tsx          # Carrossel de logos
│   ├── Services.tsx          # Serviços oferecidos
│   ├── About.tsx             # Missão e valores
│   ├── Cases.tsx             # Portfólio de cases
│   ├── CTA.tsx               # Chamada para ação
│   ├── Footer.tsx            # Rodapé
│   ├── Logo.tsx              # Componente de logotipo
│   ├── Icons.tsx             # Ícones SVG customizados
│   ├── IntroOverlay.tsx      # Overlay de animação de entrada
│   ├── MotionProvider.tsx    # Contexto do Motion
│   ├── LenisProvider.tsx     # Contexto do Lenis (smooth scroll)
│   ├── MeshGradient.tsx      # Background 3D com Three.js
│   ├── HeroSlider.tsx        # Carrossel do hero
│   └── ui/                   # Biblioteca de componentes base
│       ├── neon-button.tsx
│       ├── Reveal.tsx
│       ├── Counter.tsx
│       ├── Parallax.tsx
│       ├── BouncingHeadline.tsx
│       ├── PulsingDot.tsx
│       ├── infinite-slider.tsx
│       ├── progressive-blur.tsx
│       ├── section-with-mockup.tsx
│       ├── background-paper-shaders.tsx
│       ├── project-showcase.tsx
│       └── hover-footer.tsx
│
├── lib/
│   └── utils.ts              # Utilitário cn() para merge de classes
│
├── public/                   # Assets estáticos
│   ├── sistemateasy.svg
│   ├── sistemateasy-logo.svg
│   ├── Wandahortamelhorada.png
│   ├── Endostarmelhorada.png
│   ├── CBTmelhorada.png
│   └── Avanceaidark.png
│
├── next.config.ts            # Configuração do Next.js (CSP, headers, imagens)
├── tailwind.config.ts        # Configuração do Tailwind
├── tsconfig.json             # Configuração do TypeScript
├── postcss.config.ts         # Configuração do PostCSS
└── package.json
```

---

## Componentes

### Componentes de Página

#### `Nav.tsx`
Barra de navegação sticky com efeito glass-morphism (blur + saturate).
- Links internos: Serviços, Sobre, Cases, Contato
- Botão de WhatsApp com estilo neon no canto direito

#### `Hero.tsx`
Seção principal com headline animada, slider rotativo e métricas de prova social.
- `BouncingHeadline` com stagger de animação linha por linha
- `HeroSlider` com 3 cenas de demonstração em rotação automática
- Contadores animados: 50+ projetos, suporte 24/7, 98% de satisfação
- Efeito `Parallax` no slider rastreando o scroll

#### `Partners.tsx`
Carrossel infinito com logos de empresas clientes.
- Loop contínuo com `InfiniteSlider` (sem CSS animation — rAF puro)
- Blur progressivo nas bordas com `ProgressiveBlur`
- Logos atuais: Wanda Horta, Endostar, CBT, Avance AI

**Para adicionar uma nova logo:**
1. Coloque o arquivo PNG em `/public/`
2. Adicione um item ao array `PARTNERS` em `components/Partners.tsx`:

```tsx
{ src: "/nome-do-arquivo.png", alt: "Nome da Empresa" }
```

#### `Services.tsx`
Apresenta os 3 serviços principais com layout alternado imagem/texto.
- SaaS — plataformas escaláveis de 1 a milhões de usuários
- Sites & Landing Pages — performance e conversão
- Suporte 24/7 — monitoramento e resposta a incidentes

#### `About.tsx`
Missão da empresa e 4 valores fundamentais com ícones.
- Suporte 24/7
- Entrega Previsível (sprints de 2 semanas)
- Design Autêntico
- Foco em Resultados (métricas claras desde o início)

#### `Cases.tsx`
Grade de cases interativa com expansão ao hover (desktop).
- 4 cases: ERP Cloud, Portal Inovação, FinTrack App, Vitrine Digital
- Efeito parallax na imagem rastreando a posição do cursor
- Stack de tecnologias e métricas de resultado por case

#### `CTA.tsx`
Caixa de conversão final com gradiente e botão de WhatsApp.

#### `Footer.tsx`
Rodapé completo com 4 colunas responsivas.
- Empresa, Suporte, Contato, Redes Sociais
- `TextHoverEffect` com texto grande animado no fundo
- `FooterBackgroundGradient` com gradiente animado
- Grid responsivo: 1 coluna (mobile) → 4 colunas (desktop)

---

### Componentes de UI (`components/ui/`)

| Componente | Props principais | Descrição |
|---|---|---|
| `Reveal` | `delay`, `y`, `children` | Fade-in + slide-up ao entrar na viewport |
| `Counter` | `to`, `suffix`, `delay` | Número animado do zero até o valor alvo |
| `Parallax` | `range`, `children` | Deslocamento baseado no scroll |
| `BouncingHeadline` | `lines`, `startDelay` | Headline multi-linha com animação cascata |
| `PulsingDot` | `delay` | Indicador animado com pulso contínuo |
| `InfiniteSlider` | `duration`, `gap`, `reverse` | Carrossel com loop infinito via rAF |
| `ProgressiveBlur` | `direction`, `blurIntensity` | Fade direcional nas bordas |
| `SectionWithMockup` | `title`, `description`, `reverseLayout` | Layout alternado texto + imagens |
| `neon-button` | — | Botão com brilho neon ao hover |

---

## Sistema de Design

### Cores

Definidas em `app/globals.css` como variáveis CSS:

```css
:root {
  --background:  #0a0a0b;  /* Preto quase puro — fundo principal */
  --foreground:  #ffffff;  /* Branco — texto padrão */
  --accent:      #e8713a;  /* Laranja — cor de destaque e CTAs */
  --accent-deep: #c45a28;  /* Laranja escuro — hover dos CTAs */
}
```

### Tipografia

| Variável CSS | Fonte | Uso |
|---|---|---|
| `--font-gloock` | Gloock (serif) | Títulos e headlines |
| `--font-gelasio` | Gelasio (sans) | Corpo de texto e UI |

Carregadas via `next/font/google` em `app/layout.tsx` sem requisição extra ao browser.

### Utilitário `cn()`

Função em `lib/utils.ts` que combina `clsx` + `tailwind-merge`:

```typescript
import { cn } from "@/lib/utils";

// px-4 sobrescreve px-2 automaticamente, sem duplicação de classes
cn("px-2 py-1", condition && "px-4", "text-white")
```

---

## Configuração de Segurança

O arquivo `next.config.ts` aplica headers de segurança em todas as rotas:

| Header | Valor | Proteção |
|---|---|---|
| `Content-Security-Policy` | Restringe origens de scripts, estilos e imagens | XSS |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Vazamento de URL |
| `Permissions-Policy` | Câmera, microfone e geolocalização bloqueados | Acesso a dispositivos |
| `X-Frame-Options` | `DENY` | Clickjacking |

> **Nota para produção:** O CSP atual permite `unsafe-inline` e `unsafe-eval` nos scripts para suportar o HMR do Next.js e compilação de shaders em desenvolvimento. Ao estabilizar o build, substitua por nonces para maior segurança em produção.

---

## Deploy

O projeto é otimizado para deploy na **Vercel** (plataforma nativa do Next.js).

### Vercel (recomendado)

1. Acesse [vercel.com](https://vercel.com) e importe o repositório `contatomaispacientes/sistemateasy`
2. Nenhuma variável de ambiente é necessária na configuração atual
3. Clique em **Deploy** — a Vercel detecta Next.js automaticamente

### Outras plataformas (VPS, Docker)

```bash
# Gerar build
npm run build

# Iniciar servidor de produção na porta padrão (3000)
npm start

# Porta customizada
PORT=8080 npm start
```

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera o build de produção otimizado |
| `npm start` | Inicia o servidor de produção (requer build) |
| `npm run lint` | Executa o ESLint em todo o projeto |

---

## Licença

Projeto privado — todos os direitos reservados à **Sistemateasy**.
