import { sdk } from '../sdk'
import { mainMounts } from '../utils'
import { i18n } from '../i18n'

const { InputSpec, Value, Variants } = sdk

/**
 * Run one of OpenClaw's maintenance commands against the stopped service and
 * show what it printed.
 */

/**
 * `doctor` reports; `doctor --fix` repairs.
 */
function repairCommand(apply: boolean): string[] {
  return apply
    ? // No TTY here, so a repair that wants a prompt must decline rather than hang.
      ['openclaw', 'doctor', '--fix', '--non-interactive']
    : ['openclaw', 'doctor']
}

/**
 * `dry-run` reports; `import` migrates and archives the legacy stores.
 */
function sessionsCommand(apply: boolean): string[] {
  return [
    'openclaw',
    'doctor',
    '--session-sqlite',
    apply ? 'import' : 'dry-run',
    // Per-agent stores live under agents/<id>/sessions; without this only the
    // top-level store is considered and the gateway still finds a legacy one.
    '--session-sqlite-all-agents',
  ]
}

const MAX_OUTPUT_CHARS = 100_000

function trimOutput(raw: string): string {
  const text = raw.trim()
  if (text.length <= MAX_OUTPUT_CHARS) return text
  return `[…truncated, showing the last ${MAX_OUTPUT_CHARS} characters]\n${text.slice(
    -MAX_OUTPUT_CHARS,
  )}`
}

export const repairOpenclaw = sdk.Action.withInput(
  'repair-openclaw',

  async () => ({
    name: i18n('Repair OpenClaw'),
    description: i18n(
      'Run one of OpenClaw’s maintenance commands against the stopped service.',
    ),
    warning: null,
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  InputSpec.of({
    command: Value.union({
      name: i18n('Command'),
      description: null,
      default: 'repair',
      variants: Variants.of({
        repair: {
          name: i18n('Repair config and database (doctor --fix)'),
          spec: InputSpec.of({
            apply: Value.toggle({
              name: i18n('Apply recommended repairs'),
              description: i18n('If not checked, no changes will be made.'),
              default: false,
            }),
          }),
        },
        sessions: {
          name: i18n('Import sessions to SQLite (doctor --session-sqlite)'),
          spec: InputSpec.of({
            apply: Value.toggle({
              name: i18n('Apply changes'),
              description: i18n('If not checked, no changes will be made.'),
              default: false,
            }),
          }),
        },
      }),
    }),
  }),

  async () => ({ command: { selection: 'repair' as const, value: {} } }),

  async ({ effects, input }) => {
    const command =
      input.command.selection === 'sessions'
        ? sessionsCommand(input.command.value.apply)
        : repairCommand(input.command.value.apply)

    const result = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'openclaw' },
      mainMounts(),
      'openclaw-doctor',
      (subc) =>
        subc.exec(command, {
          user: 'node',
          env: { HOME: '/data', OPENCLAW_STATE_DIR: '/data/.openclaw' },
        }),
    )

    const stdout = String(result.stdout ?? '').trim()
    const stderr = String(result.stderr ?? '').trim()
    const combined = [stdout, stderr && `[stderr]\n${stderr}`]
      .filter(Boolean)
      .join('\n\n')

    return {
      version: '1',
      title: i18n('Maintenance Result'),
      message: `${command.join(' ')} — ${i18n('Exit Code')}: ${result.exitCode}`,
      result: {
        type: 'single',
        name: i18n('Output'),
        description: null,
        value: trimOutput(combined) || i18n('No output'),
        copyable: true,
        qr: false,
        masked: false,
      },
    }
  },
)
