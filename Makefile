.PHONY: help install build test clean package install-vscode uninstall dev lint

# Default target
help:
	@echo "NRQL Formatter - Available targets:"
	@echo ""
	@echo "  make install        - Install npm dependencies"
	@echo "  make build          - Build the extension"
	@echo "  make test           - Run tests"
	@echo "  make lint           - Check TypeScript types"
	@echo "  make package        - Package extension as .vsix"
	@echo "  make install-vscode - Build, package, and install in VSCode"
	@echo "  make uninstall      - Uninstall from VSCode"
	@echo "  make dev            - Build in watch mode"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make all            - Install deps, test, build, and install in VSCode"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Build the extension
build:
	@echo "Building extension..."
	npm run build

# Run tests
test:
	@echo "Running tests..."
	npm test

# Check TypeScript types
lint:
	@echo "Checking TypeScript types..."
	npm run lint

# Package the extension
package: build
	@echo "Packaging extension..."
	npm run package

# Install in VSCode
install-vscode: package
	@echo "Installing extension in VSCode..."
	@VSIX=$$(ls -t *.vsix 2>/dev/null | head -n 1); \
	if [ -z "$$VSIX" ]; then \
		echo "Error: No .vsix file found. Run 'make package' first."; \
		exit 1; \
	fi; \
	echo "Installing $$VSIX..."; \
	code --install-extension "$$VSIX" --force

# Uninstall from VSCode
uninstall:
	@echo "Uninstalling extension from VSCode..."
	code --uninstall-extension nrql-formatter || echo "Extension not installed"

# Development mode (watch)
dev:
	@echo "Starting development mode (watch)..."
	npm run dev

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist coverage *.vsix
	@echo "Clean complete"

# Full workflow
all: install test build install-vscode
	@echo ""
	@echo "=========================================="
	@echo "Extension built and installed successfully!"
	@echo "Restart VSCode to activate the extension"
	@echo "=========================================="
