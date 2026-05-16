import { VersionInfo } from '@start9labs/start-sdk'

export const v_2026_5_12_0 = VersionInfo.of({
  version: '2026.5.12:0',
  releaseNotes: {
    en_US: 'Update to upstream 2026.5.12',
    es_ES: 'Actualización a upstream 2026.5.12',
    de_DE: 'Update auf Upstream 2026.5.12',
    pl_PL: 'Aktualizacja do upstream 2026.5.12',
    fr_FR: 'Mise à jour vers upstream 2026.5.12',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
