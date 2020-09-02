import { format, parseISO } from 'date-fns';
import { isNumber } from 'util';

export enum DATE_FORMAT_PARTTERN {
  yyyyMMdd = 'yyyy-MM-dd',
  yyyyMMddHHmm = 'yyyy-MM-dd HH:mm',
  yyyyMMddHHmmss = 'yyyy-MM-dd HH:mm:ss',
  yyyyMMddHHmmssSSS = 'yyyy-MM-dd HH:mm:ss:',
  yyyyMMdd_CN = 'yyyy年M月d日',
  yyyyMMddHHmm_CN = 'yyyy年M月d日 HH:mm',
  yyyyMMddHHmmss_CN = 'yyyy年M月d日 HH:mm:ss',
}

export function dateToString(date, parttern: DATE_FORMAT_PARTTERN): string {
  if (date) {
    if (isNumber(date * 1)) {
      return format(new Date(date), parttern);
    }
    return format(parseISO(date), parttern);
  }
  return date;
}
