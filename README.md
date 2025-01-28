# LeadSync

A robust CSV validation tool designed specifically for LinkedIn lead data. LeadSync automatically detects CSV headers and allows you to define validation rules for each field, ensuring your lead data meets your quality standards.

![banner](./assets/image.webp)

## Features

- Automatic header detection for CSV files
- Configurable validation rules for common lead data fields:
  - Company names
  - Person names
  - Locations
  - Phone numbers
  - Email addresses
  - Employee size counts
  - And more...
- Generates two output files:
  - clean.csv: Contains all valid records
  - errors.csv: Contains invalid records with detailed error descriptions

## Installation

```bash
npm install -g leadsync
```

## Quick Start

The fastest way to validate your leads file is using npx:

```bash
npx leadsync path/to/your/leads.csv
```

This will start an interactive session where you can:

1. Review detected headers
2. Set validation rules for each column
3. Run the validation process
4. Get your clean.csv and errors.csv files

## Validation Rules

LeadSync supports the following validation types:

- `company`: Validates company names
- `person`: Validates person names
- `email`: Validates email addresses
- `phone`: Validates phone numbers (international format supported)
- `location`: Validates geographical locations
- `employee_size`: Validates employee count numbers
- `url`: Validates URLs
- `date`: Validates dates in various formats
- `text`: Basic text validation
- `number`: Numeric validation

## Output Files

### clean.csv

Contains all records that passed validation, maintaining the original format.

### errors.csv

Contains records that failed validation, with an additional column "validation_errors" describing what went wrong.

## Contributing

We welcome contributions! Please check our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT

## Support

For bugs and feature requests, please [open an issue](https://github.com/yourusername/leadsync/issues).

For usage questions, reach out to our community on [Discord](https://discord.gg/your-discord-link).

## Changelog

### 1.0.0

- Initial release
- Basic validation rules
- CSV processing
- Interactive CLI
