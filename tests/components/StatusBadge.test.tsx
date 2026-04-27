import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/components/StatusBadge/StatusBadge'

describe('StatusBadge', () => {
  it('renders the severity label', () => {
    render(<StatusBadge severity="critical" />)
    expect(screen.getByText('Critical')).toBeInTheDocument()
  })

  it('renders all severity levels', () => {
    const { rerender } = render(<StatusBadge severity="critical" />)
    expect(screen.getByText('Critical')).toBeInTheDocument()

    rerender(<StatusBadge severity="high" />)
    expect(screen.getByText('High')).toBeInTheDocument()

    rerender(<StatusBadge severity="medium" />)
    expect(screen.getByText('Medium')).toBeInTheDocument()

    rerender(<StatusBadge severity="low" />)
    expect(screen.getByText('Low')).toBeInTheDocument()
  })

  it('applies animate-pulse class when pulse=true', () => {
    render(<StatusBadge severity="critical" pulse />)
    const dot = document.querySelector('.animate-pulse')
    expect(dot).toBeTruthy()
  })
})
