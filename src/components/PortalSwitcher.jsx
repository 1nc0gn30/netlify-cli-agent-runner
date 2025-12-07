import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded'
import { Chip, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

function PortalSwitcher({ value, onChange, size = 'medium', condensed = false }) {
  return (
    <Stack spacing={0.5} alignItems="flex-end">
      {!condensed && (
        <Typography variant="caption" color="text.secondary">
          Workspace
        </Typography>
      )}
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, next) => next && onChange(next)}
        size={size === 'small' ? 'small' : 'medium'}
        color="primary"
        aria-label="Portal switcher"
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: condensed ? 0 : 2,
          '& .MuiToggleButton-root': {
            borderRadius: 3,
            textTransform: 'none',
            px: condensed ? 1.5 : 2,
            gap: 0.75,
          },
        }}
      >
        <ToggleButton value="client" aria-label="Client Portal">
          <AutoAwesomeRoundedIcon fontSize="small" color="primary" />
          <Stack spacing={0} alignItems="flex-start">
            <Typography variant="body2" fontWeight={700}>
              Client
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Guided
            </Typography>
          </Stack>
          <Chip size="small" label="Calm" color="success" variant="outlined" sx={{ ml: 0.5 }} />
        </ToggleButton>
        <ToggleButton value="developer" aria-label="Developer Portal">
          <ConstructionRoundedIcon fontSize="small" color="secondary" />
          <Stack spacing={0} alignItems="flex-start">
            <Typography variant="body2" fontWeight={700}>
              Developer
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Control
            </Typography>
          </Stack>
          <Chip size="small" label="Full" color="secondary" variant="outlined" sx={{ ml: 0.5 }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}

export default PortalSwitcher
