/* eslint-disable no-useless-escape */
export default function isUserLoggedIn() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
  return !!token;
}
