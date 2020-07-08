let updateUser = new Vue({
    el:"#updateUser",
    data:{
        user:{
            nickName:'',
            userName:'',
            password:'',
            password2:'',
            email:'',
        },
        error:'',
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
        updateUser(){
            let flag4 = updateUser.emailBlur();
            let flag3 = updateUser.password2Blur();
            let flag2 = updateUser.passwordBlur();
            let flag1 = updateUser.nickNameBlur();
            alert(updateUser.user.avatar);
            if(flag1 && flag2 && flag3 && flag4){
                let formData = new window.FormData($("form")[0]);
                formData.append("userId",$.query.get("userId"));
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
        },
        nickNameBlur(){
            if(this.user.nickName.length > 8){
                updateUser.user.error = "用户昵称的字数不能大于8";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
        passwordBlur(){
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.user.password)){
                updateUser.error = "密码由6-16位字母和字符串组成";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
        password2Blur(){
            if(this.user.password != this.user.password2){
                updateUser.error = "确认密码要一致";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
        emailBlur(){
            if(!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(this.user.email)){
                updateUser.error = "邮箱格式不对";
                return false;
            }else {
                updateUser.error = "";
                return true;
            }
        },
    },
    mounted(){
        this.getUser();
        // 导航栏显示
        var waypoint = new Waypoint({
            element: document.getElementById('waypoint'),
            handler: function(direction) {
                if (direction == 'down') {
                    $('#nav').show(500);
                } else {
                    $('#nav').hide(500);
                }
                console.log('Scrolled to waypoint!  ' + direction);
            }
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