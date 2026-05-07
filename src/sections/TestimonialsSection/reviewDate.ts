const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthMap = monthNames.reduce<Record<string, number>>(
  (map, month, index) => {
    map[month.toLowerCase()] = index;
    return map;
  },
  {}
);

// Relative dates came from the Airbnb export captured on May 7, 2026.
const relativeReviewDateAnchor = new Date(2026, 4, 7);

const getMonthYearLabel = (date: Date) =>
  `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

const parseMonthYear = (posted: string) => {
  const [monthWord, yearWord] = posted.toLowerCase().trim().split(' ');
  const month = monthMap[monthWord];
  const year = Number(yearWord);

  if (Number.isNaN(year) || month === undefined) return null;
  return { month, year };
};

const parseRelativeDate = (posted: string) => {
  const normalized = posted.toLowerCase().trim();

  if (normalized === 'today') return new Date(relativeReviewDateAnchor);

  if (normalized === 'yesterday') {
    const date = new Date(relativeReviewDateAnchor);
    date.setDate(date.getDate() - 1);
    return date;
  }

  const match = normalized.match(/^(\d+)\s+(day|week|month|year)s?\s+ago$/);

  if (!match) return null;

  const amount = Number(match[1]);
  const unit = match[2];
  const date = new Date(relativeReviewDateAnchor);

  if (unit === 'day') {
    date.setDate(date.getDate() - amount);
  } else if (unit === 'week') {
    date.setDate(date.getDate() - amount * 7);
  } else if (unit === 'month') {
    date.setMonth(date.getMonth() - amount);
  } else if (unit === 'year') {
    date.setFullYear(date.getFullYear() - amount);
  }

  return date;
};

const parseExactDate = (posted: string) => {
  const time = Date.parse(posted);
  if (Number.isNaN(time)) return null;
  return new Date(time);
};

export const formatReviewDateForDisplay = (posted: string) => {
  const monthYear = parseMonthYear(posted);
  if (monthYear) return `${monthNames[monthYear.month]} ${monthYear.year}`;

  const relativeDate = parseRelativeDate(posted);
  if (relativeDate) return getMonthYearLabel(relativeDate);

  const exactDate = parseExactDate(posted);
  if (exactDate) return getMonthYearLabel(exactDate);

  return posted;
};

export const getReviewRecencyScore = (posted: string) => {
  const monthYear = parseMonthYear(formatReviewDateForDisplay(posted));
  if (!monthYear) return 0;
  return monthYear.year * 12 + monthYear.month;
};
