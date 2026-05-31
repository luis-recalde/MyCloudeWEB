// Replace PHONE_NUMBER with the WhatsApp number (country code + number, no + or spaces)
// Paraguay example: 595XXXXXXXXX
export const PHONE_NUMBER = 'XXXXXXXXXXX'
export const EMAIL = 'info@rsgamesclub.com'

export function waHref(text?: string): string {
  const msg = text
    ? encodeURIComponent(text)
    : 'Hola%2C%20vi%20RS%20Games%20Club%20y%20quiero%20consultar%20algo.'
  return `https://wa.me/${PHONE_NUMBER}?text=${msg}`
}
