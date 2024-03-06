import axios from "axios";

export default function isUserLoggedIn() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
  // axios headers 預設寫法
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  }
  return !!token;
}
