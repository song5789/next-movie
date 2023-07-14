export default function useSetPage(max) {
  let arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i);
  }
  return arr;
}
