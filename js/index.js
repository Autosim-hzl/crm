$(function(){
    //获取元素
    let $navBoxList = $(".navBox>a");
    let $itemBoxList = null;

    init();
    let $plan = $.Callbacks();
    $plan.add((_,baseInfo)=>{
            $(".baseBox>span").html(`你好,${baseInfo.name || ""}`)
        })
    //控制组织结构和客户管理进行切换
    //实现初始的左侧栏框
    $plan.add((power)=>{
        //根据不同的权限渲染不同的菜单
        let str = ``;
        if(power.includes("userhandle")){ //这一点一定要保证power是一个字符串
            str+=`<div class="itemBox" text="员工管理"><h3><i class="iconfont icon-yuangong">员工管理</i></h3>
                    <nav class="item"><a href="page/userlist.html" target="iframeBox">员工列表</a><a href="page/useradd.html" target="iframeBox">新增员工</a></nav></div>`
                    ;

        }
        if(power.includes("departhandle")){
            str+=`<div class="itemBox" text="部门管理">
                        <h3><i class="iconfont icon-yuangong">部门管理</i></h3>
                    
                    <nav class="item">
                        <a href="./page/departmentlist.html" target="iframeBox">部门列表</a>
                        <a href="./page/departmentadd.html" target="iframeBox">新增部门</a>
                    </nav></div>`
        }
        if(power.includes("jobhandle")){
            str+=`<div class="itemBox" text="职位管理">
                        <h3><i class="iconfont icon-yuangong">职位管理</i></h3>
                    
                    <nav class="item">
                        <a href="./page/joblist.html" target="iframeBox">职位列表</a>
                        <a href="./page/jobadd.html" target="iframeBox">新增职位</a>
                    </nav></div>`
        }
        if(power.includes("customerall")){
            str+=`<div class="itemBox" text="客户管理">
                        <h3><i class="iconfont icon-yuangong">客户管理</i></h3>
                    
                    <nav class="item">
                        <a href="./page/customerlist.html" target="iframeBox">我的客户</a>
                        <a href="./page/customeradd.html" target="iframeBox">新增客户</a>
                        <a href="./page/customerlist.html" target="iframeBox">全部客户</a>
                    </nav></div>`
        }
        $(".menuBox").html(str);
        $itemBoxList = $(".menuBox").find(".itemBox");
    });
    //实现tab选项卡功能
    $plan.add((power)=>{
        // 控制默认显示的是哪一个
        let initIndex = power.includes("customer") ? 0 : 1//如果权限里面包含power，初始的initIndex就是0,否则就是1
        $navBoxList.eq(initIndex).addClass("active").siblings().removeClass("active");
        handleGroup(initIndex)//调用筛选函数

        // 实现点击切换
        $navBoxList.click(function(){
            //点击哪一个 就给哪一个添加active属性
            let index = $(this).index();
            let text = $(this).html().trim()
            //点击后判断当前点击的是客户管理还是组织结构，如果是客户管理就判断power里面是否有客户管理的权限，如果是组织结构就判断里面是否有组织结构的权限   
            if(text === "客户管理" && !/customerall/.test(power) || (text === "组织结构")&& !/(userhandle|departhandle|jobhandle)/.test(power)){
                alert("没有权限访问");
                return ;
            }
            if(index === initIndex) return;//当我们点击的index和上面进来的index是同一个的时候 不在调用筛选 直接结束
            $(this).addClass("active").siblings().removeClass("active");
            handleGroup(index);//能走到这里表示点击的和进来的不一样，此时进行筛选
            initIndex = index;//将点击的index赋值，目的是为了刷新后如果一样则保持原来的
        })
    })
    //对iframe的初始化
    $plan.add((power)=>{

    })
    //定义初始函数 
    async function init(){
        let result = await axios.get("/user/login");
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
        power.code===0?power=power.power:null//这一行表示，如果我们的power.code如果为0，则将power中的那个字符串给我们的power
        baseInfo.code===0?baseInfo=baseInfo.data:null
        $plan.fire(power,baseInfo)//因为上面对power重新定义了 所以这里传进入的power就一个字符串
    }
    //定义选项卡中筛选的函数
    function handleGroup(index){
        //分两组  $group1  $group2
        //控制哪一组显示
        console.log($itemBoxList);
        let $group1 = $itemBoxList.filter((index,item)=>{
            //将item转成JQ对象
            let text = $(item).attr("text");
            console.log(text);
            return text === '客户管理';
        });
        let $group2 = $itemBoxList.filter((_,item)=>{
            let text = $(item).attr("text");
            return /^(员工管理|部门管理|职位管理)/.test(text);
        })
        if(index ===0){
            $group1.css("display","block")
            $group2.css("display","none")
        }else if(index === 1){
            $group1.css("display","none")
            $group2.css("display","block")

        }
    }

})
