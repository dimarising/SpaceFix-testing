import React from 'react';

const AboutText = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="section-container mx-auto max-w-3xl text-center">
        <h1 className="section-title mb-6">Profesjonalny serwis SpaceFix — Ursus, Warszawa</h1>
        <div className="space-y-4 prose-muted text-left md:text-center">
          <p>
            Pasjonujemy się najnowszymi rozwiązaniami mobilnymi, dostarczając mieszkańcom{' '}
            <strong className="text-surface-dark">Warszawy</strong> usługi najwyższej klasy.
          </p>
          <p>
            Nasz <strong className="text-surface-dark">serwis smartfonów w Ursusie</strong> skupia się na detalu — od
            drobnych poprawek estetycznych po skomplikowane naprawy techniczne.
          </p>
          <p>
            W <strong className="text-surface-dark">SpaceFix</strong> każda naprawa to krok w stronę długotrwałych
            relacji z klientami z Ursusa i okolic.
          </p>
        </div>
        <a href="/#naprawy" className="btn-primary mt-8 inline-flex">
          Zobacz nasze usługi
        </a>
      </div>
    </section>
  );
};

export default AboutText;
