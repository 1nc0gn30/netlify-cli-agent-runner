export const clientProjects = [
  {
    name: 'Marketing Site',
    status: 'Healthy',
    lastDeployed: '2h ago',
    guardrails: 'Auto-block prod deploys during events',
  },
  {
    name: 'Docs',
    status: 'Preview only',
    lastDeployed: 'Yesterday',
    guardrails: 'Only approved presets allowed',
  },
  {
    name: 'Landing Experiments',
    status: 'In flight',
    lastDeployed: '5m ago',
    guardrails: 'Agent-controlled A/B rollouts',
  },
]

export const clientActions = [
  {
    id: 'content-refresh',
    title: 'Refresh marketing content',
    summary: 'Pull approved copy from Contentful and rebuild preview.',
    impact: ['Rebuild preview branch', 'Revalidate CDN cache for /marketing'],
    wontChange: ['No production impact', 'Analytics untouched'],
    safety: 'Agent validates schema changes and blocks broken sections.',
    rollback: 'Revert to previous preview snapshot in 20 seconds.',
  },
  {
    id: 'localized-rollout',
    title: 'Roll out localized hero',
    summary: 'Release the new localized hero to 10% of EMEA traffic.',
    impact: ['Stage variant to edge', 'Limit exposure to 10% EMEA'],
    wontChange: ['No change to US traffic', 'Checkout paths stay frozen'],
    safety: 'Guardrails pin dependencies and validate lighthouse scores.',
    rollback: 'Instantly route back to baseline variant.',
  },
  {
    id: 'dependencies',
    title: 'Check dependencies health',
    summary: 'Run security and stability scan on production lockfile.',
    impact: ['Scan lockfile against advisories', 'Draft remediation playbook'],
    wontChange: ['No deploys', 'No package updates applied'],
    safety: 'Agent uses read-only tokens and signs findings.',
    rollback: 'No changes needed; results stored for developers.',
  },
]

export const clientActivity = [
  {
    id: 'a1',
    actor: 'Agent Runner',
    action: 'Dry run — Refresh marketing content',
    status: 'Stable',
    timestamp: 'Today, 09:14',
  },
  {
    id: 'a2',
    actor: 'Sarah (Dev)',
    action: 'Approved localized hero rollout',
    status: 'Monitoring',
    timestamp: 'Today, 08:02',
  },
  {
    id: 'a3',
    actor: 'Agent Runner',
    action: 'Queued dependency scan for 2pm',
    status: 'Queued',
    timestamp: 'Yesterday, 17:50',
  },
]
