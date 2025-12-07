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
        backgroundColor: 'background.paper',
        borderRadius: 99,
        boxShadow: 3,
        '& .MuiToggleButton-root': {
          border: 'none',
          textTransform: 'none',
          px: 2,
          gap: 0.75,
          borderRadius: 99,
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
