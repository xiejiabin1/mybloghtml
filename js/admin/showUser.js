let showUser = new Vue({
    el:"#showUser",
    data:{
        name:'',
        pageNum:1,
        pageInfo:{},
        typeList:{},
        message:'',
        user:{
            nickName:'',
            userName:'',
            password:'',
            email:'',
        },
        error:'注：请注意填写格式',
    },
    methods:{
        getInfo(pageNum){
            $.get(serverIp+"user/selectUserAll",
                {pageNum:pageNum,pageSize:10,typeId:$("#typeId").val(),name:this.name},
                function (bto) {
                if(bto.data != null){
                    showUser.pageInfo = bto.data;
                    if(pageNum > 0){
                        showUser.pageNum = pageNum;
                    }
                }else {
                    window.location.href="error.html";
                }
            });
        },
        getTypeList(){
            $.get(serverIp+"userType/selectUserTypeList",function (bto) {
                if(bto.data != null){
                    showUser.typeList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        doUp(userId,delStatus){
            $.post(serverIp+"user/delUser",{userId:userId,delStatus:delStatus},function (flag) {
                if(flag){
                    showUser.message = "操作成功！";
                    $("#search").click();
                }else {
                    showUser.message = "操作失败！";
                }
            });
        },
        updateUser(userId){
            window.location.href="updateUser.html?userId="+userId;
        },
        addUser(){
            $('.ui.modal').modal('show');
        },
        userNameBlur(){
            $.get(serverIp+"user/isUserName",{userName:this.user.userName},function (flag) {
                if(flag){
                    showUser.error = "用户名已存在";
                }
            })
        },
        sub(){
            $('.ui.selection.dropdown').dropdown();
            let typeId = $("#typeId2").val();
            if(this.user.userName == null || this.user.userName == ''){
                showUser.error = "用户名不能为空";
            }else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.user.password)){
                showUser.error = "密码由6-16位字母和字符串组成";
            }else if(!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(this.user.email)){
                showUser.error = "邮箱格式不对";
            }else if(typeId == null || typeId == 0){
                showUser.error = "请选择角色分类";
            }else {
                $.get(serverIp+"user/isUserName",{userName:this.user.userName},function (flag) {
                    if(flag){
                        showUser.error = "用户名已存在";
                    }else {
                        let formData = new window.FormData($("form")[0]);
                        formData.append("typeId",typeId);
                        $.ajax({
                            type: "POST",
                            contentType: false,
                            processData: false,
                            url: serverIp+"user/addUser",
                            data: formData,
                            async: false,
                            success: function(result) {
                                if(result){
                                    $(".ui.modal").modal("hide");
                                    $("#search").click();
                                }else {
                                    showUser.error = "新增用户失败，请稍后再试！";
                                }
                            }
                        });
                    }
                })

            }
        }
    },
    filters:{
        dateFormat(dateTime){
            if(dateTime != null){
                var date = new Date(dateTime);
                var year = date.getFullYear();
                var month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hour = date.getHours()<10 ? "0"+(date.getHours()) : date.getHours();
                var minutes = date.getMinutes()<10 ? "0"+(date.getMinutes()) : date.getMinutes();
                var seconds = date.getSeconds()<10 ? "0"+(date.getSeconds()) : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
            }
            return null;
        },
    },
    mounted(){
        this.getInfo();
        this.getTypeList();

        //清除按钮
        $('#clear-btn').on('click', function() {
            showUser.name = '';
            $('.ui.type.dropdown').dropdown('clear');
        });

        //图片预览
        $("#file").change(function () {
            //创建blob对象，浏览器将文件放入内存中，并生成标识
            var img = URL.createObjectURL($(this)[0].files[0]);
            //添加img标签并给其src赋值
            $("#avatar").attr("src",img)
        });
    }
});