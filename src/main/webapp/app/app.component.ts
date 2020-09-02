import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '@/core/navbar/navbar.vue';
import LoginForm from '@/account/login-form/login-form.vue';
import TranslationService from './locale/translation.service';
import { Inject } from 'vue-property-decorator';

@Component({
  components: {
    navbar: Navbar,
    'login-form': LoginForm,
  },
})
export default class App extends Vue {
  @Inject('translationService') private translationService: () => TranslationService;
  public created(): void {}

  public closeLoginDialog(done): void {
    done();
    this.$store.commit('hideLoginDialog');
  }
}
