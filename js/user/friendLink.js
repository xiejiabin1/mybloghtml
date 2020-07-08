let friend = new Vue({
    el:"#friend",
    data: {
        friendList: []
    },
    methods:{
        getList(){
            $.get(serverIp+"friendLink/selectFriend",function (bto) {
                if(bto.data != null){
                    friend.friendList = bto.data;
                }else {
                    window.location.href="error.html";
                }
            })
        }
    },

    mounted(){
        this.getList();
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