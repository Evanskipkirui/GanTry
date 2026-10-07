import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from '@/app/router'
import { TenantProvider } from '@/context/TenantContext.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TenantProvider>
      <RouterProvider router={router} />
    </TenantProvider>
  </StrictMode>,
)
