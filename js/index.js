$(function(){
    
    let $plan = $.Callbacks();
        $plan.add((_,baseInfo)=>{
            console.log(baseInfo);
            $(".baseBox>span").html(`你好,${baseInfo.name || ""}`)
        })
        $plan.add((power)=>{
            console.log("渲染菜单",power);
            console.log("22222");
        });
    init();
    async function init(){
        let result = await axios.get("/user/login");
        console.log(result);
        if(result.code!=0){
            alert("你还没有登录请先登录");
            //如果code不等于0，那么就会跳转到开始界面
            window.location.href="login.html";
            return ;
        }
        //说明你登录成功了
        let [power,baseInfo] = await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        baseInfo.code===0?baseInfo=baseInfo.data:null
        console.log("11111");
        $plan.fire(power,baseInfo)
    }
    
})
