import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AlertBanner } from '@/components/AlertBanner/AlertBanner'

describe('AlertBanner', () => {
  it('renders children', () => {
    render(<AlertBanner>Test message</AlertBanner>)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<AlertBanner title="Alert title">body</AlertBanner>)
    expect(screen.getByText('Alert title')).toBeInTheDocument()
  })

  it('shows dismiss button when dismissible=true', () => {
    render(<AlertBanner dismissible>msg</AlertBanner>)
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument()
  })

  it('hides after dismiss click', async () => {
    render(<AlertBanner dismissible>visible</AlertBanner>)
    await userEvent.click(screen.getByLabelText('Dismiss'))
    expect(screen.queryByText('visible')).not.toBeInTheDocument()
  })
})


