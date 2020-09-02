import { mixins } from 'vue-class-component';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import AlertMixin from '@/shared/alert/alert.mixin';

import JhiDataUtils from '@/shared/data/data-utils.service';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import { IAccount } from '@/account/account.model';
import { Authority } from '@/shared/security/authority';
@Component({
  computed: {
    adminTotal() {
      return this.accounts.filter(account => account.authorities.includes(Authority.ADMIN));
    },
  },
})
export default class Home extends mixins(JhiDataUtils, AlertMixin) {
  @Inject('loginService') private loginService: () => LoginService;
  @Inject('accountService') private accountService: () => AccountService;

  public accounts: IAccount[] = [];

  mounted(): void {
    this.accountService()
      .getAllAccout()
      .then(data => {
        // 前端笔试要求
        // 1.请将反回数据转换为accounts,并渲染到页面
        // 2.请使用jest 对此组件进行单元测试
      });
  }
}
