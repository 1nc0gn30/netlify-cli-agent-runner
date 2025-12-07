import SecurityUpdateGoodRoundedIcon from '@mui/icons-material/SecurityUpdateGoodRounded'
import { Box, Card, CardContent, Stack, Switch, Typography } from '@mui/material'

function DeveloperProfile() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" fontWeight={800}>
        Developer profile
      </Typography>
      <Card elevation={0}>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SecurityUpdateGoodRoundedIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={700}>
                Sarah, Platform Team
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body1" fontWeight={700}>
                  Approvals push notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notify me when clients request prod access.
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body1" fontWeight={700}>
                  Auto-publish safe presets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Let agents share pre-approved actions to clients.
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DeveloperProfile
