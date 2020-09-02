import Vue from 'vue';

import { dateToString, DATE_FORMAT_PARTTERN } from './date-util';

export function initFilters() {
  Vue.filter('formatDate', value => {
    return dateToString(value, DATE_FORMAT_PARTTERN.yyyyMMdd);
  });
  Vue.filter('formatDateCn', value => {
    return dateToString(value, DATE_FORMAT_PARTTERN.yyyyMMdd_CN);
  });
  Vue.filter('formatMillis', value => {
    return dateToString(value, DATE_FORMAT_PARTTERN.yyyyMMddHHmmssSSS);
  });
  Vue.filter('formatSecond', value => {
    return dateToString(value, DATE_FORMAT_PARTTERN.yyyyMMddHHmmss);
  });
  Vue.filter('currencyFormat', value => {
    if (!value) {
      return '0.00';
    }

    // 原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
    // 后来改成了 Number(value)|0,但是输入超过十一位就为负数了，具体见评论 */
    // 获取整数部分（这里是windy93的方法）
    const intPart = Number(value) - (Number(value) % 1);
    // 将整数部分逢三一断
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    // 预定义小数部分
    let floatPart = '.00';
    const value2Array = value.toString().split('.');

    // =2表示数据有小数位
    if (value2Array.length === 2) {
      // 拿到小数部分
      floatPart = value2Array[1].toString();

      if (floatPart.length === 1) {
        // 补0,实际上用不着
        return intPartFormat + '.' + floatPart + '0';
      } else {
        return intPartFormat + '.' + floatPart;
      }
    } else {
      return intPartFormat + floatPart;
    }
  });
}
