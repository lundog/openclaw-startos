# Contributing

## Building and Development

See the [StartOS Packaging Guide](https://docs.start9.com/packaging/) for complete environment setup and build instructions.

### Quick Start

```bash
# Install dependencies
npm ci

# Build universal package
make
```

## How to Contribute

1. Fork the repository and create a branch from `master`
2. Make your changes
3. Open a pull request to `master`

## Bumping the OpenClaw upstream version

The upstream version is tracked in **two places that must stay in lockstep**:

1. `Dockerfile` — the `OPENCLAW_VERSION` build ARG. This is what actually gets installed in the image.
2. `startos/versions/` — the version file (`v<UPSTREAM>.<REV>.ts`) and its import in `index.ts`. This is the package version StartOS displays and uses for upgrade ordering.

When bumping, change **both** in the same commit. If there's no migration and you don't need to preserve the prior release notes as their own file, rename the existing version file in place (update the filename, the exported const name, the `version` string, and `releaseNotes`) — don't add a new file alongside the old one. Confirm with `grep -rn '<OLD_VERSION>' --include='*.ts' --include='Dockerfile'` that no stale references remain before committing.
