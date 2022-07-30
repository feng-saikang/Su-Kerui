import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './locale/zh'
import zhtw from './locale/zh-tw'
import en from './locale/en'

const i18n = new VueI18n({
    local: localStorage.getItem('locale') || 'zh',
    messages: {
        zh,
        en,
        zhtw,
    }
})
export default i18n;

