import { formatNRQL } from './formatter';

describe('formatNRQL', () => {
  it('should format a simple NRQL query', () => {
    const input = 'select * from Transaction where appName = "MyApp"';
    const expected = `SELECT *
FROM Transaction
WHERE appName = "MyApp"`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should handle queries with multiple clauses', () => {
    const input = 'select count(*) from Transaction where duration > 1 facet name since 1 hour ago';
    const expected = `SELECT count(*)
FROM Transaction
WHERE duration > 1
FACET name
SINCE 1 HOUR AGO`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should preserve already formatted queries', () => {
    const input = `SELECT average(duration)
FROM Transaction
WHERE appName = "MyApp"
SINCE 1 DAY AGO`;
    expect(formatNRQL(input)).toBe(input);
  });

  it('should handle empty or whitespace-only input', () => {
    expect(formatNRQL('')).toBe('');
    expect(formatNRQL('   ')).toBe('');
  });

  it('should normalize excessive whitespace', () => {
    const input = 'SELECT    *    FROM     Transaction';
    const expected = `SELECT *
FROM Transaction`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should uppercase keywords', () => {
    const input = 'select * from transaction where duration > 1 and appname = "test"';
    const expected = `SELECT *
FROM transaction
WHERE duration > 1 AND appname = "test"`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should handle TIMESERIES clause', () => {
    const input = 'select average(duration) from Transaction timeseries auto since 1 hour ago';
    const expected = `SELECT average(duration)
FROM Transaction
TIMESERIES AUTO
SINCE 1 HOUR AGO`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should handle LIMIT clause', () => {
    const input = 'select * from Transaction limit 100';
    const expected = `SELECT *
FROM Transaction
LIMIT 100`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should uppercase time-related reserved words', () => {
    const input = 'select * from Transaction since 5 days ago until 2 hours ago';
    const expected = `SELECT *
FROM Transaction
SINCE 5 DAYS AGO
UNTIL 2 HOURS AGO`;
    expect(formatNRQL(input)).toBe(expected);
  });

  it('should uppercase all time units', () => {
    const input = 'select * from Transaction since 1 week ago';
    const expected = `SELECT *
FROM Transaction
SINCE 1 WEEK AGO`;
    expect(formatNRQL(input)).toBe(expected);
  });
});
