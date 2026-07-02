import React from 'react';

const AboutText = () => {
  return (
    <section id="o-nas" className="section-padding bg-surface scroll-mt-[var(--header-height)]">
      <div className="section-container text-center">
        <h2 className="section-title mb-6">
          Profesjonalny serwis naprawy smartfonów SpaceFix — Ursus Warszawa
        </h2>
        <div className="space-y-4 text-center text-base leading-relaxed text-[#64748b] sm:text-lg">
          <p>
            Pasjonujemy się najnowszymi rozwiązaniami mobilnymi, dostarczając mieszkańcom{' '}
            <strong className="text-surface-dark">Warszawy</strong> usługi najwyższej klasy.
          </p>
          <p>
            Nasz <strong className="text-surface-dark">serwis smartfonów w Ursusie</strong> skupia się na detalu — od
            drobnych poprawek estetycznych po skomplikowane naprawy techniczne, aby Twoje smartfony i tablety działały
            jak nowe. Nasz <strong className="text-surface-dark">serwis telefonów</strong> stawia na precyzję i najwyższą
            jakość obsługi, przekraczając Twoje oczekiwania przy każdej wizycie.
          </p>
          <p>
            Damy Twojemu smartfonowi drugie życie. Z nami Twoje smartfony i tablety znów będą mogły działać pełną mocą. W{' '}
            <strong className="text-surface-dark">SpaceFix</strong> każda naprawa to krok w stronę długotrwałych relacji z
            naszymi klientami z Ursusa i okolic.
          </p>
          <p>
            Doświadcz jakości usług, które przywrócą Twoje urządzenia do życia. Odwiedź nas w{' '}
            <strong className="text-surface-dark">Warszawie (dzielnica Ursus)</strong> i pozwól nam zadbać o Twoje
            urządzenie.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutText;
