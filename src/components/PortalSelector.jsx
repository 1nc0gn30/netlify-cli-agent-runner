import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ShieldMoonIcon from '@mui/icons-material/ShieldMoon'
import { Box, Card, CardActionArea, Chip, Divider, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortal } from '../app/PortalContext'

const cards = [
  {
    id: 'client',
    title: 'Client Portal',
    tone: 'Guided workspace',
    summary: 'Non-technical control with guardrails always on.',
    accent: 'linear-gradient(135deg, #e8f5e9, #f8fbff)',
    chips: ['Preview safe', 'Rollback ready', 'Human-friendly'],
  },
  {
    id: 'developer',
    title: 'Developer Portal',
    tone: 'Control + governance',
    summary: 'Queues, guardrails, and publishing controls in one place.',
    accent: 'linear-gradient(135deg, #f3e8ff, #f9f5ff)',
    chips: ['Full visibility', 'Guardrails', 'Ship presets'],
  },
]

function PortalSelector() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()
  const { setPortalMode } = usePortal()

  const handleSelect = (mode) => {
    setSelected(mode)
    setPortalMode(mode)
    window.setTimeout(() => {
      navigate(`/${mode}`)
    }, 200)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, md: 6 },
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(63, 81, 181, 0.06), transparent 28%), radial-gradient(circle at 80% 0%, rgba(0, 150, 136, 0.05), transparent 30%)',
      }}
    >
      <Stack spacing={3} sx={{ width: '100%', maxWidth: 1100 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Stack spacing={0.5} flex={1}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
              Choose your workspace
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1.1 }}>
              Netlify Agent Portals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Step into the space that matches your role. Switch anytime without losing context.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main' }}>
            <ShieldMoonIcon />
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Calm. Guided. Safe.
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={2} columns={{ xs: 1, md: 12 }}>
          {cards.map((card) => {
            const isActive = selected === card.id
            return (
              <Grid key={card.id} size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    backgroundImage: card.accent,
                    borderRadius: 3,
                    transition: 'transform 200ms ease, box-shadow 200ms ease',
                    transform: isActive ? 'scale(0.99)' : 'scale(1)',
                    boxShadow: isActive ? 6 : 1,
                  }}
                >
                  <CardActionArea
                    onClick={() => handleSelect(card.id)}
                    sx={{ height: '100%', p: { xs: 3, md: 4 } }}
                  >
                    <Stack spacing={2.5} alignItems="flex-start">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={card.id === 'client' ? 'Client' : 'Developer'}
                          color={card.id === 'client' ? 'success' : 'secondary'}
                          variant="filled"
                          size="small"
                          sx={{ fontWeight: 700, borderRadius: 2 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {card.tone}
                        </Typography>
                      </Stack>
                      <Stack spacing={0.5}>
                        <Typography variant="h4" fontWeight={800}>
                          {card.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {card.summary}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {card.chips.map((chip) => (
                          <Chip key={chip} label={chip} variant="outlined" sx={{ borderRadius: 2 }} />
                        ))}
                      </Stack>
                      <Divider flexItem />
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main' }}>
                        <ArrowForwardRoundedIcon />
                        <Typography variant="body2" fontWeight={700}>
                          {card.id === 'client' ? 'Try Client Portal' : 'Try Developer Portal'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Stack>

      {selected && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.04), transparent 50%)',
            animation: 'fadeOut 320ms ease forwards',
            '@keyframes fadeOut': { to: { opacity: 0 } },
          }}
        />
      )}
    </Box>
  )
}

export default PortalSelector
