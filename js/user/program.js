let program = new Vue({
    el:"#program",
    data: {

    },
    methods:{

    },

    mounted(){

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