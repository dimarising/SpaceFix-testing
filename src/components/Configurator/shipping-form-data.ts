export interface ShippingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  postalCode: string;
  city: string;
  serialNumber: string;
  devicePassword: string;
  notes: string;
}

export const emptyShippingFormData = (): ShippingFormData => ({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  street: '',
  postalCode: '',
  city: '',
  serialNumber: '',
  devicePassword: '',
  notes: '',
});

export type ShippingFormErrors = Partial<Record<keyof ShippingFormData, string>>;

const namePattern = /^[\p{L}\s'-]{2,}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const postalCodePattern = /^\d{2}-\d{3}$/;
const imeiPattern = /^\d{15}$/;

const FIELD_LIMITS = {
  firstName: 50,
  lastName: 50,
  phone: 20,
  email: 100,
  street: 120,
  postalCode: 6,
  city: 80,
  serialNumber: 20,
  devicePassword: 50,
  notes: 500,
} as const;

function countPhoneDigits(phone: string): number {
  return phone.replace(/\D/g, '').length;
}

function validateName(
  value: string,
  emptyMessage: string,
  invalidMessage: string,
  maxLength: number,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return emptyMessage;
  if (trimmed.length > maxLength) return `Maksymalnie ${maxLength} znaków`;
  if (!namePattern.test(trimmed)) return invalidMessage;
  return undefined;
}

export function validateShippingField(
  field: keyof ShippingFormData,
  data: ShippingFormData,
): string | undefined {
  switch (field) {
    case 'firstName':
      return validateName(
        data.firstName,
        'Podaj imię',
        'Imię może zawierać tylko litery',
        FIELD_LIMITS.firstName,
      );
    case 'lastName':
      return validateName(
        data.lastName,
        'Podaj nazwisko',
        'Nazwisko może zawierać tylko litery',
        FIELD_LIMITS.lastName,
      );
    case 'phone': {
      const phone = data.phone.trim();
      if (!phone) return 'Podaj numer telefonu';
      if (countPhoneDigits(phone) < 9) return 'Numer telefonu musi mieć co najmniej 9 cyfr';
      if (countPhoneDigits(phone) > 15) return 'Numer telefonu jest za długi';
      return undefined;
    }
    case 'email': {
      const email = data.email.trim();
      if (!email) return 'Podaj adres e-mail';
      if (email.length > FIELD_LIMITS.email) return 'Adres e-mail jest za długi';
      if (!emailPattern.test(email)) return 'Podaj poprawny adres e-mail';
      return undefined;
    }
    case 'street': {
      const street = data.street.trim();
      if (!street) return 'Podaj ulicę i numer';
      if (street.length < 3) return 'Adres jest za krótki';
      if (street.length > FIELD_LIMITS.street) return 'Adres jest za długi';
      return undefined;
    }
    case 'postalCode': {
      const postalCode = data.postalCode.trim();
      if (!postalCode) return 'Podaj kod pocztowy';
      if (!postalCodePattern.test(postalCode)) return 'Kod pocztowy musi mieć format 00-000';
      return undefined;
    }
    case 'city': {
      const city = data.city.trim();
      if (!city) return 'Podaj miasto';
      if (city.length < 2) return 'Nazwa miasta jest za krótka';
      if (!namePattern.test(city)) return 'Miasto może zawierać tylko litery';
      if (city.length > FIELD_LIMITS.city) return 'Nazwa miasta jest za długa';
      return undefined;
    }
    case 'serialNumber': {
      const serial = data.serialNumber.trim();
      if (!serial) return undefined;
      const digitsOnly = serial.replace(/\s/g, '');
      if (imeiPattern.test(digitsOnly)) return undefined;
      if (/^\d{10,20}$/.test(digitsOnly)) return undefined;
      return 'Podaj poprawny numer IMEI (15 cyfr) lub numer seryjny';
    }
    case 'devicePassword': {
      const password = data.devicePassword.trim();
      if (!password) return undefined;
      if (password.length > FIELD_LIMITS.devicePassword) return 'Hasło jest za długie';
      return undefined;
    }
    case 'notes': {
      const notes = data.notes.trim();
      if (!notes) return undefined;
      if (notes.length > FIELD_LIMITS.notes) return 'Opis może mieć maksymalnie 500 znaków';
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateShippingForm(data: ShippingFormData): ShippingFormErrors {
  const fields = Object.keys(data) as (keyof ShippingFormData)[];
  const errors: ShippingFormErrors = {};

  for (const field of fields) {
    const error = validateShippingField(field, data);
    if (error) errors[field] = error;
  }

  return errors;
}

export function getShippingFieldLimit(field: keyof ShippingFormData): number | undefined {
  return FIELD_LIMITS[field as keyof typeof FIELD_LIMITS];
}

export const REQUIRED_SHIPPING_FIELDS: (keyof ShippingFormData)[] = [
  'firstName',
  'lastName',
  'phone',
  'email',
  'street',
  'postalCode',
  'city',
];
