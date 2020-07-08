let addBlog = new Vue({
    el:"#addBlog",
    data:{
        blog:{
            flag:'',
            title:'',
            typeId:'',
            content:'',
            firstPicture:'',
            description:'',
        },
        blogTypeList:[],
        message:'',
    },
    methods:{
        getType(){
            $.get(serverIp+"blogType/selectBlogType",function (bto) {
                if(bto.data != null){
                    addBlog.blogTypeList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        subBtn(published){
            let flag = $('#flag').val();
            let typeId = $('#typeId').val();
            let content = $('#content').val();
            if(flag == null || flag == ''){
                $('.ui.basic.modal').modal('show');
                addBlog.message = '请选择标签';
            }else if(this.blog.title == null || this.blog.title == ''){
                $('.ui.basic.modal').modal('show');
                addBlog.message = '标题不能为空';
            }else if(content == null || content == ''){
                $('.ui.basic.modal').modal('show');
                addBlog.message = '内容不能为空';
            }else if(typeId == null || typeId == ''){
                $('.ui.basic.modal').modal('show');
                addBlog.message = '请选择分类';
            }else if(this.blog.firstPicture == null || this.blog.firstPicture == ''){
                $('.ui.basic.modal').modal('show');
                addBlog.message = '图片地址不能为空';
            }else {
                let formData = new window.FormData($("form")[0]);
                formData.append("flag",flag);
                formData.append("typeId",typeId);
                formData.append("content",content);
                formData.append("blogId",$.query.get("blogId"));
                formData.append("userId",JSON.parse(getCookie("userId")));
                formData.append("recommend",$("#recommend").get(0).checked);
                formData.append("shareStatement",$("#shareStatement").get(0).checked);
                formData.append("appreciation",$("#appreciation").get(0).checked);
                formData.append("commentBled",$("#commentBled").get(0).checked);
                formData.append("published",published);
                $.ajax({
                    type: "POST",
                    contentType: false,
                    processData: false,
                    url: serverIp+"blog/addBlog",
                    data: formData,
                    async: false,
                    success: function(result) {
                        if(result){
                            window.location.href="blog.html"
                        }else {
                            addBlog.message = '新增失败，请稍后再试！';
                        }
                    }
                });
            }
        },

    },
    mounted(){
        this.getType();

        $('.menu.toggle').click(function () {
            $('.m-item').toggleClass('m-mobile-hide');
        });
        $('.ui.selection.dropdown').dropdown({
            on : 'hover'
        });
        $('.ui.fluid.dropdown').dropdown({
            on : 'hover'
        });
        //初始化Markdown编辑器
        var contentEditor;
        $(function() {
            contentEditor = editormd("md-content", {
                width   : "100%",
                height  : 640,
                syncScrolling : "single",
                path    : "../../lib/editormd/lib/"
            });
        });
    }
});