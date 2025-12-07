import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

function PortalSwitcher({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, next) => next && onChange(next)}
      color="primary"
      aria-label="Portal switcher"
      sx={{
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 99,
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.14)',
        '& .MuiToggleButton-root': {
          border: 'none',
          textTransform: 'none',
          px: 2.5,
          py: 1,
          gap: 0.75,
          borderRadius: 99,
          color: 'common.white',
          '&.Mui-selected': {
            backgroundColor: 'rgba(49,196,141,0.2)',
            color: 'common.white',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.08)',
          },
        },
      }}
    >
      <ToggleButton value="client" aria-label="Client Portal">
        <AutoAwesomeRoundedIcon fontSize="small" color="success" />
        <Typography variant="body2" fontWeight={700}>
          Client
        </Typography>
      </ToggleButton>
      <ToggleButton value="developer" aria-label="Developer Portal">
        <TuneRoundedIcon fontSize="small" color="secondary" />
        <Typography variant="body2" fontWeight={700}>
          Developer
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default PortalSwitcher
