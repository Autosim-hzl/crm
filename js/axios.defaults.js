axios.defaults.baseURL = "http://127.0.0.1:8888";//配置请求的基本路径
axios.defaults.withCredentials = true;//配置为true，这样后台的请求都会带上cookie 第一次访问的时候就会终值cookie
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';
axios.defaults.transformRequest = function(data){
    if(!data)return data;
    let result=``;
    for(let attr in data){
        if(!data.hasOwnProperty(attr)) break;
        result +=`&${attr}=${data[attr]}`;
    }
    return result.substring(1);
}
//配置响应拦截器,使响应回来的数据里面只有data 
axios.interceptors.response.use(response=>{
    return response.data;
},reason=>{
    console.log(reason);
    return Promise.reject(reason)
})