let friendLink = new Vue({
    el:"#friendLink",
    data:{
        pageNum:1,
        pageInfo:{},
        message:'',
        name:'',
        addLink:{
            blogName:'',
            blogAddress:'',
            blogPicture:'',
            description:'',
            error:'',
        },
        updateLink:{
            blogName:'',
            blogAddress:'',
            blogPicture:'',
            description:'',
            error:'',
        },
    },
    methods:{
        getInfo(pageNum){
            $.get(serverIp+"friendLink/selectFriendAll",
                {pageNum:pageNum,pageSize:10,blogName:this.name},
                function (bto) {
                    if(bto.data != null){
                        friendLink.pageInfo = bto.data;
                        friendLink.pageNum = pageNum;
                    }else {
                        window.location.href="error.html";
                    }
                });
        },
        delLink(friendLinkId){
            $('.ui.basic.modal').modal('show');
            $("#delLink").on("click",function () {
                $.post(serverIp+"friendLink/delFriendLink",{friendLinkId:friendLinkId},function (flag) {
                    if(flag){
                        $("#search").click();
                        friendLink.message = '删除成功'
                    }else {
                        friendLink.message = '删除失败'
                    }
                });
                $('.ui.basic.modal').modal('hide');
            })
        },
        updateFriendLink(friendLinkId){
            $('.ui.modal.updateLink').modal('show');
            $.get(serverIp+"friendLink/selectLinkById",{friendLinkId:friendLinkId},function (bto) {
                if(bto.data != null){
                    friendLink.updateLink = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });


            $("#updateLink").on("click",function () {
                if(friendLink.updateLink.blogName == null || friendLink.updateLink.blogName == ''){
                    friendLink.updateLink.error = "博客名称不能为空";
                }else if(friendLink.updateLink.blogAddress == null || friendLink.updateLink.blogAddress == ''){
                    friendLink.updateLink.error = "博客地址不能为空";
                }else if(friendLink.updateLink.blogPicture == null || friendLink.updateLink.blogPicture == ''){
                    friendLink.updateLink.error = "图片地址不能为空";
                }else {
                    $.post(serverIp+"friendLink/updateFriendLink",
                        {
                            friendLinkId:friendLinkId,
                            blogName:friendLink.updateLink.blogName,
                            blogAddress:friendLink.updateLink.blogAddress,
                            blogPicture:friendLink.updateLink.blogPicture,
                            description:friendLink.updateLink.description,
                        },
                        function (flag) {
                            if(flag){
                                $("#search").click();
                                friendLink.message = '修改成功'
                            }else {
                                friendLink.message = '修改失败'
                            }
                    });
                    $('.ui.modal.updateLink').modal('hide');
                }
            })
        },
        addFriendLink(){
            $('.ui.modal.addLink').modal('show');
            $("#addLink").on("click",function () {
                if(friendLink.addLink.blogName == null || friendLink.addLink.blogName == ''){
                    friendLink.addLink.error = "博客名称不能为空";
                }else if(friendLink.addLink.blogAddress == null || friendLink.addLink.blogAddress == ''){
                    friendLink.addLink.error = "博客地址不能为空";
                }else if(friendLink.addLink.blogPicture == null || friendLink.addLink.blogPicture == ''){
                    friendLink.addLink.error = "图片地址不能为空";
                }else {
                    $.post(serverIp+"friendLink/addFriendLink",
                        {
                            blogName:friendLink.addLink.blogName,
                            blogAddress:friendLink.addLink.blogAddress,
                            blogPicture:friendLink.addLink.blogPicture,
                            description:friendLink.addLink.description,
                        },
                        function (flag) {
                            if(flag){
                                $("#search").click();
                                friendLink.message = '新增成功'
                            }else {
                                friendLink.message = '新增失败'
                            }
                        });
                    $('.ui.modal.addLink').modal('hide');
                }
            })
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
        this.getInfo(1);

        //清除按钮
        $('#clear-btn').on('click', function() {
            friendLink.name = '';
        });
    }
});