export function today() {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const [day, month, year] = formatter.format(new Date()).split('/');
  return { day, month, year };
}
