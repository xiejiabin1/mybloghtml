let adminBlog = new Vue({
    el:"#adminBlog",
    data:{
        pageInfo:{},
        blogTypeList:[],
        pageNum:1,
        searchStr:'',
        message:''
    },
    methods:{
        getInfo(pageNum){
            let blogTypeId = $("#blogTypeId").val();
            let recommend = $("#recommend").get(0).checked;
            $.get(serverIp+"blog/selectBlogAll",
                {pageNum:pageNum,pageSize:10,searchStr:this.searchStr,typeId:blogTypeId,recommend:recommend},
                function (bto) {
                    if(bto.data != null){
                        adminBlog.pageInfo = bto.data;
                        if(pageNum > 0){
                            adminBlog.pageNum = pageNum;
                        }
                    }else {
                        window.location.href="error.html";
                    }
            });
        },
        getType(){
            $.get(serverIp+"blogType/selectBlogType",function (bto) {
                if(bto.data != null){
                    adminBlog.blogTypeList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        updateBlog(blogId){
            window.location.href="updateBlog.html?blogId="+blogId;
        },
        delBlog(blogId){
            $('.ui.basic.modal').modal('show');
            $("#del").on("click",function () {
                $.post(serverIp+"blog/delBlog",{blogId:blogId},function (flag) {
                    if(flag){
                        $("#search").click();
                        adminBlog.message = '操作成功'
                    }else {
                        adminBlog.message = '操作失败'
                    }
                    $('.ui.basic.modal').modal('hide');
                });
            })
        },
        isRecommend(blogId,recommend){
            $.post(serverIp+"blog/updateBlog",{recommend:recommend,blogId:blogId},function (flag) {
                if(flag){
                    $("#search").click();
                    adminBlog.message = '操作成功'
                }else {
                    adminBlog.message = '操作失败'
                }
            });
        },
        isPublished(blogId,published){
            $.post(serverIp+"blog/updateBlog",{published:published,blogId:blogId},function (flag) {
                if(flag){
                    $("#search").click();
                    adminBlog.message = '操作成功'
                }else {
                    adminBlog.message = '操作失败'
                }
            });
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
        overFont(text){
            if(text.length > 20){
                return text.substring(0,7)+"...";
            }
            return text;
        }
    },
    mounted(){
        this.getInfo(1);
        this.getType();

        //清除按钮
        $('#clear-btn').on('click', function() {
            adminBlog.searchStr = '';
            $('.ui.type.dropdown').dropdown('clear');
        });
    }
});