import MenuIcon from '@mui/icons-material/Menu'
import ShieldMoonIcon from '@mui/icons-material/ShieldMoon'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'

const navGroups = [
  {
    label: 'Client',
    items: [
      { label: 'Dashboard', path: '/client', icon: '📊' },
      { label: 'Projects', path: '/client/projects', icon: '🛠️' },
      { label: 'Actions', path: '/client/actions', icon: '⚡' },
      { label: 'Profile', path: '/client/profile', icon: '🙂' },
    ],
  },
  {
    label: 'Developer',
    items: [
      { label: 'Dashboard', path: '/developer', icon: '🧭' },
      { label: 'Projects', path: '/developer/projects', icon: '📁' },
      { label: 'Request Queue', path: '/developer/queue', icon: '📥' },
      { label: 'Guardrails', path: '/developer/guardrails', icon: '🛡️' },
      { label: 'Profile', path: '/developer/profile', icon: '👤' },
    ],
  },
]

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const currentLabel = useMemo(() => {
    const flat = navGroups.flatMap((group) => group.items)
    return flat.find((item) => item.path === location.pathname)?.label || 'Workspace'
  }, [location.pathname])

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShieldMoonIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
          Netlify Agent Portals
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {navGroups.map((group) => (
          <Box key={group.label} sx={{ px: 1, py: 1 }}>
            <Typography variant="overline" color="text.secondary" sx={{ px: 2 }}>
              {group.label}
            </Typography>
            <List disablePadding>
              {group.items.map((item) => (
                <ListItemButton
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{ borderRadius: 2, mx: 1, my: 0.5 }}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2 }}>
        <Tooltip title="Agents keep production steady while you experiment.">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>A</Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Agent Runner
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Always-on safety net
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          {!isMdUp && (
            <IconButton edge="start" color="inherit" onClick={() => setMobileOpen((prev) => !prev)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {currentLabel}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Calm. Guided. Safe.
            </Typography>
            <Avatar src="https://avatars.githubusercontent.com/u/7892489?v=4" alt="Netlify" />
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: 260 }, flexShrink: { md: 0 } }} aria-label="navigation">
        <Drawer
          variant={isMdUp ? 'permanent' : 'temporary'}
          open={isMdUp ? true : mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 260,
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppShell
