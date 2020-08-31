$(function(){
    initDepartment();
    async function initDepartment(){
        let result = await queryDepart();
        if(result.code === 0){
            let str=``
            result.data.forEach(item=>{
                str+=`<option value="${item.id}">${item.name}</option>`
            })
            $(".selectBox").html(str);
        }
    }
    showUserList();
    async function showUserList(){
        let params ={
            departmentId:$(".selectBox").val(),
            search:$(".searchInp").val().trim()
        }
        let result = await axios.get("/user/list",{params})
        console.log(result);
        if(result.code!=0){return }
        let str=``;
        result.data.forEach(item=>{
            str+=`<tr>
            <td class="w3"><input type="checkbox"></td>
            <td class="w10">${item.name}</td>
            <td class="w5">${item.sex==0?"男":"女"}</td>
            <td class="w10">${item.department}</td>
            <td class="w10">${item.job}</td>
            <td class="w15">${item.email}</td>
            <td class="w15">${item.phone}</td>
            <td class="w20">${item.desc}</td>
            <td class="w12" userId="${item.id}">
                <a href="javascript:;">编辑</a>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">重置密码</a>
            </td>
        </tr>`
        })
        $(".tableBox>tbody").html(str)
    }
})
