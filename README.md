# NRQL Formatter

A Visual Studio Code extension for formatting New Relic Query Language (NRQL) queries.

## Features

- Formats NRQL queries with proper indentation and structure
- Uppercases NRQL keywords
- Adds line breaks for better readability
- Normalizes whitespace

## Installation

### Quick Install (using Makefile)

```bash
make all
```

This will install dependencies, run tests, build, and install the extension in VSCode.

### Manual Installation

```bash
make install        # Install dependencies
make build          # Build the extension
make package        # Package as .vsix
make install-vscode # Install in VSCode
```

### Other Makefile Commands

```bash
make help           # Show all available commands
make test           # Run tests
make dev            # Build in watch mode
make uninstall      # Uninstall from VSCode
make clean          # Clean build artifacts
```

After installation, restart VSCode to activate the extension.

## Usage

1. Open a file with `.nrql` extension or set the language mode to NRQL
2. Use the format document command:
   - Windows/Linux: `Shift + Alt + F`
   - macOS: `Shift + Option + F`
   - Or right-click and select "Format Document"

## Example

Before formatting:
```nrql
select count(*) from Transaction where duration > 1 facet name since 1 hour ago
```

After formatting:
```nrql
SELECT count(*)
FROM Transaction
WHERE duration > 1
FACET name
SINCE 1 hour ago
```

## Development

Built with:
- TypeScript
- Vite
- Jest

### Scripts

- `npm run build` - Build the extension
- `npm run dev` - Build in watch mode
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run package` - Package the extension

## License

MIT
