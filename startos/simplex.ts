import { T } from '@start9labs/start-sdk'
import { openclawJson } from './fileModels/openclaw.json'
import { sdk } from './sdk'
import { mainMounts } from './utils'

/**
 * SimpleX Chat channel integration.
 *
 * When the channel is enabled, OpenClaw exchanges files with the
 * simplex-chat package through dependency volume mounts, following the
 * file exchange contract published by simplex-chat-startos
 * (docs/file-exchange-architecture.md in that repo):
 *
 *   /simplex/inbound   files received by the bot (mounted read-only)
 *   /simplex/outbound  files OpenClaw writes for the bot to send (read-write)
 *
 * The bot itself is driven over its published WebSocket interface.
 */

const SIMPLEX_INBOUND_DIR = '/simplex/inbound'
const SIMPLEX_OUTBOUND_DIR = '/simplex/outbound'

/**
 * Whether the SimpleX channel is enabled (read with .const so toggling it
 * re-runs the calling context, e.g. setupMain or setupDependencies).
 */
export async function simplexChannelEnabled(
  effects: T.Effects,
): Promise<boolean> {
  return Boolean(
    await openclawJson
      .read((c) => c.channels?.['openclaw-simplex']?.enabled)
      .const(effects),
  )
}

/**
 * Dependency requirement fragment for setupDependencies: requires
 * simplex-chat running (gated on its 'websocket' health check) when the
 * channel is enabled, nothing otherwise.
 */
export async function simplexDependencies(effects: T.Effects) {
  return (await simplexChannelEnabled(effects))
    ? {
        'simplex-chat': {
          kind: 'running' as const,
          // Standalone health check exposed by simplex-chat-startos as part
          // of its file exchange contract.
          healthChecks: ['websocket'],
          versionRange: '>=0.2.0',
        },
      }
    : {}
}

/**
 * When the SimpleX channel is enabled, add the file exchange contract
 * mounts and seed the plugin config (wsUrl resolved from the dependency's
 * service interface — a user-set wsUrl is left untouched — and the shared
 * outbound dir). Returns the mounts unchanged otherwise.
 */
export async function withSimplexMounts(
  effects: T.Effects,
  mounts: ReturnType<typeof mainMounts>,
): Promise<ReturnType<typeof mainMounts>> {
  if (!(await simplexChannelEnabled(effects))) {
    return mounts
  }

  const wsUrls = await sdk.serviceInterface
    .get(
      effects,
      { id: 'ws', packageId: 'simplex-chat' },
      (i) => i?.addressInfo?.format('urlstring') ?? [],
    )
    .const()

  const currentWsUrl = await openclawJson
    .read((c) => c.channels?.['openclaw-simplex']?.connection?.wsUrl)
    .once()

  const wsUrl =
    currentWsUrl ||
    wsUrls?.find(
      (u) => !u.includes('localhost') && !u.includes('127.0.0.1'),
    ) ||
    wsUrls?.[0]

  await openclawJson.merge(effects, {
    channels: {
      'openclaw-simplex': {
        connection: { wsUrl },
        files: {
          inboundDir: SIMPLEX_INBOUND_DIR,
          outboundDir: SIMPLEX_OUTBOUND_DIR,
        },
      },
    },
  })

  // The contract dirs live together under the volume's `simplex` subpath
  // (a single mount on the simplex-chat side; see the contract doc).
  return mounts
    .mountDependency({
      dependencyId: 'simplex-chat',
      volumeId: 'main',
      subpath: 'simplex/inbound',
      mountpoint: SIMPLEX_INBOUND_DIR,
      readonly: true,
    })
    .mountDependency({
      dependencyId: 'simplex-chat',
      volumeId: 'main',
      subpath: 'simplex/outbound',
      mountpoint: SIMPLEX_OUTBOUND_DIR,
      readonly: false,
    })
}
