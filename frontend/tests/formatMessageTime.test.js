import { formatMessageTime } from '../src/lib/utils.js';

describe('formatMessageTime', () => {
  it('should correctly format a valid date to HH:mm format', () => {
    // Example date for testing: 10:30 AM
    const date = new Date('2025-03-28T10:30:00');
    expect(formatMessageTime(date)).toBe('10:30');
  });

  it('should correctly format a date with single-digit hour (e.g., 9:05 AM)', () => {
    const date = new Date('2025-03-28T09:05:00');
    expect(formatMessageTime(date)).toBe('09:05');
  });

  it('should return "00:00" for midnight', () => {
    const date = new Date('2025-03-28T00:00:00');
    expect(formatMessageTime(date)).toBe('00:00');
  });

  it('should handle invalid date inputs', () => {
    const invalidDate = 'invalid-date';
    expect(formatMessageTime(invalidDate)).toBe('Invalid Date');
  });
});