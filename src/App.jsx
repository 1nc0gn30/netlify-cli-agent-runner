import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './app/AppShell'
import theme from './app/theme'
import ClientDashboard from './routes/ClientDashboard'
import ClientProjects from './routes/ClientProjects'
import ClientActions from './routes/ClientActions'
import ClientProfile from './routes/ClientProfile'
import DeveloperDashboard from './routes/DeveloperDashboard'
import DeveloperProjects from './routes/DeveloperProjects'
import DeveloperQueue from './routes/DeveloperQueue'
import DeveloperGuardrails from './routes/DeveloperGuardrails'
import DeveloperProfile from './routes/DeveloperProfile'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/client" replace />} />
            <Route path="client" element={<ClientDashboard />} />
            <Route path="client/projects" element={<ClientProjects />} />
            <Route path="client/actions" element={<ClientActions />} />
            <Route path="client/profile" element={<ClientProfile />} />
            <Route path="developer" element={<DeveloperDashboard />} />
            <Route path="developer/projects" element={<DeveloperProjects />} />
            <Route path="developer/queue" element={<DeveloperQueue />} />
            <Route path="developer/guardrails" element={<DeveloperGuardrails />} />
            <Route path="developer/profile" element={<DeveloperProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
