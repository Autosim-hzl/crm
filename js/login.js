$(function(){
    //登录功能
    //在这里我们给表单加了一个提交事件，拿到账户密码然后进行匹配，首先输入的账号密码不能为空
    $(".submit").click(async function(e){
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();
        if(account === "" || password ===""){
            alert("账号和密码不能为空~");
            //如果为空直接返回一个弹框，然后通过return结束函数
            return;
        }
        //这里对密码进行加密
        password = md5(password);
        //打印出拿到的账号和密码
        console.log(account,password)
        //下面这种为通过axios的方式发送一个ajax请求，如果成功就打印出拿到的数据，如果失败就打印出错误，详情温习promise
        // axios.post("http://localhost:8888/user/login",{
        //     account,
        //     password
        // }).then(value=>{
        //     console.log(value)
        // }).catch(err=>{
        //     console.log(err);
        // })

        //这样也是发送ajax请求，通过res拿到返回的值，原本我们的ajax是异步代码
        //通过这样的书写，就将其变的像同步代码一样，从上往下执行，用res去接受拿到的数据
        //当然，通过showdoc文档我们知道我们要的数据都在result里，其余的数据我们不需要
        //所以我们使用了axios响应拦截器，当然，axios的拦截器有很多种，我们在这里只使用了响应拦截器
        //具体我们配置在了axios.defaults.js中

        let res = await axios.post("/user/login",{account,password})

        //打印出我们的res
        // {code: 0, codeText: "OK", power: "userhandle|departhandle|jobhandle|customerall"}
        //可以看到里面返回的就是我们showdoc文档上返回的东西
        console.log(res);

        //这时候我们的res里因为响应拦截器的原因所以res里只有result里面的内容，所以我们可以直接通过打点调用code判断响应是否成功
        if(parseInt(res.code)=== 0){
            alert("登陆成功")
            //登陆成功后我们发生跳转，跳转到主页面，因为浏览器的缘故，所以我们在location之前加上一个window
            window.location.href="index.html"
            return ;//结束我们的函数
        }
       else{
        alert("用户名不存在或密码错误了")//上面没有结束说明密码出现了错误或者用户名不存在，所以我们返回一个弹框提示
        return ;
       }
    })
})