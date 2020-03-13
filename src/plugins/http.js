import axios from 'axios'

const HttpTool = {}
HttpTool.install = (Vue)=>{
// axios
axios.defaults.baseURL= '/'
Vue.prototype.$http = axios

}

export default HttpTool