let searchBlog = new Vue({
    el:"#searchBlog",
    data:{
        blogList:[],
        count:0,
        searchStr:$.query.get("searchStr"),
    },
    methods:{
        getBlogList(){
            $.get(serverIp+"blog/searchBlog",{searchStr:this.searchStr},function (bto) {
                if(bto.data != null){
                    searchBlog.blogList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        getCount(){
            $.get(serverIp+"blog/blogCount",{searchStr:this.searchStr},function (bto) {
                if(bto.data != null){
                    searchBlog.count = bto.data;
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
        this.getBlogList();
        this.getCount();

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