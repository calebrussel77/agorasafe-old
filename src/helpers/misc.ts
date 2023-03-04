export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 *
 * @param str The string about we generate the color
 * @param s the saturation (s) of returned color(a number between 0 and 100)
 * @param l the lightness (l) of returned color(a number between 0 and 100)
 * @returns the hsl pastel color of the string passed
 */
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
