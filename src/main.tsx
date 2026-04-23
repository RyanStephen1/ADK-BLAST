import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import App from './app/App.tsx'
import { routes } from './app/routes.tsx'

export const createRoot = ViteReactSSG(
  {
    routes,
    component: App,
  },
  ({ isClient }) => {
    if (isClient) {
      // Client-side initialization
    }
  }
)
