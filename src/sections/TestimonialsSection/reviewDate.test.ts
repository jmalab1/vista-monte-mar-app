import { describe, expect, it } from 'vitest';
import {
  formatReviewDateForDisplay,
  getReviewRecencyScore,
} from './reviewDate';

describe('review date formatting', () => {
  it('keeps month and year review dates unchanged', () => {
    expect(formatReviewDateForDisplay('March 2026')).toBe('March 2026');
  });

  it('converts relative review dates to month and year', () => {
    expect(formatReviewDateForDisplay('today')).toBe('May 2026');
    expect(formatReviewDateForDisplay('yesterday')).toBe('May 2026');
    expect(formatReviewDateForDisplay('1 day ago')).toBe('May 2026');
    expect(formatReviewDateForDisplay('5 days ago')).toBe('May 2026');
    expect(formatReviewDateForDisplay('3 weeks ago')).toBe('April 2026');
    expect(formatReviewDateForDisplay('2 months ago')).toBe('March 2026');
    expect(formatReviewDateForDisplay('1 year ago')).toBe('May 2025');
  });

  it('converts raw date strings to month and year', () => {
    expect(formatReviewDateForDisplay('May 5, 2026')).toBe('May 2026');
    expect(formatReviewDateForDisplay('2026-05-05')).toBe('May 2026');
  });

  it('uses normalized dates for newest sorting', () => {
    expect(getReviewRecencyScore('1 day ago')).toBeGreaterThan(
      getReviewRecencyScore('April 2026')
    );
    expect(getReviewRecencyScore('April 2026')).toBeGreaterThan(
      getReviewRecencyScore('March 2026')
    );
  });
});
