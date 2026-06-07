import React from 'react';

const images = [
  { src: '/images/aboutUnplash1.png', alt: 'SpaceFix serwis — zdjęcie 1' },
  { src: '/images/aboutUnplash2.png', alt: 'SpaceFix serwis — zdjęcie 2' },
  { src: '/images/aboutUnplash3.png', alt: 'SpaceFix serwis — zdjęcie 3' },
];

const AboutImagesSection = () => {
  return (
    <section className="section-padding bg-surface pt-0">
      <div className="section-container grid grid-cols-1 gap-4 sm:grid-cols-3">
        {images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-2xl shadow-card">
            <img alt={img.alt} src={img.src} className="h-48 w-full object-cover sm:h-56 md:h-64" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutImagesSection;
