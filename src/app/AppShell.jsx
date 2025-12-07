import MenuIcon from '@mui/icons-material/Menu'
import ShieldMoonIcon from '@mui/icons-material/ShieldMoon'
import { AppBar, Avatar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import PortalSwitcher from '../components/PortalSwitcher'
import { usePortal } from './PortalContext'

const navMap = {
  client: [
    { label: 'Dashboard', path: '/client', icon: '📊' },
    { label: 'Projects', path: '/client/projects', icon: '🛠️' },
    { label: 'Actions', path: '/client/actions', icon: '⚡' },
    { label: 'Profile', path: '/client/profile', icon: '🙂' },
  ],
  developer: [
    { label: 'Dashboard', path: '/developer', icon: '🧭' },
    { label: 'Projects', path: '/developer/projects', icon: '📁' },
    { label: 'Request Queue', path: '/developer/queue', icon: '📥' },
    { label: 'Guardrails', path: '/developer/guardrails', icon: '🛡️' },
    { label: 'Profile', path: '/developer/profile', icon: '👤' },
  ],
}

function AppShell() {
  const { portalMode, setPortalMode, lastVisited, setLastVisited } = usePortal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  useEffect(() => {
    if (location.pathname.startsWith('/client')) {
      setPortalMode('client')
    } else if (location.pathname.startsWith('/developer')) {
      setPortalMode('developer')
    }
  }, [location.pathname, setPortalMode])

  useEffect(() => {
    if (!portalMode) return
    const prefix = `/${portalMode}`
    if (location.pathname.startsWith(prefix)) {
      setLastVisited((prev) => (prev[portalMode] === location.pathname ? prev : { ...prev, [portalMode]: location.pathname }))
    }
  }, [location.pathname, portalMode, setLastVisited])

  const navItems = useMemo(() => navMap[portalMode] || [], [portalMode])

  const currentLabel = useMemo(() => {
    const flat = Object.values(navMap).flat()
    return flat.find((item) => item.path === location.pathname)?.label || 'Workspace'
  }, [location.pathname])

  const handleSwitch = (mode) => {
    if (!mode || mode === portalMode) return
    setPortalMode(mode)
    const target = lastVisited[mode] || `/${mode}`
    navigate(target)
  }

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShieldMoonIcon color="primary" />
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Agent Portals
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Calm + reversible
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2 }}>
        <PortalSwitcher value={portalMode || 'client'} onChange={handleSwitch} size="small" condensed />
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {navItems.length > 0 && (
          <List disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{ borderRadius: 2, mx: 2, my: 0.5 }}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2 }}>
        <Tooltip title="Agents keep production steady while you experiment.">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', width: 36, height: 36 }}>A</Avatar>
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
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.8)' }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {!isMdUp && (
            <IconButton edge="start" color="inherit" onClick={() => setMobileOpen((prev) => !prev)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Stack spacing={0.5}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>
                {portalMode ? `${portalMode === 'client' ? 'Client' : 'Developer'} portal` : 'Portal'}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {currentLabel}
              </Typography>
            </Stack>
          </Box>
          <PortalSwitcher value={portalMode || 'client'} onChange={handleSwitch} size="small" />
          <Tooltip title="Profile + context">
            <Avatar src="https://avatars.githubusercontent.com/u/7892489?v=4" alt="Netlify" sx={{ border: 1, borderColor: 'divider' }} />
          </Tooltip>
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
              backdropFilter: 'blur(6px)',
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
