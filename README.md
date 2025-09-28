# commonutil-core

[![npm version](https://img.shields.io/npm/v/commonutil-core.svg)](https://www.npmjs.com/package/commonutil-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

A comprehensive utility library written in TypeScript that provides common string manipulation, text formatting, and validation functions for modern JavaScript/TypeScript applications.

## Features

- 🔧 **String Utilities**: Capitalize text, extract digits, truncate with ellipsis
- 💳 **Card Validation**: Validate credit card expiry dates
- 📊 **Number Formatting**: Format numbers in Indian or International format
- 🎯 **TypeScript Support**: Fully typed with comprehensive type definitions
- ✅ **Well Tested**: 100% test coverage with Jest
- 📦 **Zero Dependencies**: Lightweight with no external dependencies

## Installation

```bash
npm install commonutil-core
```

## Usage

### Import Functions

```typescript
import { uCFirst } from "commonutil-core";
```

### String Utilities

#### `uCFirst(text: string): string`

Capitalizes the first letter of a string and trims whitespace.

```typescript
import { uCFirst } from "commonutil-core";

console.log(uCFirst("hello world")); // 'Hello world'
console.log(uCFirst("  javascript  ")); // 'Javascript'

// Throws error for invalid input
uCFirst(""); // throws "String not provided"
uCFirst(123); // throws "Not a string"
```

#### `getDigits(text: string): string`

Extracts only digits from a given string.

```typescript
import { getDigits } from "commonutil-core";

console.log(getDigits("abc123def456")); // '123456'
console.log(getDigits("Phone: +1-555-123-4567")); // '15551234567'
console.log(getDigits("No digits here!")); // ''

// Throws error for invalid input
getDigits(""); // throws "String not provided"
getDigits(null); // throws "Not a string"
```

#### `getMaxText(text: string, limit?: number): string`

Truncates text to specified length with ellipsis if necessary. Default limit is 10 characters.

```typescript
import { getMaxText } from "commonutil-core";

console.log(getMaxText("Hello World")); // 'Hello Worl...'
console.log(getMaxText("Short")); // 'Short'
console.log(getMaxText("Long text here", 8)); // 'Long tex...'
console.log(getMaxText("Exactly 5", 5)); // 'Exactly 5'

// Throws error for invalid input
getMaxText(""); // throws "Invalid or No string provided"
getMaxText(null); // throws "Invalid or No string provided"
```

### Number Formatting

#### `formatDigits(digits: string, format?: 'indian' | 'international'): string`

Formats digit strings in Indian or International number format.

```typescript
import { formatDigits } from "commonutil-core";

// Indian format (default): adds commas in Indian style
console.log(formatDigits("1234567")); // '12,34,567'
console.log(formatDigits("123456789")); // '12,34,56,789'

// International format: adds commas every 3 digits
console.log(formatDigits("1234567", "international")); // '1,234,567'
console.log(formatDigits("123456789", "international")); // '123,456,789'

// Throws error for invalid input
formatDigits("12a34"); // throws "Not all characters are digits"
formatDigits(""); // throws "No digits provided"
```

### Card Validation

#### `isValidExpiryForCard(expiry: string): { status: boolean, error: string | null }`

Validates credit card expiry date in MM/YY format and checks if it's not expired.

```typescript
import { isValidExpiryForCard } from "commonutil-core";

// Valid future date
console.log(isValidExpiryForCard("12/25"));
// { status: true, error: null }

// Invalid format
console.log(isValidExpiryForCard("13/25"));
// { status: false, error: 'Invalid format. Should be like "01/26" or "11/30" in "MM/YY"' }

// Expired date
console.log(isValidExpiryForCard("01/20"));
// { status: false, error: 'Already Expired' }

// Invalid input
console.log(isValidExpiryForCard(""));
// { status: false, error: 'Input not provided' }
```

**Validation Rules:**

- Must be exactly 5 characters in MM/YY format
- Month must be 01-12
- Year must be 2-digit (interpreted as 20XX)
- Date must be in the future
- Handles different month lengths correctly

## API Reference

| Function               | Parameters                        | Returns                                  | Description                                 |
| ---------------------- | --------------------------------- | ---------------------------------------- | ------------------------------------------- |
| `uCFirst`              | `text: string`                    | `string`                                 | Capitalizes first letter and trims          |
| `getDigits`            | `text: string`                    | `string`                                 | Extracts only digits from string            |
| `getMaxText`           | `text: string, limit?: number`    | `string`                                 | Truncates with ellipsis (default limit: 10) |
| `formatDigits`         | `digits: string, format?: string` | `string`                                 | Formats numbers (indian/international)      |
| `isValidExpiryForCard` | `expiry: string`                  | `{status: boolean, error: string\|null}` | Validates card expiry date                  |

## Error Handling

All functions include proper error handling and will throw descriptive error messages for invalid inputs:

- Empty strings or whitespace-only strings
- Non-string inputs
- Invalid formats
- Out-of-range values

## TypeScript Support

This library is written in TypeScript and includes comprehensive type definitions. You'll get full IntelliSense support and type checking in TypeScript projects.

```typescript
// TypeScript usage with full type safety
const result: string = uCFirst("hello");
const validation: { status: boolean; error: string | null } =
  isValidExpiryForCard("12/25");
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.7

- Current stable version
- All core utilities implemented and tested

## Author

**Mahesh** - [GitHub](https://github.com/mahesh2885858)

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub issue tracker](https://github.com/mahesh2885858/commonutil-core/issues).
