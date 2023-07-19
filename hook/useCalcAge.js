export default function calcAge(birth_date) {
  const today = new Date();
  const birthDay = new Date(birth_date);

  return Math.floor((today - birthDay) / (1000 * 3600 * 24 * 365));
}
