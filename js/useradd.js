$(function(){
    initDeptAndJob();
    async function initDeptAndJob(){
        console.log(queryDepart());
        let departmentData= await queryDepart();
        let jobData = await queryJob();
        console.log(departmentData);
        console.log(jobData);
        if(departmentData.code === 0 ){//如果返回的code为0，说明成功拿到了数据
            departmentData = departmentData.data
            let str =``;
            //对拿到的数据进行遍历，然后利用拼接字符串的方法写进html
            departmentData.forEach(item=>{
                str+=`<option value="${item.id}">${item.name}</option>`
            })
            $('.userdepartment').html(str);
        }
        //同样的方法吧第二个也添加进去
        if(jobData.code  === 0){
            jobData = jobData.data;
            let str=``;
            jobData.forEach(item=>{
                str+=`<option value="${item.id}">${item.name}</option>`
            })
            $(".userjob").html(str);
        }
    }
    function checkname(){
            let val = $(".username").val().trim();
            console.log(val);
            if(val.length === 0){
                $(".spanusername").html("此为必填项")
                return false;
            }
            if(!/^[\u4e00-\u9fa5]{2,10}$/.test(val)){
                $(".spanusername").html("名字必须是2-10个汉字")
                return false;
            }
            $(".spanusername").html("名字OK")
            return true;
    }
    function checkemail(){
            let val = $(".useremail").val().trim();
            if(val.length === 0){
                $(".spanuseremail").html("此为必填项")
                return false;
            }
            if(!/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/){
                $(".spanuseremail").html("请输入正确的邮箱")
                return false;
            }
            $(".spanuseremail").html("邮箱OK")
            return true;
    }
    function checkphone(){
            let val = $(".userphone").val().trim();
            if(val.length === 0){
                $(".spanuserphone").html("此为必填项")
                return false;
            }
            if(!/^1[3|4|5|7|8][0-9]{9}$/.test(val)){
                $(".spanuserphone").html("请输入正确的手机号")
                return false;
            }
            $(".spanuserphone").html("手机号OK")
            return true;
    }
    $(".username").blur(checkname);
    $(".useremail").blur(checkphone);
    $(".userphone").blur(checkemail);
    $(".submit").click(async function(){
        if( !checkname() || !checkemail() || !checkphone()){
            alert("你填写的数据不合法")
            return;
        }
        let params={
            name:$(".username").val().trim(),
            sex:$("#man").prop("checked")?0:1,
            email:$(".useremail").val().trim(),
            phone:$(".userphone").val().trim(),
            departmentData:$(".userdapertment").val(),
            jobId:$(".userjob").val(),
            desc:$(".userdesc").val().trim()
        }
        console.log(params);
        let result = await axios.post("/user/add",params);
        if(result.code === 0 ){
            alert("添加员工成功")
            window.location.href="userlist.html"
            return 
        }
        alert("网络不给力，请重试")
    })
})