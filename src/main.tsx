import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './app/routes.tsx'

export const createRoot = ViteReactSSG(
  {
    routes,
  },
  ({ isClient }: { isClient: boolean }) => {
    if (isClient) {
      // Client-side initialization
    }
  }
)
