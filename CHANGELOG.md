# Changelog

All notable changes to LeadSync will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.8] - 2025-01-29

### Fixed

- Added repository URL to package.json

## [1.0.7] - 2025-01-29

### Fixed

- Added description

## [1.0.6] - 2025-01-29

### Fixed

- General code refactoring

### Changed

- Performed code cleanup and optimization

## [1.0.5] - 2025-01-29

### Fixed

- Added support for cli arguments with alias
- Added --help and --version flags

## [1.0.4] - 2025-01-29

### Fixed

- CDN Cache issue

### Changed

- Mark the branch from main to master to revalidate the CDN cache

## [1.0.3] - 2025-01-29

### Fixed

- Fixed spelling typo in PANZOID maker

### Changed

- Updated assets/image.webp

## [1.0.2] - 2025-01-29

### Fixed

- Resolved validation error handling for empty cells
- Fixed character encoding issues with special characters
- Addressed memory leak in large file processing

### Changed

- Updated documentation with CDN-hosted images for better loading performance
- Improved error message clarity

## [1.0.1] - 2025-01-28

### Added

- Comprehensive documentation with usage examples
- Added detailed API reference
- Included command-line interface (CLI) documentation
- New troubleshooting guide
- Added code examples for common use cases

### Changed

- Improved README clarity and structure
- Enhanced code comments for better maintainability

## [1.0.0] - 2025-01-27

### Added

- Initial release of LeadSync
- CSV header detection and validation
- Configurable validation rules for:
  - Company names
  - Person names
  - Locations
  - Phone numbers
  - Email addresses
  - Employee size counts
- Interactive CLI interface
- Dual output system (clean.csv and errors.csv)
- Basic error reporting
- Node.js API for programmatic usage
- Support for large file processing
- Basic documentation and usage guide
