import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import ActionCard from '../components/cards/ActionCard'
import { clientActions } from '../data/mockClientData'

function ClientActions() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" fontWeight={800}>
        Guided actions
      </Typography>
      <Typography variant="body2" color="text.secondary">
        These actions are safe presets curated by developers. No CLI exposed.
      </Typography>
      <Grid container spacing={2} columns={{ xs: 1, sm: 12 }}>
        {clientActions.map((action) => (
          <Grid key={action.id} size={{ xs: 12, sm: 4 }}>
            <ActionCard action={action} onSelect={() => {}} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ClientActions
