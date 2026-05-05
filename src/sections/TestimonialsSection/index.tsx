import { useMemo, useState } from 'react';
import Container from '../../components/Container';
import Paragraph from '../../components/ElementWrapper/Paragraph';
import SectionHeader from '../../components/heading/SectionHeader';
import { reviews as reviewsData } from './reviews';

type FilterMode = 'most-relevant' | 'newest';

const monthMap: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const getRecencyScore = (posted: string): number => {
  const normalized = posted.toLowerCase().trim();

  if (normalized.includes('day ago')) return 10_000_000;
  if (normalized.includes('days ago')) return 9_900_000;
  if (normalized.includes('week ago')) return 9_800_000;
  if (normalized.includes('weeks ago')) return 9_700_000;

  const [monthWord, yearWord] = normalized.split(' ');
  const month = monthMap[monthWord];
  const year = Number(yearWord);

  if (Number.isNaN(year) || month === undefined) return 0;
  return year * 12 + month;
};

const TestimonialsSection = () => {
  const [filterMode, setFilterMode] = useState<FilterMode>('most-relevant');
  const [visibleCount, setVisibleCount] = useState(8);

  const reviews = useMemo(
    () =>
      reviewsData.map((review) => ({
        id: review.id,
        name: review.name || 'Guest',
        location: review.location || 'Airbnb guest',
        rating: review.rating || 5,
        posted: review.posted || 'Recent stay',
        quote: review.quote || '',
      })),
    []
  );

  const reviewSummary = useMemo(() => {
    if (!reviews.length) {
      return { totalReviews: 0, averageRating: 0, fiveStarPercent: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const fiveStarCount = reviews.filter((review) => review.rating === 5).length;

    return {
      totalReviews: reviews.length,
      averageRating: totalRating / reviews.length,
      fiveStarPercent: Math.round((fiveStarCount / reviews.length) * 100),
    };
  }, [reviews]);

  const reviewThemes = useMemo(() => {
    const checks = [
      { label: 'Spotless and modern interiors', match: /(clean|spotless|modern|pristine|beautiful)/i },
      { label: 'Walkable and convenient location', match: /(walk|close|location|beach|restaurant|grocery)/i },
      { label: 'Responsive host communication', match: /(responsive|communication|host|welcome|helpful)/i },
      { label: 'Quiet and secure community', match: /(quiet|safe|security|gated)/i },
    ];

    return checks
      .filter(({ match }) => reviews.some((review) => match.test(review.quote)))
      .map(({ label }) => label);
  }, [reviews]);

  const featuredReviews = useMemo(() => reviews.slice(0, 3), [reviews]);

  const visibleReviews = useMemo(() => {
    const filtered = [...reviews];

    if (filterMode === 'newest') {
      return filtered.sort((a, b) => getRecencyScore(b.posted) - getRecencyScore(a.posted)).slice(0, visibleCount);
    }

    return filtered.slice(0, visibleCount);
  }, [filterMode, visibleCount]);

  const resetFilter = (nextFilter: FilterMode) => {
    setFilterMode(nextFilter);
    setVisibleCount(8);
  };

  const filteredTotal = useMemo(() => reviews.length, [reviews.length]);

  return (
    <section className="">
      <Container classValue="gap-8 bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(238,247,247,0.92))]">
        <div className="flex flex-col gap-3">
          <p className="section-kicker text-center">Guest Testimonials</p>
          <SectionHeader title="Loved by guests in Jaco" centerText={true}>
            <Paragraph classValue="mx-auto max-w-3xl">
              Real feedback from Airbnb guests who stayed at Vista Monte Mar, presented with the original tone and
              context so you can see what stays feel like in practice.
            </Paragraph>
          </SectionHeader>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] border border-white/80 bg-white/70 p-5 shadow-[0_20px_45px_rgba(38,61,74,0.1)] sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f6a44]">Total Reviews</p>
            <p className="mt-2 text-3xl font-semibold text-[#23404b]">{reviewSummary.totalReviews}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f6a44]">Average Rating</p>
            <p className="mt-2 text-3xl font-semibold text-[#23404b]">{reviewSummary.averageRating.toFixed(2)} / 5</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f6a44]">5 Star Stays</p>
            <p className="mt-2 text-3xl font-semibold text-[#23404b]">{reviewSummary.fiveStarPercent}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-[1.6rem] border border-[#f1dfcf] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(254,248,241,0.9))] p-5 shadow-[0_16px_35px_rgba(43,66,74,0.1)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3f5] text-sm font-semibold text-[#345564]">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#32525f]">
                    {review.name} <span className="font-normal text-slate-500">({review.location})</span>
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#a56b44]">
                    Rating {review.rating}/5 | {review.posted}
                  </p>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{review.quote}</p>
            </article>
          ))}
        </div>

        <div className="content-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9f6a44]">All Reviews</p>
            <div className="flex flex-wrap gap-2">
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filterMode === 'most-relevant' ? 'bg-[#d89a67] text-white' : 'bg-white text-[#2f4f5a] hover:bg-[#f3e2d2]'
                }`}
                onClick={() => resetFilter('most-relevant')}
              >
                Most Relevant
              </button>
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filterMode === 'newest' ? 'bg-[#d89a67] text-white' : 'bg-white text-[#2f4f5a] hover:bg-[#f3e2d2]'
                }`}
                onClick={() => resetFilter('newest')}
              >
                Newest
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleReviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3f5] text-sm font-semibold text-[#345564]">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="min-w-0 truncate font-semibold text-[#284650]">
                      {review.name} <span className="font-normal text-slate-500">({review.location})</span>
                    </p>
                  </div>
                  <span className="rounded-full border border-[#e9d0b8] bg-[#fff7f0] px-3 py-1 text-xs font-semibold text-[#9f6a44]">
                    {review.rating}/5
                  </span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#6f8b92]">{review.posted}</p>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{review.quote}</p>
              </article>
            ))}
          </div>

          {visibleReviews.length < filteredTotal && (
            <div className="mt-6 flex justify-center">
              <button className="soft-button" onClick={() => setVisibleCount((prev) => prev + 8)}>
                Show More Reviews
              </button>
            </div>
          )}
        </div>

        <div className="rounded-[1.25rem] border border-white/80 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f6a44]">Most Mentioned</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {reviewThemes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-[#d9c0a9] bg-[#fff9f3] px-3 py-1 text-xs font-medium text-[#6f5440]"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;


