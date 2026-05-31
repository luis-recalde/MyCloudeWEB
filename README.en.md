# MyCloudeWEB

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/luis-recalde/MyCloudeWEB?style=social)](https://github.com/luis-recalde/MyCloudeWEB/stargazers)
[![Forks](https://img.shields.io/github/forks/luis-recalde/MyCloudeWEB?style=social)](https://github.com/luis-recalde/MyCloudeWEB/network/members)

**Your professional website, live today. No code. No agency. No waiting.**

Answer a few questions about your business. The AI writes the code, designs the site, and guides you through deployment — all in one session.

---

## What You Get

- A complete **Next.js 14** website with your real content and branding
- **Tailwind CSS** design system tuned to your industry and style
- Full **mobile responsiveness** out of the box
- **SEO metadata** configured with your business information
- Step-by-step guidance to deploy for free on **Vercel**

---

## Demo

### The process

![The agent asking about your business in plain language](docs/screenshots/Preguntas.png)
*The AI guides you through 4 rounds of questions — no technical knowledge required.*

![The agent generating all the code automatically](docs/screenshots/Construyendo.png)
*Once you approve the design, the AI writes every file. You don't touch anything.*

### The result — RS Games Club, built with MyCloudeWEB

![RS Games Club — hero section](docs/screenshots/hero-rsgames.png)
*Hero section with custom branding, color palette, and CTA tailored to the business.*

![RS Games Club — about section](docs/screenshots/nosotros-rsgames.png)
*About section generated from the questionnaire answers — no Lorem ipsum.*

![RS Games Club — services section](docs/screenshots/servicios-rsgames.png)
*Services section with real content and layout chosen for the industry.*

![RS Games Club — contact section](docs/screenshots/contacto-rsgames.png)
*Contact section with every channel the client provided, including WhatsApp.*

---

## Prerequisites

You only need two things installed:

- [Node.js 18+](https://nodejs.org) — the JavaScript runtime
- [Claude Code](https://claude.ai/code) — the AI coding assistant

No web development experience needed.

---

## How to Use

### 1. Clone this repository

```bash
git clone https://github.com/luis-recalde/MyCloudeWEB.git
cd MyCloudeWEB
```

### 2. Open Claude Code

```bash
claude
```

Or open it from your IDE or the Claude desktop app.

### 3. Say hello

Just type a message in your language — English or Spanish — and the AI takes it from there.

Examples:
- *"Hi, I want to build my website"*
- *"Hola, quiero armar mi sitio web"*

### 4. Answer the questions

The AI asks about your business in 4 short rounds:
- Your business identity and value proposition
- Your visual style and brand colors
- What sections and content you want
- Technical setup (domain, language, analytics)

No technical knowledge required. Answer in plain language.

### 5. Approve your design

Before building, the AI presents a complete design system — colors, fonts, and page structure — for your approval. Request changes or approve and proceed.

### 6. Wait while it builds

The AI generates all the code, installs dependencies, and verifies the build. You don't touch anything.

### 7. Preview locally

Open `http://localhost:3000` in your browser and review your site.

### 8. Deploy to Vercel

The AI walks you through pushing to GitHub and deploying on Vercel's free plan. Your site is live in minutes.

---

## Project Structure

```
MyCloudeWEB/
├── CLAUDE.md                   # AI agent instructions (the brain)
├── docs/
│   ├── questionnaire-en.md     # Business questionnaire (English)
│   ├── questionnaire-es.md     # Business questionnaire (Spanish)
│   ├── design-guide.md         # Color palettes, typography, layouts
│   └── deploy-guide.md         # Vercel deployment guide
├── README.md                   # Spanish README
└── README.en.md                # This file
```

When the AI builds your site, it creates a new folder named after your business inside this directory.

---

## Supported Industries

The design guide includes tailored palettes, typography, and layouts for:

- Technology & SaaS
- Health & Wellness
- Education & Coaching
- Food & Hospitality
- Professional Services (law, consulting, finance)
- Creative Services (design, photography, branding)

---

## Languages

The entire experience runs in English or Spanish, detected automatically from your first message.

---

## FAQ

**Do I need to know how to code?**
No. The AI writes all the code. You only answer questions about your business.

**Is this really free?**
Yes. Claude Code has a free tier. Vercel's Hobby plan is free and sufficient for a professional site. You only pay if you buy a custom domain.

**Can I edit the code afterward?**
Absolutely. The generated code is standard Next.js + Tailwind. Any developer can maintain and extend it.

**What if I want changes after the site is built?**
Open Claude Code in the generated project folder and describe what you want in plain language.

---

## Contributing

Contributions are welcome. Here is how to participate:

**Report a bug or suggest a feature**
Open an issue on [GitHub Issues](https://github.com/luis-recalde/MyCloudeWEB/issues). Describe what happened, what you expected, and your environment (OS, Node.js version, Claude Code version).

**Submit a pull request**
1. Fork the repository and create a branch: `git checkout -b fix/your-fix-name`
2. Keep the PR focused on one change — small and reviewable
3. Open a pull request with a clear description of what you changed and why

For large changes, open an issue first to discuss the approach before writing code.

---

## License

MIT License — Copyright Luis Recalde 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions: the above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
