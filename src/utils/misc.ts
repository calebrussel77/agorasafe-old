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
export function stringToHslColor(str = 'random name', s = 30, l = 80) {
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
  return null;
};

//Returns true if it is a DOM node
export function isDOMNode(o) {
  return typeof Node === 'object'
    ? o instanceof Node
    : o &&
        typeof o === 'object' &&
        typeof o.nodeType === 'number' &&
        typeof o.nodeName === 'string';
}

//Returns true if it is a DOM element
export function isDOMElement(o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
}
