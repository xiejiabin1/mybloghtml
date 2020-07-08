let message = new Vue({
    el:"#message",
    data:{
        messageList:[],
        content:'',
        userId: null,
        message:{}
    },
    methods:{
        getMessage(){
            $.get(serverIp+"message/listMessage",function (bto) {
                if(bto.data != null){
                    message.messageList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        replay(message){
            this.message = message;
            $("textarea").attr("placeholder","@"+message.user.nickName);
            window.location.href="#";
        },
        addMess(){
            if(this.content == null || this.content == ''){
                $("#message-form .field").addClass("error");
            }else {
                if(message.message != null){
                    $.post(serverIp+"message/addMessage",
                        {
                            userId:message.userId,
                            parentMessageId:message.message.messageId,
                            content:message.content,
                            typeId:JSON.parse(getCookie("typeId"))
                        },
                        function (flag) {
                            if(flag){
                                message.getMessage();
                                message.clearBtn();
                            }else {
                                window.location.href="error.html";
                            }
                    });
                }
            }
        },
        clearBtn(){
            this.content = '';
            this.message = '';
            $("textarea").attr("placeholder","请输入留言信息...");
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
                // 拼接
                return year+"年"+month+"月"+day+"日 "+hour+"时"+minutes+"分";
            }
            return null;
        },
    },
    mounted(){
        if(getCookie("userId") != null && getCookie("userId") != ""){
            this.userId = JSON.parse(getCookie("userId"));
        }
        this.getMessage();

        $(document).on("input propertychange","textarea",function(){
            if(message.content == null || message.content == ''){
                $("#message-form .field").attr("class","field error");
            }else {
                $("#message-form .field").attr("class","field");
            }
        });

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
        })
    }
});