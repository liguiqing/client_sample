// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
// export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;

// Errors
export const PROBLEM_BASE_URL = 'https://www.wikipedia.org';
export const EMAIL_ALREADY_USED_TYPE = PROBLEM_BASE_URL + '/email-already-used';
export const LOGIN_ALREADY_USED_TYPE = PROBLEM_BASE_URL + '/login-already-used';

// Validation Pattern
export const POSITIVE_INTEGER_PATTERN: RegExp = /^[0-9]*$/;
export const REAL_NUMBER_PATTERN: RegExp = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
export const CURRENCY_PATTERN: RegExp = /^[0-9]+(.[0-9]{2})?$/;
export const EMAIL_PATTERN: RegExp = /^[_.@A-Za-z0-9-]*$/;
export const MOBILE_PATTERN: RegExp = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
export const PHONE_PATTERN: RegExp = /^(\d{3,4}-)?\d{7,8}$/;
export const IDCARD_PATTERN: RegExp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/;
export const PASSWORD_PATTERN: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;

// Form Fields
export const USER_NAME_MAXLENGTH = 20;
export const USER_NAME_MINLENGTH = 3;
export const PASSWORD_MINLENGTH = 6;
export const PASSWORD_MAXLENGTH = 20;
