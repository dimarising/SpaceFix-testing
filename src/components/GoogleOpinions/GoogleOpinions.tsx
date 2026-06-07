import React, { useCallback, useEffect, useState } from 'react';
import { contact } from '../../config/site';
import CarouselDots from './CarouselDots';
import CarouselNavButton from './CarouselNavButton';
import RatingSummaryBadge from './RatingSummaryBadge';
import ReviewCard from './ReviewCard';
import { reviews } from './reviews-data';

const DESKTOP_BREAKPOINT = 1085;
const TABLET_BREAKPOINT = 640;
const CARDS_PER_VIEW_DESKTOP = 3;
const CARDS_PER_VIEW_TABLET = 2;

function getCardsPerView(width: number): number {
  if (width >= DESKTOP_BREAKPOINT) return CARDS_PER_VIEW_DESKTOP;
  if (width >= TABLET_BREAKPOINT) return CARDS_PER_VIEW_TABLET;
  return 1;
}

const GoogleOpinions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(getCardsPerView(window.innerWidth));

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => Math.min(maxIndex, current + 1));
  }, [maxIndex]);

  const visibleReviews = reviews.slice(activeIndex, activeIndex + cardsPerView);
  const isDesktop = cardsPerView === CARDS_PER_VIEW_DESKTOP;
  const showCarouselDots = !isDesktop;

  return (
    <section
      id="opinie"
      className="relative overflow-hidden bg-[#fbfcfe] scroll-mt-[var(--header-height)] py-16 md:py-20 lg:flex lg:h-[917px] lg:items-center lg:py-0"
    >
      <div className="absolute inset-y-0 left-1/2 w-full max-w-[1440px] -translate-x-1/2 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center blur"
          style={{ backgroundImage: "url('/images/assets/opinions-bg.png')" }}
        />
      </div>
      <div className="absolute inset-0 bg-[#fbfcfe]/70" aria-hidden />

      <div className="section-container relative z-10">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-12 lg:mb-10">
          <h2 className="section-title mb-3 md:mb-4">Co mówią nasi klienci?</h2>
          <p className="section-subtitle mx-auto">
            Dołącz do setek zadowolonych klientów
          </p>
        </header>

        <div className="relative mx-auto w-full max-w-6xl lg:mb-10">
          {isDesktop && (
            <>
              <CarouselNavButton
                direction="prev"
                onClick={goToPrevious}
                disabled={activeIndex === 0}
                className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 lg:flex xl:-left-5"
              />
              <CarouselNavButton
                direction="next"
                onClick={goToNext}
                disabled={activeIndex >= maxIndex}
                className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 lg:flex xl:-right-5"
              />
            </>
          )}

          <div
            className={`grid justify-items-center gap-5 md:gap-6 ${
              cardsPerView === 3
                ? 'grid-cols-3'
                : cardsPerView === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-1'
            }`}
            aria-live="polite"
          >
            {visibleReviews.map((review) => (
              <ReviewCard key={`${review.author}-${review.date}`} review={review} />
            ))}
          </div>

          {showCarouselDots && (
            <CarouselDots
              count={reviews.length}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              className="mt-6"
            />
          )}
        </div>

        <div className="mt-10 flex justify-center md:mt-12 lg:mt-0">
          <RatingSummaryBadge href={contact.googleReviews} />
        </div>
      </div>
    </section>
  );
};

export default GoogleOpinions;
