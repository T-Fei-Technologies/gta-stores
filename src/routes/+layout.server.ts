export const load = ({ setHeaders }) => {
  setHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  });
}