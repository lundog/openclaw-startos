import { sdk } from './sdk'
import { simplexDependencies } from './simplex'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  // Optional dependencies: each integration contributes its fragment when
  // enabled (and {} otherwise). Add future optional dependencies as
  // additional spreads.
  ...(await simplexDependencies(effects)),
}))
