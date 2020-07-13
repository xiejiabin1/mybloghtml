let blogDetail = new Vue({
    el:"#blogDetail",
    data:{
        blog:{
            user:{
                nickName:'',
            },
            blogType:{
                name:'',
            },
            content:'',
        },
        blogId:$.query.get("blogId"),
        content:'',
        comment:{},
        userId:null,
    },
    methods:{
        getBlog(){
            $.get(serverIp+"blog/selectBlogById",{blogId:this.blogId},function (bto) {
                if(bto.data != null){
                    blogDetail.blog = bto.data;
                    blogDetail.blog.content = marked(bto.data.content);
                }else {
                    window.location.href="error.html";
                }
            });
        },
        addViews(){
            $.post(serverIp+"blog/addViews",{blogId:this.blogId},function (flag) {
                if(!flag){
                    window.location.href="error.html";
                }
            });
        },
        replay(comment){
            this.comment = comment;
            $("textarea").attr("placeholder","@"+comment.user.nickName);
            window.location.href="#comment-form";
        },
        addComment(){
            if(this.content == null || this.content == ''){
                $("#comment-form .field").addClass("error");
            }else if(blogDetail.comment != null){
                $.post(serverIp+"comment/addComment",
                    {
                        blogId:blogDetail.blogId,
                        userId:blogDetail.userId,
                        parentCommentId:blogDetail.comment.commentId,
                        content:blogDetail.content,
                        typeId:JSON.parse(getCookie("typeId"))
                    },
                    function (flag) {
                        if(flag){
                            //增加评论次数
                            $.post(serverIp+"blog/addCommentCount",{blogId:blogDetail.blogId});
                            blogDetail.getBlog();
                            blogDetail.clearBtn();
                        }else {
                            window.location.href="error.html";
                        }
                    }
                );
            }
        },
        clearBtn(){
            this.content = '';
            this.comment = '';
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
                var seconds = date.getSeconds()<10 ? "0"+(date.getSeconds()) : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
            }
            return null;
        },
    },
    mounted(){
        if(getCookie("userId") != null && getCookie("userId") != ""){
            this.userId = JSON.parse(getCookie("userId"));
        }
        this.addViews();
        this.getBlog();

        setTimeout(function () {
            //目录
            tocbot.init({
                // Where to render the table of contents.
                tocSelector: '.js-toc', //目录出现的位置
                // Where to grab the headings to build the table of contents.
                contentSelector: '.js-toc-content',//需要产生目录的文件内容
                // Which headings to grab inside of the contentSelector element.
                headingSelector: 'h1, h2, h3',//产生目录的级别
            });
            //赞赏
            $('#payButton').popup({
                popup : $('.payQR'),
                on : 'click',
                position: 'bottom center'
            });
            window.document.title = blogDetail.blog.title;
            //代码高亮
            Prism.highlightAll();
            tocbot.refresh();
        },900);

        $(document).on("input propertychange","textarea",function(){
            if(blogDetail.content == null || blogDetail.content == ''){
                $("#comment-form .field").attr("class","field error");
            }else {
                $("#comment-form .field").attr("class","field");
            }
        });

        $('.ui.dropdown').dropdown({
            on : 'hover'
        });

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
        });
    },

});
