import Vue from "vue";
import RightNav from '@/components/content/navbar/index.js';
import NavBar from "@/components/content/navbar/index";
import Title from '@/components/common/title/index';
import Recommend from '@/components/common/Recommend/index.js'
//  使用ant组件库中组件
import {
    Button,
    Card,
    Row,
    Col,
    Input,
    Table,
    Icon,
    BackTop,
    Drawer,
    Rate,
    Tabs,
    Steps,
    
} from 'ant-design-vue';

const vueUse = {
    Button,
    Card,
    Row,
    Col,
    Input,
    Table,
    NavBar,
    Icon,
    BackTop,
    Drawer,
    RightNav,
    Title,
    Recommend,
    Rate,
    Tabs,
    Steps,
    
};



// 使用组件
Object.keys(vueUse).forEach(item => {
    Vue.use(vueUse[item]);
})

