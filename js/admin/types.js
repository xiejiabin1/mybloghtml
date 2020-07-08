let types = new Vue({
    el:"#types",
    data:{
        name:'',
        addName:'',
        updateName:'',
        pageNum:1,
        pageInfo:{},
        message:'',
        error1:'',
        error2:'',
        type:{
            name:''
        }
    },
    methods:{
        getInfo(pageNum){
            $.get(serverIp+"blogType/selectBlogTypeLimit",
                {pageNum:pageNum,pageSize:10,name:this.name},
                function (bto) {
                    if(bto.data != null){
                        types.pageInfo = bto.data;
                        types.pageNum = pageNum;
                    }else {
                        window.location.href="error.html";
                    }
            });
        },
        delType(id){
            $('.ui.basic.modal').modal('show');
            $("#delType").on("click",function () {
                $.get(serverIp+"blog/blogCount",{typeId:id},function (bto) {
                    if(bto.data == 0){
                        $.post(serverIp+"blogType/delBlogType",{id:id},function (flag) {
                            if(flag){
                                $("#search").click();
                                types.message = '操作成功'
                            }else {
                                types.message = '删除失败'
                            }
                        });
                    }else {
                        types.message = '删除失败，该分类下有博客文章，无法删除'
                    }
                    $('.ui.basic.modal').modal('hide');
                });

            })
        },
        updateType(id,name){
            $('.ui.modal.updateType').modal('show');
            this.updateName = name;
            $("#updateType").on("click",function () {
                if(types.updateName == null || types.updateName == ''){
                    types.error2 = "分类名称不能为空";
                }else if(types.updateName == name){
                    types.error2 = "修改的分类名称不能与原名称相同";
                }else {
                    $.get(serverIp+"blogType/isName",{name:types.updateName},function (flag) {
                        if(flag){
                            types.error2 = "该分类名称已存在";
                        }else {
                            $.post(serverIp+"blogType/updateBlogType",{name:types.updateName,id:id},function (flag) {
                                if(flag){
                                    $("#search").click();
                                    types.message = '修改成功'
                                }else {
                                    types.message = '修改失败'
                                }
                                $('.ui.modal.updateType').modal('hide');
                            });
                        }
                    })
                }
            })
        },
        addType(){
            $('.ui.modal.addType').modal('show');
            $("#addType").on("click",function () {
                if(types.addName == null || types.addName == ''){
                    types.error1 = "分类名称不能为空";
                }else {
                    $.get(serverIp+"blogType/isName",{name:types.addName},function (flag) {
                        if(flag){
                            types.error1 = "该分类名称已存在";
                        }else {
                            $.post(serverIp+"blogType/addBlogType",{name:types.addName},function (flag) {
                                if(flag){
                                    $("#search").click();
                                    types.message = '新增成功'
                                }else {
                                    types.message = '新增失败'
                                }
                                $('.ui.modal.addType').modal('hide');
                            });
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.getInfo(1);

        //清除按钮
        $('#clear-btn').on('click', function() {
            types.name = '';
        });
    }
});