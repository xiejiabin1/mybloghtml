let userLogin = new Vue({
    el:"#userLogin",
    data:{
        userName:'',
        password:'',
        error:'',
        user:{
            nickName:'',
            userName:'',
            password:'',
            password2:'',
            email:'',
            error:'',
        },
    },
    methods:{
        login(){
            if(this.userName == null || this.userName == ''){
                userLogin.error = "用户名不能为空";
            }else if(this.password == null || this.password == ''){
                userLogin.error = "密码不能为空";
            }else {
                $.post(serverIp+"user/userLogin",
                    {userName:userLogin.userName,password:userLogin.password},
                    function (bto) {
                        if(bto.flag){
                            userLogin.error = '';
                            setCookie("userId",JSON.stringify(bto.data.userId));
                            setCookie("typeId",JSON.stringify(bto.data.typeId));
                            if(bto.data.typeId != 3){
                                setCookie("admin","2501267970");
                            }
                            setCookie("user","1499618025");
                            window.location.href="index.html";
                        }else {
                            userLogin.error = bto.msg;
                        }
                    });
            }
        },
        isLogin(){
            let userId = getCookie("userId");
            let user = getCookie("user");
            let typeId = getCookie("typeId");
            if(userId != null && user == "1499618025" && typeId!= null){
                window.location.href="index.html";
            }
        },
        addUser(){
            $('.ui.modal').modal('show');
            $("#addUser").on("click",function () {
                let flag5 = userLogin.emailBlur();
                let flag4 = userLogin.password2Blur();
                let flag3 = userLogin.passwordBlur();
                let flag2 = userLogin.userNameBlur();
                let flag1 = userLogin.nickNameBlur();

                if(flag1 && flag2 && flag3 && flag4 && flag5){
                    $.get(serverIp+"user/isUserName",{userName:userLogin.user.userName},function (flag) {
                        if(flag){
                            userLogin.user.error = "用户名已存在";
                        }else {
                            userLogin.user.error = "";
                            $.post(serverIp+"user/addUser",
                                {
                                    nickName:userLogin.user.nickName,
                                    userName:userLogin.user.userName,
                                    password:userLogin.user.password,
                                    email:userLogin.user.email,
                                },
                                function (flag) {
                                    if(flag){
                                        $('.ui.modal').modal('hide');
                                    }else {
                                        userLogin.user.error = "注册失败，请联系管理员";
                                    }
                                }
                            );
                        }
                    });
                }
            });
        },
        nickNameBlur(){
            if(this.user.nickName.length > 10){
                userLogin.user.error = "用户昵称的字数不能大于10";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },
        userNameBlur(){
            if(this.user.userName.length > 10 || this.user.userName.length <= 0){
                userLogin.user.error = "用户名有0-10位字符组成";
                return false;
            }else {
                $.get(serverIp+"user/isUserName",{userName:userLogin.user.userName},function (flag) {
                    if(flag){
                        userLogin.user.error = "用户名已存在";
                    }else {
                        userLogin.user.error = "";
                    }
                });
                return true;
            }
        },
        passwordBlur(){
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.user.password)){
                userLogin.user.error = "密码由6-16位字母和字符串组成";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },
        password2Blur(){
            if(this.user.password != this.user.password2){
                userLogin.user.error = "确认密码要一致";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },
        emailBlur(){
            if(!/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(this.user.email)){
                userLogin.user.error = "邮箱格式不对";
                return false;
            }else {
                userLogin.user.error = "";
                return true;
            }
        },

    },
    mounted(){
        this.isLogin();
        $.get(serverIp+"user/sess");
    }
});