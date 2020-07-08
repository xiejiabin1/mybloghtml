let adminIndex = new Vue({
    el:"#adminIndex",
    data:{
        adminList:{},
    },
    methods:{
        getAdminList(){
            $.get(serverIp+"user/selectAdminAll",function (bto) {
                if(bto.data != null){
                    adminIndex.adminList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
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
        this.getAdminList();
    }
});