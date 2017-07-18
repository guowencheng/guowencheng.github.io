//我的消息列表页js
/*
var importantNotice = importantNotice || {};

//显示课程列表
function coursesShow(data) {
    $('.loading').hide();
    var template = Handlebars.compile($("#noticeListTPLT").html());
    var renderHTML = template(data);
    $('.notice-list').html(renderHTML);
}
//失败回调
function error(data) {
    console.log(data)
}

//初始化方法
importantNotice.init = function () {
    //$('.loading').show();
    if (_.isEmpty(data1.Data)) {
        $('.none-content').show();
        return;
    }
    coursesShow(data1);
}
//执行初始化
importantNotice.init();*/
//模拟数据（班级消息列表页）
var ClassNewsData = {
    "success": true,
    "message": "请求成功",
    "error": "",
    "payload": {
        "message": "请求成功",
        "status": "200",
        result:{
            isLastPage:false,
            list:[
                {createTime: "2017/07/11 09:48:55", createUser: "教师1", title: "kkkkkkkkkkkk", noticeId: 13,content: "了啦啦啦啦"},
                {createTime: "2017/07/11 09:48:36", createUser: "教师1", title: "ooooooooooooooo", noticeId: 12,content: "是的附加费"},
                {createTime: "2017/07/11 09:48:23", createUser: "教师1", title: "ooooooooooo", noticeId: 11,content: "水电费水电费"},
                {createTime: "2017/07/11 09:48:08", createUser: "教师1", title: "llllllllllll", noticeId: 10,content: "水电费"},
                {createTime: "2017/07/11 09:47:49", createUser: "教师1", title: "了啦啦啦啦了啦啦啦啦", noticeId: 9,content: "对方是否"},
                {createTime: "2017/07/11 09:47:36", createUser: "教师1", title: "坎坎坷坷扩扩扩扩扩扩", noticeId: 8,content: "地方萨芬"},
                {createTime: "2017/07/11 09:47:18", createUser: "教师1", title: "坎坎坷坷扩", noticeId: 7, content: "了啦啦啦啦"},
                {createTime: "2017/07/11 09:47:05", createUser: "教师1", title: "哈哈哈呵呵呵或或或或或或或或", noticeId: 6,content: "地方撒"},
                {createTime: "2017/07/11 09:46:48", createUser: "教师1", title: "你还呵呵呵呵", noticeId: 5,content: "大锅饭"},
                {createTime: "2017/07/11 09:46:31", createUser: "教师1", title: "你还好好好", noticeId: 4, content: "呵呵呵好好方法"}
            ]
        }
    }
};
//模拟数据（我的消息列表页）
var MyNewsData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "message": "请求成功",
        "status": "200",
        result:{
            isLastPage:false,
            list:[
                {"createTime": "2017/07/03 11:23:00", "fromuser": "教师a", "id": 5, "readed":false, "touser":"郭文超", "type":"user","typeName":"个人"},
                {"createTime": "2017-07-03 11:20", "fromuser": "教师b", "id": 4, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"},
                {"createTime": "2017/07/03 11:11:00", "fromuser": "教师a", "id": 3, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"},
                {"createTime": "2017/07/03 11:23:00", "fromuser": "教师d", "id": 2, "readed":false, "touser":"郭文超", "type":"user","typeName":"个人"},
                {"createTime": "2017-07-03 11:20", "fromuser": "教师a", "id": 1, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"},
                {"createTime": "2017/07/03 11:11:00", "fromuser": "教师a", "id": 9, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"},
                {"createTime": "2017/07/03 11:23:00", "fromuser": "教师f", "id": 8, "readed":false, "touser":"郭文超", "type":"user","typeName":"个人"},
                {"createTime": "2017-07-03 11:20", "fromuser": "教师a", "id": 7, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"},
                {"createTime": "2017/07/03 11:11:00", "fromuser": "教师a", "id": 9, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"},
                {"createTime": "2017/07/03 11:11:00", "fromuser": "教师h", "id": 11, "readed":true, "touser":"郭文超", "type":"user", "typeName":"个人"}
            ]
        }
    }
};
//班级消息&我的消息列表页
var NewsPage = {
    classIScrollFlag: true,
    myNewsIScrollFlag: true,
    classPageNum:1,
    myNewsPageNum:1,
    //tab标签切换方法
    tabSwitch:function(){
        var swiper = new Swiper('.swiper-container', {
            onSlideChangeStart: function () {
                $(".tab .item").removeClass("selected");
                $(".tab .item").eq(swiper.activeIndex).addClass("selected");
            },
            //监听滚动事件
            onTouchEnd:function (swiper) {
                // alert("q")
                alert(swiper.translate);
                var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
                var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;
                //下拉加载
                if (swiper.translate <= _viewHeight - _contentHeight - 75) {
                    // $("#NextPage").click();
                    alert(1);
                }
                //上拉刷新
                if (swiper.translate > 0) {
                    alert(2)
                    // document.getElementById('show').innerHTML = '刷新中';
                    //reloadData();
                }
            }
        });
        $(".tab .item").tap(function (e) {
            e.preventDefault();
            $(".tab .item").removeClass("selected");
            $(this).addClass("selected");
            var _index = $(this).index();
            swiper.slideTo(_index);
        });
    },
    tab:function(){
        $(".tab .desc .item").click(function(){
            $(".tab .desc .item").eq($(this).index()).addClass("selected").siblings().removeClass('selected');
            $(".tab-contents .tab-con").hide().eq($(this).index()).show();
            // $(".tab-contents .tab-con").hide().eq($(this).index()).addClass("transformR");
        });
    },
    // 班级通知页面初始化ajax数据请求
    classNewsView: function () {
        common.post("/userInfo/userNews",{type:1,pageNum:this.classPageNum},this.classNewsViewSuccess,this.classNewsViewError)
    },
    // 我的消息页面初始化ajax数据请求
    myNewsView: function () {
        common.post("/userInfo/userNews",{type:2,pageNum:this.myNewsPageNum},this.myNewsViewSuccess,this.myNewsViewError)
    },
    //成功回调
    classNewsViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var classNewsTemplate = Handlebars.compile($("#classNews-template").html());
            var classNewsData = data.result;
            $('.classNews-list').html(classNewsTemplate(classNewsData));

            // NewsPage.classScroll = new IScroll(".class-scroll-wrapper",{
            //     mouseWheel: true,
            //     scrollbars:true,
            //     click:true,//设置不让点击事件失效
            // });
            // NewsPage.classEvent();
        };
    },
    myNewsViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var myNewsTemplate = Handlebars.compile($("#myNews-template").html());
            var myNewsData = data.result;
            $('.myNews-list').html(myNewsTemplate(myNewsData));
        };

        // NewsPage.myNewsScroll = new IScroll(".myNews-scroll-wrapper",{
        //     mouseWheel: true,
        //     scrollbars:true,
        //     click:true,//设置不让点击事件失效
        // });
        // NewsPage.myNewsEvent();
    },
    classmoreView:function () {
        common.post("/userInfo/userNews",{type:1,pageNum:this.classPageNum+1},function (data) {
            console.log(data);
            if (data.status === '200') {
                var classNewsTemplate = Handlebars.compile($("#classNews-template").html());
                var classNewsData = data.result;
                $('.classNews-list').append(classNewsTemplate(classNewsData));

                if (!data.result.isLastPage) {
                    NewsPage.classPageNum++;
                }else {
                    NewsPage.classIScrollFlag = false;
                }
                NewsPage.classScroll.refresh();//让IScroll更新滚动区域
            };
        },this.classNewsViewError)
    },
    myNewsmoreView:function () {
        common.post("/userInfo/userNews",{type:2,pageNum:this.myNewsPageNum+1},function (data) {
            console.log(data);
            if (data.status === '200') {
                var myNewsTemplate = Handlebars.compile($("#myNews-template").html());
                var myNewsData = data.result;
                $('.myNews-list').append(myNewsTemplate(myNewsData));

                if (!data.result.isLastPage) {
                    NewsPage.myNewsPageNum++;
                }else {
                    NewsPage.myNewsIScrollFlag = false;
                }
                NewsPage.myNewsScroll.refresh();//让IScroll更新滚动区域
            };
        },this.myNewsViewError)
    },

    //失败回调
    classNewsViewError:function (err) {
        alert(err);
    },
    myNewsViewError:function (err) {
        alert(err);
    },
    //加载更多（滑动事件）
    classEvent:function () {
        this.classScroll.on("scrollEnd",function (){
            if(this.y == this.maxScrollY){//滑动到底部
                // alert(ImpNoticePage.classIScrollFlag);
                if(NewsPage.classIScrollFlag){
                    NewsPage.classmoreView();//发送ajax请求
                }else{
                    return;
                }
            }
        })
    },
    myNewsEvent:function () {
        this.myNewsScroll.on("scrollEnd",function (){
            if(this.y == this.maxScrollY){//滑动到底部
                // alert(ImpNoticePage.classIScrollFlag);
                if(NewsPage.myNewsIScrollFlag){
                    NewsPage.myNewsmoreView();//发送ajax请求
                }else{
                    return;
                }
            }
        })
    },
    //页面初始化
    init:function(){
        this.tabSwitch();
        // this.tab();
        this.classNewsView();
        this.myNewsView();
    }
}

$(function () {
    // window.scrollTo(0,0);
    // NewsPage.init();
    NewsPage.tabSwitch();
    // NewsPage.tab();
    NewsPage.classNewsViewSuccess(ClassNewsData.payload);
    NewsPage.myNewsViewSuccess(MyNewsData.payload);
    // NewsPage.tab();
});
