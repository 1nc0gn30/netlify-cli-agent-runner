import BrushRoundedIcon from '@mui/icons-material/BrushRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Drawer,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'

function TemplateGallery({ templates }) {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState(0)

  const industries = useMemo(() => ['All', ...new Set(templates.map((tpl) => tpl.industry))], [templates])

  const filteredTemplates = useMemo(
    () => (filter === 'All' ? templates : templates.filter((tpl) => tpl.industry === filter)),
    [filter, templates]
  )

  const handleSelect = (tpl) => {
    setSelected(tpl)
    setStep(0)
    setOpen(true)
  }

  const handleAdvance = () => {
    setStep((prev) => (prev === 2 ? prev : prev + 1))
  }

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CollectionsBookmarkRoundedIcon color="success" />
          <Typography variant="h6" fontWeight={800}>
            Project templates
          </Typography>
        </Stack>
        <Chip label="Ready to launch" size="small" variant="outlined" color="success" sx={{ borderRadius: 2 }} />
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, flexWrap: 'wrap' }}>
        <FilterAltRoundedIcon color="success" />
        {industries.map((item) => (
          <Chip
            key={item}
            label={item}
            clickable
            color={filter === item ? 'success' : 'default'}
            variant={filter === item ? 'filled' : 'outlined'}
            onClick={() => setFilter(item)}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} flexWrap="wrap">
        {filteredTemplates.map((tpl) => (
          <Card key={tpl.name} variant="outlined" sx={{ minWidth: { xs: '100%', md: 280 }, flex: 1, borderRadius: 2 }}>
            <CardActionArea onClick={() => handleSelect(tpl)} sx={{ p: 2, height: '100%' }}>
              <Stack spacing={1} alignItems="flex-start">
                <Chip label={tpl.industry} size="small" color="success" variant="outlined" />
                <Typography variant="subtitle1" fontWeight={800}>
                  {tpl.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tpl.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label={`${tpl.pages} pages`} size="small" />
                  <Chip label={tpl.setup} size="small" variant="outlined" />
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <BrushRoundedIcon fontSize="small" color="success" />
                  <Typography variant="caption">{tpl.highlight}</Typography>
                </Stack>
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 440 }, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 } }}>
        {selected && (
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LaunchRoundedIcon color="success" />
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  Create {selected.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selected.industry} template
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Included pages
              </Typography>
              <Stack spacing={0.5}>
                {selected.pagesIncluded.map((item) => (
                  <Stack key={item} direction="row" spacing={1} alignItems="center">
                    <CategoryRoundedIcon fontSize="small" color="success" />
                    <Typography variant="body2">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Suggested features
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {selected.features.map((feature) => (
                  <Chip key={feature} label={feature} size="small" color="success" variant="outlined" sx={{ borderRadius: 2 }} />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Guided steps
              </Typography>
              <LinearProgress variant="determinate" value={(step + 1) * 33} color="success" sx={{ borderRadius: 2 }} />
              <Stack spacing={1}>
                {selected.actions.map((action, index) => (
                  <Card key={action} variant={step >= index ? 'outlined' : 'elevation'} sx={{ borderRadius: 2, p: 1.25 }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {action}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step > index ? 'Ready' : 'Agent will handle this step for you.'}
                    </Typography>
                  </Card>
                ))}
              </Stack>
            </Stack>

            <Button variant="contained" color="success" onClick={handleAdvance} startIcon={<LaunchRoundedIcon />}>
              {step >= 2 ? 'Create project' : 'Next guided step'}
            </Button>

            <Button onClick={() => setOpen(false)} sx={{ mt: 'auto' }} color="inherit">
              Close
            </Button>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}

export default TemplateGallery
