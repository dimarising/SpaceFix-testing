import React, { useEffect, useState } from 'react';
import StepChooseRepair from './StepChooseRepair';
import StepChooseDevice from './StepChooseDevice';
import StepChooseSeries from './StepChooseSeries';
import StepChooseModel from './StepChooseModel';
import StepSummary from './StepSummary';
import StepFillForm from './StepFillForm';
import StepForm from './StepForm';
import { emptyShippingFormData, type ShippingFormData } from './shipping-form-data';
import { getSelectableCategories, repairTypes, findModelSelection, type RepairType } from './configurator-data';
import {
  getModelSelectionSlugs,
  resolveInitialRepairId,
  syncBrowserUrl,
  type ModelSelectionSlugs,
} from './konfigurator-url';
import { withBase } from '../../utils/withBase';
import type { Brand, Category, Phone, Step } from './types';

const stepBackgrounds: Record<Step, string | null> = {
  1: withBase('/images/assets/naprawy-screen-1.png'),
  2: withBase('/images/assets/naprawy-screen-2.png'),
  3: withBase('/images/assets/naprawy-screen-3.png'),
  4: null,
  5: withBase('/images/assets/naprawy-screen-5-6.png'),
  6: withBase('/images/assets/naprawy-screen-5-6.png'),
  7: withBase('/images/assets/naprawy-screen-5-6.png'),
};

function resolveInitialFromRepairId(repairId?: string | null): { step: Step; repair?: RepairType } {
  if (!repairId) return { step: 1 };
  const preselected = repairTypes.find((r) => r.id === repairId);
  if (preselected) return { step: 2, repair: preselected };
  return { step: 1 };
}

function resolveInitialState(
  initialRepairIdProp?: string | null,
  initialModelSlugs?: ModelSelectionSlugs | null,
): {
  step: Step;
  repair?: RepairType;
  brand?: Brand;
  category?: Category;
  model?: Phone;
} {
  const repairId = resolveInitialRepairId(initialRepairIdProp);

  if (initialModelSlugs) {
    const selection = findModelSelection(
      initialModelSlugs.brandSlug,
      initialModelSlugs.categorySlug,
      initialModelSlugs.modelSlug,
    );
    if (selection) {
      const repair =
        (repairId ? repairTypes.find((r) => r.id === repairId) : undefined) ?? repairTypes[0];
      return {
        step: 5,
        repair,
        brand: selection.brand,
        category: selection.category,
        model: selection.model,
      };
    }
  }

  const fromRepair = resolveInitialFromRepairId(repairId);
  return { ...fromRepair, brand: undefined, category: undefined, model: undefined };
}

interface ConfiguratorProps {
  /** Z ?naprawa=... (Astro) — od razu krok 2, bez migania ekranu 1. */
  initialRepairId?: string | null;
  /** Z /offer/<marka>/<seria>/<model>/ — od razu krok 5 z wybranym modelem. */
  initialModelSlugs?: ModelSelectionSlugs | null;
}

const Configurator: React.FC<ConfiguratorProps> = ({
  initialRepairId: initialRepairIdProp,
  initialModelSlugs,
}) => {
  const [initial] = useState(() => resolveInitialState(initialRepairIdProp, initialModelSlugs));
  const [step, setStep] = useState<Step>(initial.step);
  const [repair, setRepair] = useState<RepairType | undefined>(initial.repair);
  const [brand, setBrand] = useState<Brand | undefined>(initial.brand);
  const [category, setCategory] = useState<Category | undefined>(initial.category);
  const [model, setModel] = useState<Phone | undefined>(initial.model);
  const [shippingFormData, setShippingFormData] = useState<ShippingFormData>(
    emptyShippingFormData,
  );

  // Przewijamy na górę przy każdej zmianie kroku.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // Informujemy stronę (.astro) o aktualnym kroku i wybranej naprawie, aby pod
  // ekranem podsumowania z ceną (krok 5) pokazać sekcje z odpowiedniej strony usługi.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('configurator:state', {
        detail: { step, repairId: repair?.id ?? null },
      }),
    );
  }, [step, repair]);

  // Po wyborze modelu (krok 5+) aktualizujemy URL na /offer/<marka>/<seria>/<model>/.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (step >= 5 && model && brand && category) {
      syncBrowserUrl(getModelSelectionSlugs(brand, category, model), repair?.id ?? null);
    } else {
      syncBrowserUrl(null, repair?.id ?? null);
    }
  }, [step, model, brand, category, repair]);

  const handleSelectRepair = (selected: RepairType) => {
    setRepair(selected);
    // Po zmianie naprawy (gdy model już wybrany) wracamy od razu do podsumowania.
    setStep(model ? 5 : 2);
  };

  const handleSelectBrand = (selected: Brand) => {
    setBrand(selected);
    setCategory(undefined);
    setModel(undefined);
    const categories = getSelectableCategories(selected);
    if (categories.length === 1) {
      setCategory(categories[0]);
      setStep(4);
    } else {
      setStep(3);
    }
  };

  const handleSelectCategory = (selected: Category) => {
    setCategory(selected);
    setModel(undefined);
    setStep(4);
  };

  const handleSelectModel = (selected: Phone) => {
    setModel(selected);
    setStep(5);
  };

  const backFromModel = () => {
    setStep(brand && getSelectableCategories(brand).length <= 1 ? 2 : 3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepChooseRepair onSelect={handleSelectRepair} />;
      case 2:
        return <StepChooseDevice onSelect={handleSelectBrand} onBack={() => setStep(1)} />;
      case 3:
        return (
          <StepChooseSeries brand={brand} onSelect={handleSelectCategory} onBack={() => setStep(2)} />
        );
      case 4:
        return (
          <StepChooseModel
            brand={brand}
            category={category}
            onSelect={handleSelectModel}
            onBack={backFromModel}
          />
        );
      case 5:
        return (
          <StepSummary
            model={model as Phone}
            repair={repair as RepairType}
            onChangeRepair={() => setStep(1)}
            onDownloadForm={() => setStep(6)}
            onBack={() => setStep(4)}
          />
        );
      case 6:
        return (
          <StepFillForm
            model={model as Phone}
            repair={repair as RepairType}
            initialData={shippingFormData}
            onSubmit={(data) => {
              setShippingFormData(data);
              setStep(7);
            }}
            onBack={() => setStep(5)}
          />
        );
      case 7:
        return (
          <StepForm
            model={model as Phone}
            repair={repair as RepairType}
            formData={shippingFormData}
            onBack={() => setStep(6)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] overflow-hidden bg-[#fbfcfe]">
      {stepBackgrounds[step] && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-cover bg-center transition-[background-image] duration-300"
            style={{ backgroundImage: `url('${stepBackgrounds[step]}')` }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#fbfcfe]/80 via-[#fbfcfe]/85 to-[#fbfcfe]"
            aria-hidden="true"
          />
        </>
      )}

      <div className="section-container relative z-10 py-12 md:py-16 lg:py-20">{renderStep()}</div>
    </section>
  );
};

export default Configurator;
