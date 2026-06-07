import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Doświadczenie i wiedza',
    text: 'Łączymy doświadczenie i wiedzę ekspercką, by oferować usługi na najwyższym poziomie w naprawie smartfonów i tabletów w Warszawie.',
  },
  {
    title: 'Punktualność',
    text: 'Cenimy Twój czas — gwarantujemy terminowe usługi w sercu Ursusa, bez zbędnej zwłoki.',
  },
  {
    title: 'Dbałość o detale',
    text: 'Każda wymiana ekranu, baterii czy inna naprawa wykonywana jest z precyzją — urządzenie jak nowe.',
  },
  {
    title: 'Opinie klientów',
    text: 'Poleceni przez mieszkańców Ursusa i Warszawy — dołącz do grona zadowolonych klientów SpaceFix.',
  },
];

const TrustUsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <h2 className="section-title mb-10 text-center">Dlaczego nam ufają?</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="card overflow-hidden bg-cover bg-center p-6"
              style={{ backgroundImage: "url('/images/space.jpg')" }}
            >
              <div className="rounded-xl bg-white/95 p-5 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-bold text-[#010101]">{card.title}</h3>
                <p className="prose-muted">{card.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustUsSection;
