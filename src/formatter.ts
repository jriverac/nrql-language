/**
 * Formats NRQL query string
 */
export function formatNRQL(query: string): string {
  if (!query || query.trim().length === 0) {
    return "";
  }

  const keywords = [
    "AGO",
    "AND",
    "AS",
    "ASC",
    "AUTO",
    "BY",
    "COMPARE",
    "DAY",
    "DAYS",
    "DESC",
    "EXTRAPOLATE",
    "FACET",
    "FALSE",
    "FROM",
    "HOUR",
    "HOURS",
    "IN",
    "IS",
    "LIKE",
    "LIMIT",
    "MINUTE",
    "MINUTES",
    "MONTH",
    "MONTHS",
    "NOT",
    "NULL",
    "OFFSET",
    "OR",
    "ORDER",
    "SECOND",
    "SECONDS",
    "SELECT",
    "SINCE",
    "TIMESERIES",
    "TRUE",
    "UNTIL",
    "WEEK",
    "WEEKS",
    "WHERE",
    "WITH",
  ];

  let formatted = query.trim();

  // Normalize whitespace
  formatted = formatted.replace(/\s+/g, " ");

  // Add uppercase to keywords
  const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  formatted = formatted.replace(keywordPattern, (match) => match.toUpperCase());

  // Add newlines before major clauses
  const majorClauses = [
    "FROM",
    "WHERE",
    "AND",
    "OR",
    "SINCE",
    "UNTIL",
    "FACET",
    "TIMESERIES",
    "LIMIT",
    "COMPARE",
  ];
  majorClauses.forEach((clause) => {
    const pattern = new RegExp(`\\s+(${clause})\\b`, "gi");
    formatted = formatted.replace(pattern, `\n${clause}`);
  });

  // Ensure SELECT is on first line
  formatted = formatted.replace(/^\s*SELECT/i, "SELECT");

  // Clean up extra newlines
  formatted = formatted.replace(/\n{3,}/g, "\n\n");
  formatted = formatted.trim();

  return formatted;
}
