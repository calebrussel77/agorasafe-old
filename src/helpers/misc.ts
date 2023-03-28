import clsx, { ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function stringToHslColor(str = 'random name', s = 90, l = 30) {
  var hash = 0;
  for (var i = 0; i < str?.length; i++) {
    hash = str?.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

export const getNameInitials = (text: string = '') => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  // eslint-disable-next-line no-unsafe-optional-chaining
  let initials: any = [...(text && text?.matchAll(rgx))] || [];
  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  return initials;
};

export const wait = (t: number) =>
  new Promise(resolve => setTimeout(resolve, t));

export const formatPhoneNumber = (phoneNumberString: string) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumberString;
};

export const makeRandomId = (): string => Math.random().toString(36).slice(2);

export const isStringsArray = (arr: Array<any>) =>
  arr.every(i => typeof i === 'string');

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const numberWithCommas = (number: number | string) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

export const formatDateToString = (date: Date | number) => {
  return format(new Date(date), 'yyyy-MM-dd');
};
