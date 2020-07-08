let updateUser = new Vue({
    el:"#updateUser",
    data:{
        user:{
            nickName:'',
            userName:'',
            password:'',
            email:'',
            typeId:0,
        },
        typeList:[],
        error:'提示：请注意填写格式',
    },
    methods:{
        getUser(){
            let userId = $.query.get("userId");
            if(userId != null){
                $.get(serverIp+"user/selectUserByUserId",{userId:userId},function (bto) {
                    if(bto.data != null){
                        updateUser.user = bto.data;
                        updateUser.user.password = ''
                    }else {
                        window.location.href="error.html";
                    }
                });
            }else {
                window.location.href="error.html";
            }
        },
        getTypeList(){
            $.get(serverIp+"userType/selectUserTypeList",function (bto) {
                if(bto.data != null){
                    updateUser.typeList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        sub(){
            $('.ui.selection.dropdown').dropdown();
            let typeId = $("#typeId").val();
            alert(typeId);
            if(this.user.userName == null || this.user.userName == ''){
                updateUser.error = "用户名不能为空";
            }else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.user.password)){
                updateUser.error = "密码由6-16位字母和字符串组成";
            }else if(!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(this.user.email)){
                updateUser.error = "邮箱格式不对";
            }else if(typeId == null || typeId == 0){
                updateUser.error = "请选择角色分类";
            }else {
                let formData = new window.FormData($("form")[0]);
                formData.append("userId",$.query.get("userId"));
                formData.append("typeId",typeId);
                formData.append("avatar",updateUser.user.avatar);
                $.ajax({
                    type: "POST",
                    contentType: false,
                    processData: false,
                    url: serverIp+"user/updateUserSelect",
                    data: formData,
                    async: false,
                    success: function(bto) {
                        if(bto.flag){
                            window.location.href="index.html"
                        }else if(!bto.flag){
                            updateUser.error = bto.msg;
                        }else {
                            window.location.href="error.html"
                        }
                    }
                });
            }
        }
    },
    mounted(){
        //图片预览
        $("#file").change(function () {
            //创建blob对象，浏览器将文件放入内存中，并生成标识
            var img = URL.createObjectURL($(this)[0].files[0]);
            //添加img标签并给其src赋值
            $("#avatar").attr("src",img)
        });

        this.getTypeList();
        this.getUser();
        setTimeout(function () {
            $(".userType[data-value='"+updateUser.user.typeId+"']").addClass("active selected");
            $('.ui.selection.dropdown').dropdown();
        },200);
    }
});