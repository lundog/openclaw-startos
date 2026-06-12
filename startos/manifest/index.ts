import { setupManifest } from '@start9labs/start-sdk'
import { STARTOS_VERSION } from '../utils'
import { installAlert, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'openclaw',
  title: 'OpenClaw',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/openclaw-startos',
  upstreamRepo: 'https://github.com/openclaw/openclaw',
  marketingUrl: 'https://github.com/openclaw/openclaw',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    openclaw: {
      source: {
        dockerBuild: {
          workdir: '.',
          buildArgs: {
            STARTOS_VERSION,
          },
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: installAlert,
  },
  dependencies: {
    'simplex-chat': {
      description:
        'Enables the SimpleX Chat channel. Files are exchanged via dependency volume mounts; the bot is driven over its WebSocket interface.',
      optional: true,
      metadata: {
        title: 'SimpleX Chat',
        icon: 'https://raw.githubusercontent.com/Start9-Community/simplex-chat-startos/master/icon.svg',
      },
    },
  },
})
