import React, { useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import FormDeviceHeader from './FormDeviceHeader';
import FormSummarySidebar from './FormSummarySidebar';
import {
  emptyShippingFormData,
  getShippingFieldLimit,
  validateShippingField,
  validateShippingForm,
  type ShippingFormData,
  type ShippingFormErrors,
} from './shipping-form-data';
import type { Phone } from './types';
import type { RepairType } from './configurator-data';

interface Props {
  model: Phone;
  repair: RepairType;
  initialData?: ShippingFormData;
  onSubmit: (data: ShippingFormData) => void;
  onBack: () => void;
}

const baseInputClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-base text-[#010101] shadow-contact outline-none transition placeholder:text-[#94a3b8] focus:ring-2';

const labelClass = 'mb-1.5 block text-sm font-semibold text-[#010101]';

function inputClassName(hasError: boolean): string {
  return hasError
    ? `${baseInputClass} border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/15`
    : `${baseInputClass} border-[#e2e8f0] focus:border-[#1c1d11] focus:ring-[#1c1d11]/10`;
}

const Field: React.FC<{
  id: keyof ShippingFormData;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  onChange: (id: keyof ShippingFormData, value: string) => void;
  onBlur: (id: keyof ShippingFormData) => void;
  multiline?: boolean;
}> = ({
  id,
  label,
  required,
  type = 'text',
  placeholder,
  value,
  error,
  maxLength,
  inputMode,
  autoComplete,
  onChange,
  onBlur,
  multiline,
}) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
      {required && <span className="text-[#dc2626]"> *</span>}
    </label>
    {multiline ? (
      <textarea
        id={id}
        rows={4}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(id, event.target.value)}
        onBlur={() => onBlur(id)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClassName(Boolean(error))} resize-y min-h-[112px]`}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        onChange={(event) => onChange(id, event.target.value)}
        onBlur={() => onBlur(id)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClassName(Boolean(error))}
      />
    )}
    {error && (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#dc2626]">
        {error}
      </p>
    )}
  </div>
);

const StepFillForm: React.FC<Props> = ({ model, repair, initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<ShippingFormData>(
    initialData ?? emptyShippingFormData(),
  );
  const [errors, setErrors] = useState<ShippingFormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const fieldRefs = useRef<Partial<Record<keyof ShippingFormData, HTMLDivElement | null>>>({});

  const handleChange = (id: keyof ShippingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setSubmitError('');
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleBlur = (id: keyof ShippingFormData) => {
    const error = validateShippingField(id, formData);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  };

  const scrollToFirstError = (nextErrors: ShippingFormErrors) => {
    const firstField = (Object.keys(nextErrors) as (keyof ShippingFormData)[])[0];
    const node = fieldRefs.current[firstField];
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusable = node?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea',
    );
    focusable?.focus();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateShippingForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitError('Uzupełnij poprawnie wszystkie wymagane pola, aby wygenerować formularz.');
      scrollToFirstError(nextErrors);
      return;
    }
    setSubmitError('');
    onSubmit(formData);
  };

  const setFieldRef =
    (id: keyof ShippingFormData) => (node: HTMLDivElement | null) => {
      fieldRefs.current[id] = node;
    };

  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#1c1d11] shadow-contact transition hover:bg-white"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
          Wstecz
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FormDeviceHeader repair={repair} model={model} />

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-7 shadow-contact sm:p-9"
            noValidate
          >
            <h1 className="text-2xl font-bold text-[#010101] sm:text-3xl">
              Uzupełnij formularz wysyłki
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#64748b] sm:text-base">
              Wypełnij dane kontaktowe i informacje o urządzeniu. Na kolejnym ekranie pobierzesz
              gotowy formularz PDF do wydruku i dołączenia do przesyłki.
            </p>

            {submitError && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]"
              >
                {submitError}
              </p>
            )}

            <div className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div ref={setFieldRef('firstName')}>
                  <Field
                    id="firstName"
                    label="Imię"
                    required
                    value={formData.firstName}
                    error={errors.firstName}
                    maxLength={getShippingFieldLimit('firstName')}
                    autoComplete="given-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jan"
                  />
                </div>
                <div ref={setFieldRef('lastName')}>
                  <Field
                    id="lastName"
                    label="Nazwisko"
                    required
                    value={formData.lastName}
                    error={errors.lastName}
                    maxLength={getShippingFieldLimit('lastName')}
                    autoComplete="family-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Kowalski"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div ref={setFieldRef('phone')}>
                  <Field
                    id="phone"
                    label="Numer telefonu"
                    required
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    error={errors.phone}
                    maxLength={getShippingFieldLimit('phone')}
                    autoComplete="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="730 000 000"
                  />
                </div>
                <div ref={setFieldRef('email')}>
                  <Field
                    id="email"
                    label="Adres e-mail"
                    required
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    error={errors.email}
                    maxLength={getShippingFieldLimit('email')}
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jan@example.com"
                  />
                </div>
              </div>

              <div ref={setFieldRef('street')}>
                <Field
                  id="street"
                  label="Ulica i numer (adres zwrotny)"
                  required
                  value={formData.street}
                  error={errors.street}
                  maxLength={getShippingFieldLimit('street')}
                  autoComplete="street-address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ul. Przykładowa 12/3"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div ref={setFieldRef('postalCode')}>
                  <Field
                    id="postalCode"
                    label="Kod pocztowy"
                    required
                    inputMode="numeric"
                    value={formData.postalCode}
                    error={errors.postalCode}
                    maxLength={getShippingFieldLimit('postalCode')}
                    autoComplete="postal-code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="00-000"
                  />
                </div>
                <div ref={setFieldRef('city')}>
                  <Field
                    id="city"
                    label="Miasto"
                    required
                    value={formData.city}
                    error={errors.city}
                    maxLength={getShippingFieldLimit('city')}
                    autoComplete="address-level2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Warszawa"
                  />
                </div>
              </div>

              <div ref={setFieldRef('serialNumber')}>
                <Field
                  id="serialNumber"
                  label="Numer IMEI / seryjny"
                  value={formData.serialNumber}
                  error={errors.serialNumber}
                  maxLength={getShippingFieldLimit('serialNumber')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Opcjonalnie"
                />
              </div>

              <div ref={setFieldRef('devicePassword')}>
                <Field
                  id="devicePassword"
                  label="Hasło do urządzenia"
                  value={formData.devicePassword}
                  error={errors.devicePassword}
                  maxLength={getShippingFieldLimit('devicePassword')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Opcjonalnie — ułatwi diagnostykę"
                />
              </div>

              <div ref={setFieldRef('notes')}>
                <Field
                  id="notes"
                  label="Opis usterki / dodatkowe uwagi"
                  value={formData.notes}
                  error={errors.notes}
                  maxLength={getShippingFieldLimit('notes')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Opisz problem z telefonem lub dodaj informacje dla serwisu"
                  multiline
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center rounded-[14px] bg-[#1c1d11] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2 sm:w-auto"
            >
              Generuj formularz PDF
            </button>
          </form>
        </div>

        <FormSummarySidebar model={model} repairKey={repair.repairKey} />
      </div>
    </div>
  );
};

export default StepFillForm;
