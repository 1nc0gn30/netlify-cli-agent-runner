import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import BlurOnRoundedIcon from '@mui/icons-material/BlurOnRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded'
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import { AppBar, Avatar, Box, Card, CardContent, Chip, Container, IconButton, Stack, Switch, Tooltip, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import PortalSwitcher from '../components/PortalSwitcher'
import ClientLayout from '../components/ClientLayout'
import DeveloperLayout from '../components/DeveloperLayout'
import { usePortal } from './PortalContext'
import {
  agentDirectory,
  clientActivity,
  clientProfile as profileDefaults,
  clientProjects,
  guidedActions,
  projectTemplates,
} from '../data/mockClientData'
import { developerProjects, guardrails, requestQueue } from '../data/mockDeveloperData'
import ClientProfileCard from '../components/ClientProfileCard'
import AgentLookup from '../components/AgentLookup'
import TemplateGallery from '../components/TemplateGallery'
import GuidedActions from '../components/GuidedActions'
import ActivityFeed from '../components/ActivityFeed'
import ActionDrawer from '../components/drawers/ActionDrawer'

function AppShell() {
  const { portalMode, setPortalMode } = usePortal()
  const [flowGuarded, setFlowGuarded] = useState(true)
  const [profile, setProfile] = useState(profileDefaults)
  const [activity, setActivity] = useState(clientActivity)
  const [selectedAction, setSelectedAction] = useState(null)
  const [actionDrawerOpen, setActionDrawerOpen] = useState(false)

  const accent = useMemo(
    () =>
      portalMode === 'developer'
        ? 'linear-gradient(135deg, rgba(103, 58, 183, 0.08), rgba(63, 81, 181, 0.04))'
        : 'linear-gradient(135deg, rgba(56, 142, 60, 0.08), rgba(129, 199, 132, 0.05))',
    [portalMode]
  )

  const handleSwitch = (mode) => {
    if (!mode || mode === portalMode) return
    setPortalMode(mode)
  }

  const handleActionLog = (action) => {
    setActivity((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: 'Agent Runner',
        action,
        status: 'Stable',
        timestamp: 'Just now',
        detail: `${profile.businessName} preferences applied automatically`,
      },
      ...prev,
    ])
  }

  const handleQuickAction = (action) => {
    setSelectedAction(action)
    setActionDrawerOpen(true)
  }

  const handleQuickConfirm = (mode) => {
    setActionDrawerOpen(false)
    handleActionLog(`${mode === 'dry' ? 'Dry run —' : 'Started —'} ${selectedAction?.title}`)
  }

  const handleQuickRoute = () => {
    setActionDrawerOpen(false)
    handleActionLog(`Routed — ${selectedAction?.title}`)
  }

  const clientContent = (
    <ClientLayout subtitle="Guided actions with reversible changes">
      <Stack spacing={2.5} sx={{ animation: 'fadeIn 300ms ease' }}>
        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={800}>
                  Calm overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Agents keep previews safe while you approve.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip label="Preview ready" color="success" variant="outlined" />
                <Chip label="Rollback on" color="primary" variant="outlined" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <ClientProfileCard profile={profile} onUpdate={setProfile} />

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <AgentLookup agents={agentDirectory} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TemplateGallery templates={projectTemplates} />
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Card elevation={0} sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <BlurOnRoundedIcon color="success" />
                <Typography variant="subtitle1" fontWeight={800}>
                  Quick handoffs
                </Typography>
              </Stack>
              <Stack spacing={1.25}>
                {guidedActions.slice(0, 3).map((action) => (
                  <Card
                    key={action.id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      p: 1.5,
                      background: 'linear-gradient(120deg, rgba(129,199,132,0.08), rgba(255,255,255,0.9))',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleQuickAction(action)}
                  >
                    <Typography variant="subtitle1" fontWeight={700}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.summary}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Chip label="Dry run" size="small" color="success" variant="outlined" />
                      <Chip label="Safe by default" size="small" variant="outlined" />
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <SecurityRoundedIcon color="success" />
                <Typography variant="subtitle1" fontWeight={800}>
                  Guarded projects
                </Typography>
              </Stack>
              <Stack spacing={1.25}>
                {clientProjects.slice(0, 3).map((project) => (
                  <Stack key={project.name} spacing={0.5} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.25 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.light', color: 'success.dark', fontWeight: 700 }}>
                        {project.name.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {project.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {project.guardrails}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={project.status} size="small" color="success" variant="outlined" />
                      <Chip label={`Last deployed ${project.lastDeployed}`} size="small" variant="outlined" />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <GuidedActions actions={guidedActions} onLog={handleActionLog} />

        <ActivityFeed activity={activity} />

        <ActionDrawer
          open={actionDrawerOpen}
          action={selectedAction}
          onClose={() => setActionDrawerOpen(false)}
          onConfirm={handleQuickConfirm}
          onRoute={handleQuickRoute}
        />
      </Stack>
    </ClientLayout>
  )

  const developerContent = (
    <DeveloperLayout subtitle="Controls, guardrails, and live queues">
      <Stack spacing={2.5} sx={{ animation: 'fadeIn 300ms ease' }}>
        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={800}>
                  Deployment posture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Switch contexts without losing queues.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography variant="body2" color="text.secondary">
                  Guarded flows
                </Typography>
                <Switch checked={flowGuarded} onChange={(e) => setFlowGuarded(e.target.checked)} color="secondary" />
                <Chip label={flowGuarded ? 'Locks on' : 'Locks off'} size="small" color={flowGuarded ? 'secondary' : 'default'} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Card elevation={0} sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <TuneRoundedIcon color="secondary" />
                <Typography variant="subtitle1" fontWeight={800}>
                  Guardrails
                </Typography>
              </Stack>
              <Stack spacing={1}>
                {guardrails.slice(0, 4).map((rule) => (
                  <Stack
                    key={rule.id}
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.25, bgcolor: rule.active ? 'secondary.50' : 'background.paper' }}
                  >
                    <ToggleOffRoundedIcon color={rule.active ? 'secondary' : 'disabled'} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {rule.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rule.detail}
                      </Typography>
                    </Box>
                    <Chip label={rule.active ? 'Active' : 'Paused'} size="small" color={rule.active ? 'secondary' : 'default'} variant="outlined" />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <SettingsEthernetRoundedIcon color="secondary" />
                <Typography variant="subtitle1" fontWeight={800}>
                  Request queue
                </Typography>
              </Stack>
              <Stack spacing={1.25}>
                {requestQueue.map((item) => (
                  <Stack key={item.id} spacing={0.5} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.25 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" fontWeight={700}>
                        {item.client}
                      </Typography>
                      <Chip label={item.risk} size="small" color={item.risk === 'Low' ? 'success' : 'warning'} variant="outlined" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {item.request}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.eta}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <AutoGraphRoundedIcon color="secondary" />
                <Typography variant="subtitle1" fontWeight={800}>
                  Active projects
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip label="Canary" size="small" variant="outlined" color="secondary" />
                <Chip label="Approvals" size="small" variant="outlined" color="secondary" />
              </Stack>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} sx={{ mt: 2 }}>
              {developerProjects.map((project) => (
                <Card key={project.name} variant="outlined" sx={{ flex: 1, borderRadius: 2, p: 1.5 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle1" fontWeight={800}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.approval}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={project.status} size="small" color="secondary" variant="outlined" />
                      <Chip label={project.access} size="small" variant="outlined" />
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </DeveloperLayout>
  )

  return (
    <Box
      className="app-shell"
      sx={{
        minHeight: '100vh',
        backgroundImage: accent,
        transition: 'background-image 240ms ease',
      }}
    >
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.85)' }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2} py={1.5}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
              <IconButton size="small" sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
                <SecurityRoundedIcon color={portalMode === 'developer' ? 'secondary' : 'success'} fontSize="small" />
              </IconButton>
              <Stack spacing={0}>
                <Typography variant="caption" color="text.secondary">
                  Agent portals
                </Typography>
                <Typography variant="subtitle1" fontWeight={800}>
                  {portalMode === 'developer' ? 'Developer' : 'Client'} mode
                </Typography>
              </Stack>
            </Stack>
            <PortalSwitcher value={portalMode} onChange={handleSwitch} />
            <Tooltip title="Profile">
              <Avatar src="https://avatars.githubusercontent.com/u/7892489?v=4" alt="Netlify" sx={{ border: 1, borderColor: 'divider' }} />
            </Tooltip>
          </Stack>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        {portalMode === 'client' && clientContent}
        {portalMode === 'developer' && developerContent}
      </Container>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  )
}

export default AppShell
