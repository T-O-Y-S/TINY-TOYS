# Variables
PACKAGE_MANAGER ?= yarn

# Setup the workspaces
setup:
	@sh ./scripts/setup.sh

# Default target
.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	@echo "Installing dependencies..."
	$(PACKAGE_MANAGER) install

# Build the entire monorepo
.PHONY: build
build:
	@echo "Building all projects..."
	$(PACKAGE_MANAGER) build && $(PACKAGE_MANAGER) dev

# CLI help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  install       Install dependencies"
	@echo "  build         Build all projects"
