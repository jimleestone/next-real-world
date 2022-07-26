import * as R from 'ramda';

export const spacer = R.join(' ');
export function joinStyles(styles: Record<any, string>): string {
  return spacer(R.values(styles));
}

export function joinStylesFromArray(...styles: Array<string | undefined>): string {
  return spacer(styles);
}
