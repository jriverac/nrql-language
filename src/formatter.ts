/**
 * Formats NRQL query string
 */
export function formatNRQL(query: string): string {
  if (!query || query.trim().length === 0) {
    return "";
  }

  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "SINCE",
    "UNTIL",
    "FACET",
    "TIMESERIES",
    "LIMIT",
    "WITH",
    "AS",
    "COMPARE",
    "AND",
    "OR",
    "NOT",
    "IN",
    "LIKE",
    "IS",
    "NULL",
    "TRUE",
    "FALSE",
    "EXTRAPOLATE",
    "AUTO",
    "AGO",
    "DAY",
    "DAYS",
    "HOUR",
    "HOURS",
    "MINUTE",
    "MINUTES",
    "SECOND",
    "SECONDS",
    "WEEK",
    "WEEKS",
    "MONTH",
    "MONTHS",
    "ORDER",
    "BY",
    "ASC",
    "DESC",
    "OFFSET",
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
