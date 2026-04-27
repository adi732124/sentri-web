import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Button, Card, Badge, Input, Avatar } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>Edit <code>src/App.tsx</code> and save to test <code>HMR</code></p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setCount((c) => c + 1)}
        >
          Count is {count}
        </Button>
      </section>

      <div className="ticks"></div>

      {/* Component showcase */}
      <section id="next-steps" style={{ flexDirection: 'column', gap: 40, padding: '32px 24px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 0 }}>Component Library</h2>

        {/* Buttons */}
        <Card title="Button" description="4 variants · 3 sizes · loading & disabled states">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" loading>Saving…</Button>
            <Button variant="ghost" disabled>Disabled</Button>
          </div>
        </Card>

        {/* Badges */}
        <Card title="Badge" description="5 semantic variants with optional dot indicator">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning">Degraded</Badge>
            <Badge variant="error">Outage</Badge>
            <Badge variant="info">Beta</Badge>
            <Badge variant="neutral">Draft</Badge>
          </div>
        </Card>

        {/* Avatars */}
        <Card title="Avatar" description="5 sizes · initials fallback · 4 status indicators">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Avatar name="Aditya Kumar" size="xl" status="online" />
            <Avatar name="Vivek S" size="lg" status="busy" />
            <Avatar name="John D" size="md" status="away" />
            <Avatar name="Anna B" size="sm" status="offline" />
            <Avatar name="X" size="xs" />
          </div>
        </Card>

        {/* Input */}
        <Card title="Input" description="Label · hint · error · icon slots">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
            <Input
              label="Email address"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hint="We'll never share your email."
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error="Password must be at least 8 characters."
            />
          </div>
        </Card>

        {/* Cards */}
        <Card title="Card" description="Composable container with header, body, and footer">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            <Card title="Bordered" description="Default card style" bordered>
              Body content here.
            </Card>
            <Card title="Shadow" description="Elevated card" shadow bordered={false}>
              Body content here.
            </Card>
            <Card
              title="With footer"
              description="Actions in the footer"
              footer={
                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Save</Button>
                </div>
              }
            >
              Confirmation content.
            </Card>
          </div>
        </Card>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
