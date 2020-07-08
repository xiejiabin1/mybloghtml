let updateBlog = new Vue({
    el:"#updateBlog",
    data:{
        blog:{
            flag:'',
            title:'',
            content:'',
            typeId:0,
            firstPicture:'',
            description:'',
        },
        blogTypeList:[],
        message:'',
    },
    methods:{
        getBlog(){
            $.get(serverIp+"blog/selectBlogById", {blogId:$.query.get("blogId")},function (bto) {
                if(bto.data != null){
                    updateBlog.blog = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        getType(){
            $.get(serverIp+"blogType/selectBlogType",function (bto) {
                if(bto.data != null){
                    updateBlog.blogTypeList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        subBtn(){
            if(this.blog.title == null || this.blog.title == ''){
                $('.ui.basic.modal').modal('show');
                updateBlog.message = '标题不能为空';
            }else if(this.blog.flag == null || this.blog.flag == ''){
                $('.ui.basic.modal').modal('show');
                updateBlog.message = '请选择标签';
            }else if(this.blog.typeId == null || this.blog.typeId == ''){
                $('.ui.basic.modal').modal('show');
                updateBlog.message = '请选择分类';
            }else if(this.blog.firstPicture == null || this.blog.firstPicture == ''){
                $('.ui.basic.modal').modal('show');
                updateBlog.message = '图片地址不能为空';
            }else {
                let formData = new window.FormData($("form")[0]);
                formData.append("blogId",$.query.get("blogId"))
                formData.append("recommend",$("#recommend").get(0).checked);
                formData.append("shareStatement",$("#shareStatement").get(0).checked);
                formData.append("appreciation",$("#appreciation").get(0).checked);
                formData.append("commentBled",$("#commentBled").get(0).checked);
                $.ajax({
                    type: "POST",
                    contentType: false,
                    processData: false,
                    url: serverIp+"blog/updateBlog",
                    data: formData,
                    async: false,
                    success: function(result) {
                        if(result){
                            window.location.href="blog.html"
                        }else {
                            updateBlog.message = '修改失败，请稍后再试！';
                        }
                    }
                });
            }
        },

    },
    mounted(){
        this.getType();
        this.getBlog();
        setTimeout(function () {
            $(".blogType[data-value='"+updateBlog.blog.typeId+"']").addClass("active selected");
            $('.ui.selection.dropdown').dropdown();
        },500);

        //初始化Markdown编辑器
        var contentEditor;
        $(function() {
            contentEditor = editormd("md-content", {
                width   : "100%",
                height  : 640,
                syncScrolling : "single",
                path    : "../../lib/editormd/lib/",
            });
        });
        $('.menu.toggle').click(function () {
            $('.m-item').toggleClass('m-mobile-hide');
        });

        $('.ui.dropdown').dropdown({
            on : 'hover'
        });
    }
});