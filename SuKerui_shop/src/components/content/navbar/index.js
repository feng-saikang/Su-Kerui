import NavBar from './NavBar.vue'
import RightNav from './RightNav.vue'
import FooterBar from '../../common/FooterBar.vue'
import FooterNav from '@/components/common/FooterNav.vue'

export default {
    install(Vue) {
        Vue.component(NavBar.name, NavBar);
        Vue.component(RightNav.name, RightNav);
        Vue.component(FooterBar.name, FooterBar)
        Vue.component(FooterNav.name, FooterNav)
    }
}
