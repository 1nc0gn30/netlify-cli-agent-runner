import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

function ClientLayout({ title = 'Client Portal', subtitle, children }) {
  return (
    <Stack spacing={2.5}>
      <Card
        elevation={0}
        sx={{
          background: 'linear-gradient(120deg, rgba(56, 142, 60, 0.08), rgba(99, 167, 123, 0.04))',
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Stack spacing={0.75} flex={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label="Client" color="success" size="small" sx={{ borderRadius: 2, fontWeight: 700 }} />
                <Typography variant="overline" color="text.secondary">
                  Guided workspace
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={800}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AutoAwesomeRoundedIcon color="success" />
              <Typography variant="body2" color="text.secondary">
                No raw CLI. Agents mediate every step.
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box>{children}</Box>
    </Stack>
  )
}

export default ClientLayout
