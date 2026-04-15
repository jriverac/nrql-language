interface CommentPlaceholder {
  placeholder: string;
  content: string;
  type: 'line' | 'block';
  followedByNewline: boolean;
  precededByNewline: boolean;
}

/**
 * Extracts comments from the query and replaces them with placeholders
 */
function extractComments(query: string): { query: string; comments: CommentPlaceholder[] } {
  const comments: CommentPlaceholder[] = [];
  let result = query;
  let index = 0;

  // Extract block comments first (/* */)
  result = result.replace(/(\r?\n)?\/\*[\s\S]*?\*\/(\r?\n)?/g, (match, precedingNewline, followingNewline) => {
    const placeholder = `__COMMENT_${index}__`;
    const hasPrecedingNewline = !!precedingNewline;
    const hasFollowingNewline = !!followingNewline;

    // Remove newlines from the match to get just the comment
    let commentContent = match;
    if (precedingNewline) {
      commentContent = commentContent.substring(precedingNewline.length);
    }
    if (followingNewline) {
      commentContent = commentContent.substring(0, commentContent.length - followingNewline.length);
    }

    comments.push({
      placeholder,
      content: commentContent,
      type: 'block',
      followedByNewline: hasFollowingNewline,
      precededByNewline: hasPrecedingNewline
    });
    index++;
    return (hasPrecedingNewline ? '§NL§' : '') + placeholder + (hasFollowingNewline ? '§NL§' : '');
  });

  // Extract line comments (// ...) including the newline that follows
  result = result.replace(/\/\/.*?(\r?\n|$)/gm, (match, newline) => {
    const placeholder = `__COMMENT_${index}__`;
    const hasNewline = !!newline && newline !== '';
    comments.push({
      placeholder,
      content: match.replace(/\r?\n$/, ''), // Store comment without the trailing newline
      type: 'line',
      followedByNewline: hasNewline,
      precededByNewline: false // Line comments don't track preceding newlines
    });
    index++;
    // Use a special marker that won't be affected by whitespace normalization
    return placeholder + (hasNewline ? '§NL§' : '');
  });

  return { query: result, comments };
}

/**
 * Restores comments back into the formatted query
 */
function restoreComments(query: string, comments: CommentPlaceholder[]): string {
  let result = query;

  // First replace all comment placeholders with their content
  comments.forEach(({ placeholder, content }) => {
    result = result.replace(placeholder, content);
  });

  // Then convert §NL§ markers to actual newlines
  result = result.replace(/§NL§/g, '\n');

  return result;
}

/**
 * Formats NRQL query string
 */
export function formatNRQL(query: string): string {
  if (!query || query.trim().length === 0) {
    return "";
  }

  // Extract comments before formatting
  const { query: queryWithoutComments, comments } = extractComments(query);

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

  let formatted = queryWithoutComments.trim();

  // Normalize whitespace, but preserve §NL§ markers (these mark where comments had newlines)
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

  // Restore comments
  formatted = restoreComments(formatted, comments);

  return formatted;
}
