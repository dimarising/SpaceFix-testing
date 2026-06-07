import React, { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import { ModelCard } from './cards';
import { getModels } from './configurator-data';
import type { Brand, Category, Phone } from './types';

interface Props {
  brand: Brand;
  category: Category;
  onSelect: (model: Phone) => void;
  onBack: () => void;
}

const StepChooseModel: React.FC<Props> = ({ brand, category, onSelect, onBack }) => {
  const models = getModels(category);
  const title = String(category?.name ?? '').replace(brand?.name ?? '', '').trim() || category?.name;

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter((model: any) => String(model.name).toLowerCase().includes(q));
  }, [models, query]);

  return (
    <div>
      <StepHeader title={title} badge={brand?.name} onBack={onBack} />

      <div className="mx-auto mb-8 max-w-xl">
        <div className="relative">
          <FiSearch
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748b]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Wyszukaj model..."
            aria-label="Wyszukaj model"
            className="w-full rounded-2xl border border-[#e2e8f0] bg-white py-3.5 pl-12 pr-4 text-base text-[#010101] shadow-contact outline-none transition placeholder:text-[#94a3b8] focus:border-[#1c1d11] focus:ring-2 focus:ring-[#1c1d11]/10"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((model: any) => (
            <ModelCard key={model.slug} name={model.name} onClick={() => onSelect(model)} />
          ))}
        </div>
      ) : (
        <p className="text-center text-base text-[#64748b]">
          Brak modeli pasujących do „{query}”.
        </p>
      )}

      <NotFoundCta question="Nieznalazłeś swojego modelu?" />
    </div>
  );
};

export default StepChooseModel;
