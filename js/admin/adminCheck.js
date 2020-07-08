$(document).ready(function () {
    if(getCookie("userId") == null || getCookie("admin") == null || getCookie("admin") != "2501267970" || getCookie("typeId") == null){
        window.location.href="login.html";
    }else{
        let userId = JSON.parse(getCookie("userId"));
        $.get(serverIp+"user/selectUserByUserId",{userId:userId},function (bto) {
            let user = bto.data;
            if(user != null){
                $("#userAvatar").attr("src","http://152.136.107.185:8089/myblog/"+user.avatar);
                $("#spanName").html(user.nickName);
                $("#goUpdate").on("click",function () {
                    window.location.href="updateUser.html?userId="+user.userId;
                })
            }else {
                window.location.href="error.html";
            }
        });
    }

    //注销按钮
    $('.menu.toggle').click(function () {
        $('.m-item').toggleClass('m-mobile-hide');
    });
    $('.ui.dropdown').dropdown({
        on : 'hover'
    });

    $("#exit").on("click",function () {
        // $.get(serverIp+"user/exit",
        //     {userId:"userId",admin:"admin",typeId:"typeId",user:"user"},
        //     function (result) {
        //         window.location.href="login.html";
        //     }
        // );
        removeCookie("userId");
        removeCookie("typeId");
        removeCookie("admin");
        removeCookie("user");
        window.location.href="login.html";
    });

});