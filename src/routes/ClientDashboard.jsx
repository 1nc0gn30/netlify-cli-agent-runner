import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded'
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useMemo, useState } from 'react'
import ActionCard from '../components/cards/ActionCard'
import ActionDrawer from '../components/drawers/ActionDrawer'
import ClientLayout from '../components/ClientLayout'
import { clientActions, clientActivity, clientProjects } from '../data/mockClientData'

const metricCards = [
  {
    title: 'Agent coverage',
    value: '94%',
    caption: 'Requests mediated',
    icon: <ShieldBadge />, // placeholder replaced below
  },
  {
    title: 'Human assists',
    value: '3 pending',
    caption: 'Developers on call',
    icon: <PeopleAltRoundedIcon color="primary" />,
  },
  {
    title: 'Deploy locks',
    value: 'Active',
    caption: 'Live events protected',
    icon: <TimelineRoundedIcon color="primary" />,
  },
]

function ShieldBadge() {
  return <InsightsRoundedIcon color="primary" />
}

function ClientDashboard() {
  const [selectedAction, setSelectedAction] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activityFeed, setActivityFeed] = useState(clientActivity)

  const highlightedProjects = useMemo(() => clientProjects.slice(0, 2), [])

  const handleOpen = (action) => {
    setSelectedAction(action)
    setDrawerOpen(true)
  }

  const handleConfirm = (mode) => {
    if (!selectedAction) return
    setActivityFeed((prev) => [
      {
        id: `${selectedAction.id}-${Date.now()}`,
        actor: 'Agent Runner',
        action: `${mode === 'dry' ? 'Dry run' : 'Run'} — ${selectedAction.title}`,
        status: mode === 'dry' ? 'Simulation' : 'Executing',
        timestamp: 'Just now',
      },
      ...prev,
    ])
    setDrawerOpen(false)
  }

  const handleRouteToHuman = () => {
    if (!selectedAction) return
    setActivityFeed((prev) => [
      {
        id: `${selectedAction.id}-human-${Date.now()}`,
        actor: 'You',
        action: `Routed to developer — ${selectedAction.title}`,
        status: 'Waiting',
        timestamp: 'Just now',
      },
      ...prev,
    ])
    setDrawerOpen(false)
  }

  return (
    <ClientLayout subtitle="Guided paths for stakeholders. Agents keep changes reversible.">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Grid container spacing={2} columns={{ xs: 1, md: 12 }}>
          {[0, 1, 2].map((index) => {
            const metric = metricCards[index]
          return (
            <Grid key={metric.title} size={{ xs: 12, md: 4 }}>
              <Card elevation={0}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Stack spacing={0.5}>
                      <Typography variant="overline" color="text.secondary">
                        {metric.title}
                      </Typography>
                      <Typography variant="h5" fontWeight={800}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metric.caption}
                      </Typography>
                    </Stack>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                      {metric.icon}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Card elevation={0}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Stack spacing={0.5} flex={1}>
              <Typography variant="h6" fontWeight={800}>
                Guided actions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Safe, non-technical controls. Agents keep production calm and reversible.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Chip label="Preview safe" color="success" variant="outlined" />
              <Chip label="Rollback ready" color="primary" variant="outlined" />
            </Stack>
          </Stack>

          <Grid container spacing={2} columns={{ xs: 1, sm: 12 }} sx={{ mt: 1 }}>
            {clientActions.map((action) => (
              <Grid key={action.id} size={{ xs: 12, sm: 4 }}>
                <ActionCard action={action} onSelect={handleOpen} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2} columns={{ xs: 1, md: 12 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Live activity
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Shared stream across clients and developers.
              </Typography>
              <Stack spacing={1.5}>
                {activityFeed.map((item) => (
                  <Stack key={item.id} direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'transparent', border: 1, borderColor: 'divider' }}>
                      {item.actor === 'You' ? '🙋' : '🤖'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {item.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.actor} • {item.timestamp}
                      </Typography>
                    </Box>
                    <Chip label={item.status} size="small" variant="outlined" color="primary" />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Guarded projects
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Agents enforce the rules so changes stay calm.
              </Typography>
              <Stack spacing={1.5}>
                {highlightedProjects.map((project) => (
                  <Stack key={project.name} spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                        {project.name.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {project.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {project.guardrails}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={project.status} size="small" color="primary" variant="outlined" />
                      <Chip label={`Last deploy ${project.lastDeployed}`} size="small" variant="outlined" />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ActionDrawer
        open={drawerOpen}
        action={selectedAction}
        onClose={() => setDrawerOpen(false)}
        onConfirm={handleConfirm}
        onRoute={handleRouteToHuman}
      />
      </Box>
    </ClientLayout>
  )
}

export default ClientDashboard
