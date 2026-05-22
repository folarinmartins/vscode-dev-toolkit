# Releasing VS Code Dev Toolkit

This repository uses an Azure DevOps pipeline for package build and marketplace publication.

## Branch Convention

1. Feature work lands through pull requests into `master`.
2. Release preparation happens in a `release` branch.
3. Azure pipeline publishes to marketplace only from `release`.

## First Release Checklist

1. Update `package.json` version.
2. Update `CHANGELOG.md` with release notes.
3. Run `npm run compile`, `npm run lint`, and `npm test`.
4. Push updates to `release` branch.
5. Confirm Azure pipeline succeeded.
6. Merge `release` into `master` after publication.

## Notes

The local repository is configured with the GitHub origin at:

- https://github.com/folarinmartins/vscode-dev-toolkit.git

Azure pipeline behavior is defined in [azure-pipelines.yml](azure-pipelines.yml).