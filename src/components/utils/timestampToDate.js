export default function timestampToDate(timestamp) {
  // 建立 Date 實體，將時間戳 * 1000轉為毫秒
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  // 月份從 0 算起要 + 1
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${year}/${month}/${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDay = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return {
    formattedDate,
    formattedTime,
    formattedDay,
  };
}
