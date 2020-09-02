import * as constants from '@/constants';

export function testEmpty(value: any): boolean {
  return typeof value === 'string' ? (value + '').length === 0 : false;
}

export function testMobile(value): boolean {
  return constants.MOBILE_PATTERN.test(value);
}
export function validMobile(value, callback): boolean {
  return constants.MOBILE_PATTERN.test(value) ? callback() : callback(new Error('请输入正确的手机号'));
}

export function isMobile(rule, value, callback): boolean {
  const result = constants.MOBILE_PATTERN.test(value);
  if (!result) {
    callback(new Error('请输入正确的手机号'));
  }
  callback();
  return result;
}

export function isEmpty(rule, value, callback): boolean {
  const result = (value + '').length > 0;
  if (!result) {
    callback(new Error('此项目不能为空'));
  }
  callback();
  return result;
}

export function isCurrency(rule, value, callback): boolean {
  const result = constants.CURRENCY_PATTERN.test(value);
  if (!result) {
    callback(new Error('请输入正确的金额'));
  }
  callback();
  return result;
}

export function isPositiveInteger(rule, value, callback): boolean {
  if (value === '') {
    callback(new Error('请输入正整数!'));
  }
  const result = constants.POSITIVE_INTEGER_PATTERN.test(value);
  if (!result) {
    callback(new Error('请输入正整数!'));
  }
  callback();
  return result;
}

export function isEmail(rule, value, callback): boolean {
  const result = constants.EMAIL_PATTERN.test(value);
  if (!result) {
    callback(new Error('请输入正确的电子邮箱!'));
  }
  callback();
  return result;
}

export function isIdCard(rule, value, callback): boolean {
  const result = constants.IDCARD_PATTERN.test(value);
  if (!result) {
    callback(new Error('请输入正确的身份证号码!'));
  }
  callback();
  return result;
}

export function isValidPassword(rule, value, callback): boolean {
  const result = constants.PASSWORD_PATTERN.test(value);
  if (!result) {
    callback(new Error('密码必须包含至少一个数字，一个大写字母，一个符号!'));
  }
  callback();
  return result;
}

export function formValidate($form, validCallback, invalidCallback) {
  $form.validate(
    (valid, fields) => {
      if (valid) {
        validCallback();
      }
    },
    err => {
      invalidCallback(err);
    }
  );
}
