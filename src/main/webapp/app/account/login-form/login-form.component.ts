import axios from 'axios';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import AccountService from '@/account/account.service';
import ValidateService from '@/shared/validation/validate.service';
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import * as formValidator from '@/shared/validation/form.validation';
import { PASSWORD_MINLENGTH, PASSWORD_MAXLENGTH, USER_NAME_MINLENGTH, USER_NAME_MAXLENGTH } from '@/constants';

const validations = {
  resetPassword: {
    currentPassword: {
      required,
    },
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
  },
};
@Component({
  watch: {
    $route() {
      this.$store.commit('hideLoginDialog');
    },
  },
})
export default class LoginForm extends Vue {
  @Inject('accountService')
  private accountService: () => AccountService;
  @Inject('validateService')
  private validateService: () => ValidateService;
  public authenticationError = null;
  public activeName = 'mobile';
  public vcodeText = '获取验证码';

  public mobileLogin = {
    mobile: '',
    vcode: '',
  };
  public mobileLoginRule = {
    mobile: [
      {
        required: true,
        message: '请输入正确的手机号！',
        trigger: 'blur',
      },
      { validator: this.validMobile, trigger: 'blur' },
    ],
    vcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  };

  public userLogin = {
    login: '',
    password: '',
  };
  public userLoginRule = {
    login: [
      {
        required: true,
        message: '请输入用户名！',
        trigger: 'blur',
      },
      { min: USER_NAME_MINLENGTH, max: USER_NAME_MAXLENGTH, message: '用户名长度为' + USER_NAME_MINLENGTH + '-' + USER_NAME_MAXLENGTH + '个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: PASSWORD_MINLENGTH, max: PASSWORD_MAXLENGTH, message: '密码长度为' + PASSWORD_MINLENGTH + '-' + PASSWORD_MAXLENGTH + '个字符', trigger: 'blur' },
    ],
  };

  public rememberMe: boolean = null;

  public mobileFormName = 'mobileLoginForm';
  public userFormName = 'userLoginForm';
  public sendAgin = true;
  public maxTimer = 120;

  public doLogin(): void {
    const account = {
      model: this.activeName,
      login: '',
      password: '',
      rememberMe: false,
    };
    if (this.activeName === 'mobile') {
      if (!formValidator.testMobile(this.mobileLogin.mobile)) {
        return;
      }
      if (formValidator.testEmpty(this.mobileLogin.vcode)) {
        return;
      }
      account.login = this.mobileLogin.mobile;
      account.password = this.mobileLogin.vcode;
      this.toLogin(account);
    } else {
      const el: any = this.$refs[this.userFormName];
      el.validate(
        (valid, fields) => {
          if (valid) {
            account.login = this.userLogin.login;
            account.password = this.userLogin.password;
            account.rememberMe = this.rememberMe;
            this.toLogin(account);
          }
        },
        err => {}
      );
    }
  }

  public toLogin(account): void {
    axios
      .post('api/authenticate', account)
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('interview-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('interview-authenticationToken', jwt);
          }
        }
        this.authenticationError = false;
        this.$store.commit('hideLoginDialog');
        this.accountService().retrieveAccount();
        this.$refs[this.mobileFormName].resetFields();
        this.$refs[this.userFormName].resetFields();
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  public postVCode(): void {
    if (!formValidator.testMobile(this.mobileLogin.mobile)) {
      this.$refs.mobile.focus();
      return;
    }
    this.validateService()
      .question('mobile', this.mobileLogin.mobile)
      .then(() => {
        this.countDown();
      });
  }
  public validMobile(rule, value, callback) {
    formValidator.isMobile(rule, value, callback);
  }

  // 倒计时
  public countDown() {
    const timeCount = this.maxTimer;
    let timer = null;

    let count = timeCount;
    this.sendAgin = false;
    this.vcodeText = this.maxTimer + 'S';
    timer = setInterval(() => {
      if (count > 0 && count <= this.maxTimer) {
        count--;
        this.vcodeText = count + 'S';
      } else {
        this.sendAgin = true;
        clearInterval(timer);
        timer = null;
        this.vcodeText = '获取验证码';
      }
    }, 1000);
  }
}
