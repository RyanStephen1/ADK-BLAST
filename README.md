# ADK-BLAST (ADK Industrial Portal)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Tech Stack
- React + TypeScript + Vite

## Form Setup
- The homepage inquiry form now posts to `/api/contact` and sends email through Resend.
- Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in your Vercel project environment variables.
- `CONTACT_FROM_EMAIL` must use a sender domain verified in Resend.

---
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
