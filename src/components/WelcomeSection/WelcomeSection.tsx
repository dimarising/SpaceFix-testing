import React from 'react';
import ExpressRepairBadge from './ExpressRepairBadge';
import HeroGoogleReviewBadge from './HeroGoogleReviewBadge';
import WelcomeHeroActions from './WelcomeHeroActions';

const WelcomeSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-x-hidden bg-[#fbfcfe] scroll-mt-[var(--header-height)]"
      aria-label="SpaceFix — serwis telefonów Warszawa Ursus"
    >
      <div className="hero-kv-frame relative mx-auto h-[801px] overflow-hidden">
        <img
          src="/images/assets/main-KV.png"
          alt=""
          className="hero-kv-image pointer-events-none absolute inset-y-0 left-1/2 h-full -translate-x-1/2 select-none"
          width={1920}
          height={801}
          decoding="async"
          fetchpriority="high"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        <div className="section-container relative z-10 flex h-full flex-col items-center text-center">
          <div className="flex w-full flex-col items-center gap-6 pt-[64px] sm:gap-7 md:gap-8">
            <ExpressRepairBadge />

            <h1 className="max-w-4xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              SpaceFix - Serwis Telefonów Warszawa Ursus
            </h1>

            <WelcomeHeroActions />
          </div>

          <HeroGoogleReviewBadge className="mt-auto mb-6 sm:mt-[300px] sm:mb-0" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
