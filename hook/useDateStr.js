export default function GetDateQuery() {
  const today = new Date();
  const yesterDay = new Date(today.getTime() + 1000 * 60 * 60 * 24 * -1);

  const year = yesterDay.getFullYear();
  const month = shift(yesterDay.getMonth() + 1);
  const day = shift(yesterDay.getDate());

  return `${year}${month}${day}`;
}

function shift(data) {
  if (data < 10) return `0${data}`;
  return `${data}`;
}
