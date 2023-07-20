export default function calcAge(birth_date) {
  const today = new Date();
  const birthDay = new Date(birth_date);

  return Math.floor((today - birthDay) / (1000 * 3600 * 24 * 365));
}

export function deathAge(birth, death) {
  const birthDay = new Date(birth);
  const passedDay = new Date(death);

  return Math.floor((passedDay - birthDay) / (1000 * 3600 * 24 * 365));
}
