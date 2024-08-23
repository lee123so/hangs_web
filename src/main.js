import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router/router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from "@/store";
import axios from "axios";
import {config,options} from "@/utils/config";
import {Buffer} from "buffer";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports
);
library.add(fas)

const app = createApp(App)
app.config.globalProperties.Buffer = Buffer
app.config.globalProperties.axios = axios
app.use(router)
app.use(store)
app.provide('config', config);
app.provide('options', options);
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
