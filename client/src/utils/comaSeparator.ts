export function numberWithCommas(num: number | string) {
  let nf = new Intl.NumberFormat('en-US');

  if(String(num).indexOf('.') !== -1) return num;
  return nf.format(Number(num));
}