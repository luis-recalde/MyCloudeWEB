// Replace PHONE_NUMBER with the WhatsApp number (country code + number, no + or spaces)
// Paraguay example: 595XXXXXXXXX
// Or set NEXT_PUBLIC_WA_PHONE in .env.local
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_WA_PHONE ?? 'XXXXXXXXXXX'
if (PHONE_NUMBER === 'XXXXXXXXXXX') {
  console.warn('[config] NEXT_PUBLIC_WA_PHONE no está configurado — los links de WhatsApp no funcionarán')
}
export const EMAIL = 'info@rsgamesclub.com'

export function waHref(text?: string): string {
  const msg = text
    ? encodeURIComponent(text)
    : 'Hola%2C%20vi%20RS%20Games%20Club%20y%20quiero%20consultar%20algo.'
  return `https://wa.me/${PHONE_NUMBER}?text=${msg}`
}
