import { Component, Inject, Vue } from 'vue-property-decorator';
import { VERSION } from '@/constants';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';

@Component
export default class JhiNavbar extends Vue {
  @Inject('loginService') private loginService: () => LoginService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('accountService') private accountService: () => AccountService;
  public version = VERSION ? 'v' + VERSION : '';
  private currentLanguage = this.$store.getters.currentLanguage;
  private languages: any = this.$store.getters.languages;
  private hasAnyAuthorityValue = false;
  private actived = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {});
  }

  public toSettings() {
    // 前端笔试要求
    // 路由：名称：Settings 请添加到路由管理器中，此路由需要访问ROLE_USER;
    // 数据模型 /webpack/mock/data/account.json
    // 请完成用户设置功能:修改email,mobile,name,提交时需要验证数据的合法性
    // 请在程序中展示Vue生命周期中至少一个hook(如mounted,beforeMount等)的用法，及watch,computed的用法
    // 程序文件请保存在 app/core/settings目录
    // 可以使用elementui组件，也可以直接使用html标签
    // 数据提交地址：PUT /api/account/settings
  }

  public toChinese() {
    this.translationService().refreshTranslation('zh-cn');
  }

  public changeLanguage(newLanguage: string): void {
    this.translationService().refreshTranslation(newLanguage);
  }

  public isActiveLanguage(key: string): boolean {
    return key === this.$store.getters.currentLanguage;
  }

  public logout(): void {
    localStorage.removeItem('interview-authenticationToken');
    sessionStorage.removeItem('interview-authenticationToken');
    this.$store.commit('logout');
    this.$router.push('/');
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get account(): any {
    return this.accountService().loginAccount;
  }

  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValue = value;
      });
    return this.hasAnyAuthorityValue;
  }

  public get swaggerEnabled(): boolean {
    return this.$store.getters.activeProfiles.indexOf('swagger') > -1;
  }

  public get inProduction(): boolean {
    return this.$store.getters.activeProfiles.indexOf('prod') > -1;
  }
}
