import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { PageLoader } from '@/components/PageLoader/PageLoader'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { queryClient } from '@/lib/queryClient'
import { useAuthStore } from '@/stores/auth.store'
import type { ReactNode } from 'react'

// ─── Lazy pages ───────────────────────────────────────────────────────────────
const PublicLayout = lazy(() => import('@/layouts/PublicLayout'))
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const FeaturesPage = lazy(() => import('@/pages/FeaturesPage'))
const ArchitecturePage = lazy(() => import('@/pages/ArchitecturePage'))
const StackPage = lazy(() => import('@/pages/StackPage'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Incidents = lazy(() => import('@/pages/Incidents'))
const Services = lazy(() => import('@/pages/Services'))
const OnCall = lazy(() => import('@/pages/OnCall'))
const Settings = lazy(() => import('@/pages/Settings'))

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token)
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth routes (unauthenticated) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected app routes */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/services" element={<Services />} />
              <Route path="/oncall" element={<OnCall />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Public marketing routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/stack" element={<StackPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg)',
              color: 'var(--text-h)',
              border: '1px solid var(--border)',
              fontSize: '13px',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
