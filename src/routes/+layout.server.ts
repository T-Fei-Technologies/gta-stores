export const load = ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'max-age=60',
  });
}