let archives = new Vue({
    el:"#archives",
    data:{
        blogList:[]
    },
    methods:{
        getList(){
            $.get(serverIp+"blog/selectArchives",function (bto) {
                if(bto.data != null){
                    archives.blogList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            });
        },
        load(){
            var $timeline_block = $('.cd-timeline-block');
            //hide timeline blocks which are outside the viewport
            $timeline_block.each(function(){
                if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
                }
            });
            //on scolling, show/animate timeline blocks when enter the viewport
            $(window).on('scroll', function(){
                $timeline_block.each(function(){
                    if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
                        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                    }
                });
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
                // 拼接
                return year+"年"+month+"月"+day+"日"+hour+"时"+minutes+"分";
            }
            return null;
        },
    },
    mounted(){
        this.getList();
        setTimeout(function () {
            archives.load();
        },200);

        $('.menu.toggle').click(function () {
            $('.m-item').toggleClass('m-mobile-hide');
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
        })


    }
});
