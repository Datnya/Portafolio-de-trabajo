// Genera el archivo público desde la única fuente editable: contact-config.js.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, 'contact-config.js'), 'utf8'),
  context,
  { filename: 'contact-config.js' }
);
const contact = context.window.contactConfig;
for (const key of ['name', 'contactDisplayName', 'role', 'phone', 'email', 'website', 'linkedin']) {
  if (!contact?.[key]) throw new Error(`Falta ${key} en contact-config.js`);
}

const escapeText = value => String(value)
  .replace(/\\/g, '\\\\')
  .replace(/\r?\n/g, '\\n')
  .replace(/,/g, '\\,')
  .replace(/;/g, '\\;');

const lines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Monzón;Datnya;;;',
  `FN:${escapeText(contact.contactDisplayName)}`,
  `TITLE:${escapeText(contact.role)}`,
  `TEL;TYPE=CELL:${contact.phone}`,
  `EMAIL;TYPE=INTERNET:${contact.email}`,
  `URL:${contact.website}`,
  `URL;TYPE=LinkedIn:${contact.linkedin}`
];
if (contact.organization) lines.push(`ORG:${escapeText(contact.organization)}`);
lines.push('END:VCARD');

fs.writeFileSync(path.join(__dirname, '..', 'datnya-monzon.vcf'), `${lines.join('\r\n')}\r\n`, 'utf8');
