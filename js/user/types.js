let types = new Vue({
    el:"#types",
    data:{
        typeList:{},
        pageInfo:{},
        pageNum:1,
        id:$.query.get("id"),
    },
    methods:{
        getTypeList(){
            $.get(serverIp+"blogType/selectBlogTypeToCount",function (bto) {
                if(bto.data != null){
                    types.typeList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        getInfo(pageNum){
            $.get(serverIp+"blog/selectPublished", {pageNum:pageNum,pageSize:10,typeId:this.id}, function (bto) {
                if (bto.data != null) {
                    types.pageInfo = bto.data;
                    types.pageNum = pageNum;
                } else {
                    window.location.href = "error.html";
                }
            });
        },
        goTo(id){
            this.id = id;
            this.getInfo(1);
        },
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
        this.getTypeList();
        this.getInfo(1);

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
        })
    }
});