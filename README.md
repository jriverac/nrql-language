# NRQL Formatter

The complete Visual Studio Code extension for New Relic Query Language (NRQL) with syntax highlighting, intelligent formatting, and enhanced editing features.

## Features

### Syntax Highlighting

Comprehensive colorization for NRQL query elements:

- **Keywords**: SELECT, FROM, WHERE, FACET, LIMIT, SINCE, UNTIL, TIMESERIES, COMPARE, ORDER BY, and more
- **Operators**: Comparison (=, !=, <, <=, >, >=), logical (AND, OR, NOT), membership (IN, NOT IN), pattern matching (LIKE, NOT LIKE)
- **Aggregator Functions**: count, sum, average, max, min, percentile, uniqueCount, rate, funnel, filter, histogram, apdex, and more
- **Time Units**: SECOND, MINUTE, HOUR, DAY, WEEK, MONTH (and plurals)
- **Data Types**: Numbers (including scientific notation), strings (single and double-quoted), booleans, NULL
- **Comments**: Line comments (`//`) and block comments (`/* */`)

### Automatic Formatting

Transform messy queries into clean, readable code:

- **Uppercase keywords** for consistency and readability
- **Smart line breaks** that separate major query clauses (FROM, WHERE, FACET, etc.)
- **Proper indentation** for nested structures
- **Whitespace normalization** to clean up excessive spaces

### Enhanced Editing Features

- **Auto-closing pairs**: Automatically closes parentheses, double quotes, and single quotes
- **Bracket matching**: Highlights matching parentheses
- **Comment toggling**: Use `Ctrl+/` (or `Cmd+/` on macOS) to quickly comment/uncomment lines
- **Smart selection**: Surround selected text with quotes or parentheses

## Usage

### Formatting Queries

1. Open a file with `.nrql` extension or manually set the language mode to "NRQL"
2. Format your query using:
   - **Windows/Linux**: `Shift + Alt + F`
   - **macOS**: `Shift + Option + F`
   - **Command Palette**: "Format Document"
   - **Right-click menu**: "Format Document"

### Using Comments

```nrql
// This is a line comment
SELECT count(*)
FROM Transaction
/* This is a
   block comment */
WHERE duration > 1
```

Toggle comments on any line with `Ctrl+/` (or `Cmd+/` on macOS).

## Example

Transform messy, single-line queries into readable, well-structured NRQL:

**Before formatting:**

```nrql
select count(*) from Transaction where duration > 1 facet name since 1 hour ago
```

**After formatting:**

```nrql
SELECT count(*)
FROM Transaction
WHERE duration > 1
FACET name
SINCE 1 HOUR AGO
```

## Supported Features

### Query Clauses

- SELECT, FROM, WHERE
- FACET, TIMESERIES, COMPARE
- SINCE, UNTIL, WITH TIMEZONE
- LIMIT, OFFSET
- ORDER BY (ASC, DESC)
- EXTRAPOLATE

### Aggregator Functions

apdex, average, count, eventType, filter, funnel, histogram, keyset, latest, max, min, percentage, percentile, rate, stddev, sum, uniqueCount, uniques

### Operators

- **Comparison**: =, !=, <, <=, >, >=
- **Logical**: AND, OR, NOT
- **Null checks**: IS NULL, IS NOT NULL
- **Set operations**: IN, NOT IN
- **Pattern matching**: LIKE, NOT LIKE
- **Arithmetic**: +, -, *, /

### Time Specifications

Supports all NRQL time units: SECOND(S), MINUTE(S), HOUR(S), DAY(S), WEEK(S), MONTH(S), AGO, AUTO

## Installation

Install directly from the VS Code Marketplace or search for "NRQL Formatter" in the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).

## File Association

The extension automatically activates for files with the `.nrql` extension. You can also manually set the language mode to "NRQL" for any file using the language selector in the bottom-right corner of VS Code.
