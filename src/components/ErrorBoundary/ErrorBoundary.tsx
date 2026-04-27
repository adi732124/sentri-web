import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    return { hasError: true, message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}
          >
            <AlertTriangle size={22} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-h)]">Something went wrong</div>
            <div className="mt-1 text-xs text-[var(--text)]">{this.state.message}</div>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, message: '' })}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] transition-colors hover:text-[var(--text-h)]"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
