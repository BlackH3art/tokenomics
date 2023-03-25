export function numberWithCommas(num: number | string) {
  let nf = new Intl.NumberFormat('en-US');
  return nf.format(Number(num));
}