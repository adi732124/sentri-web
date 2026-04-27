import './PageLoader.css'

export interface PageLoaderProps {
  /** Inline skeleton instead of full-page overlay */
  inline?: boolean
}

export function PageLoader({ inline = false }: PageLoaderProps) {
  return (
    <div className={inline ? 'page-loader page-loader--inline' : 'page-loader'} aria-busy="true" aria-label="Loading page">
      <div className="page-loader__skeleton">
        {/* Topbar skeleton */}
        {!inline && <div className="page-loader__bar" />}

        <div className="page-loader__content">
          {/* Sidebar skeleton */}
          {!inline && (
            <div className="page-loader__sidebar">
              <div className="skeleton skeleton--title" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton skeleton--nav" />
              ))}
            </div>
          )}

          {/* Main content skeleton */}
          <div className="page-loader__main">
            <div className="skeleton skeleton--heading" />
            <div className="skeleton skeleton--subtitle" />

            <div className="page-loader__cards">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="page-loader__card">
                  <div className="skeleton skeleton--card-title" />
                  <div className="skeleton skeleton--line" />
                  <div className="skeleton skeleton--line skeleton--line-short" />
                </div>
              ))}
            </div>

            <div className="skeleton skeleton--block" />
          </div>
        </div>
      </div>
    </div>
  )
}
