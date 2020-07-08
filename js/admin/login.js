let adminLogin = new Vue({
    el:"#adminLogin",
    data:{
        userName:'',
        password:'',
        error:'',
    },
    methods:{
        login(){
            if(this.userName == null || this.userName == ''){
                adminLogin.error = "用户名不能为空";
            }else if(this.password == null || this.password == ''){
                adminLogin.error = "密码不能为空";
            }else {
                $.post(serverIp+"user/adminLogin",
                    {userName:adminLogin.userName,password:adminLogin.password},
                    function (bto) {
                        if(bto.flag){
                            adminLogin.error = '';
                            setCookie("userId",JSON.stringify(bto.data.userId));
                            setCookie("typeId",JSON.stringify(bto.data.typeId));
                            setCookie("admin","2501267970");
                            setCookie("user","1499618025");
                            window.location.href="index.html";
                        }else {
                            adminLogin.error = bto.msg;
                        }
                });
            }
        },
        isLogin(){
            let userId = getCookie("userId");
            let admin = getCookie("admin");
            let typeId = getCookie("typeId");
            if(userId != null && admin == "2501267970" && typeId!= null){
                window.location.href="index.html";
            }
        }
    },
    mounted(){
        this.isLogin();
        $.get(serverIp+"user/sess");
    }
});