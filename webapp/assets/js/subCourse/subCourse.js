//模拟数据（可预约课程列表页）
var NoSubPageData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "total": 1,
        "items": [
            {
                "isSub": true,
                "address": "地点a",//上课地点
                "leanTimeLength": 123,
                "id": 14,
                "endTime": "2017/06/16 01:14:00",//报名截止
                "beginLeanTime": "2017/06/24 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师a",
                "name": "主体a",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 1,
                "people": "1-20"
            },
            {
                "isSub": true,
                "address": "地点b",//上课地点
                "leanTimeLength": 123,
                "id": 16,
                "endTime": "2017/06/17 01:14:00",//报名截止
                "beginLeanTime": "2017/06/25 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师b",
                "name": "主体b",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 10,
                "people": "1-20"
            },
            {
                "isSub": true,
                "address": "地点b",//上课地点
                "leanTimeLength": 123,
                "id": 16,
                "endTime": "2017/06/17 01:14:00",//报名截止
                "beginLeanTime": "2017/06/25 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师b",
                "name": "主体b",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 10,
                "people": "1-20"
            },
            {
                "isSub": true,
                "address": "地点b",//上课地点
                "leanTimeLength": 123,
                "id": 16,
                "endTime": "2017/06/17 01:14:00",//报名截止
                "beginLeanTime": "2017/06/25 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师b",
                "name": "主体b",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 10,
                "people": "1-20"
            },
            {
                "isSub": true,
                "address": "地点b",//上课地点
                "leanTimeLength": 123,
                "id": 16,
                "endTime": "2017/06/17 01:14:00",//报名截止
                "beginLeanTime": "2017/06/25 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师b",
                "name": "主体b",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 10,
                "people": "1-20"
            },
            {
                "isSub": true,
                "address": "地点b",//上课地点
                "leanTimeLength": 123,
                "id": 16,
                "endTime": "2017/06/17 01:14:00",//报名截止
                "beginLeanTime": "2017/06/25 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师b",
                "name": "主体b",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 10,
                "people": "1-20"
            },
            {
                "isSub": true,
                "address": "地点b",//上课地点
                "leanTimeLength": 123,
                "id": 16,
                "endTime": "2017/06/17 01:14:00",//报名截止
                "beginLeanTime": "2017/06/25 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师b",
                "name": "主体b",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 10,
                "people": "1-20"
            }
        ],
        "pageSize": 10,
        "status": "200"
    }
};
//模拟数据（已预约课程列表页）
var AlSubPageData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "total": 1,
        "items": [
            {
                "isSub": true,
                "address": "地点c",//上课地点
                "leanTimeLength": 123,
                "id": 13,
                "endTime": "2017/06/18 01:14:00",//报名截止
                "beginLeanTime": "2017/06/24 01:14:00",//开课时间
                "idkey": "f37bf59947134dca98c3874149a185e4",
                "teacher": "教师c",
                "name": "主体c",//名称
                "teacherFace": "/assets/styles/images/personal-head.png",
                "count": 1,
                "people": "1-20"
            }
        ],
        "pageSize": 10,
        "status": "200"
    }
};
//预约课程
var SubPage = {
    //tab标签切换方法
    tabSwitch:function(){
        var swiper = new Swiper('.swiper-container', {
            onSlideChangeStart: function () {
                $(".tab .item").removeClass("selected");
                $(".tab .item").eq(swiper.activeIndex).addClass("selected");
            }
        });
        $(".tab .item").tap(function (event) {
            $(".tab .item").removeClass("selected");
            $(this).addClass("selected");
            var _index = $(this).index();
            swiper.slideTo(_index);
        });
    },
    // 可预约页面初始化ajax数据请求
    noSubView: function () {
        common.post("/subscribeClass/noSubscribeClassInfoFind",{pageNum:1},this.noSubViewSuccess,this.noSubViewError)
    },
    // 已预约页面初始化ajax数据请求
    alSubView: function () {
        common.post("/subscribeClass/alSubscribeClassInfoFind", {pageNum:1},this.alSubViewSuccess,this.alSubViewError)
    },
    //可预约课程成功回调
    noSubViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            // var noRHtmlNull = $('#noSub').html().trim() === '';
            /*if (!data.items || _.isEmpty(data.items)){
                $('#noSub').html('<p style="text-align:center">目前您没有可预约课程~</p>');
            }else {*/
                var noSubTemplate = Handlebars.compile($("#noSub-template").html());
                var noSubData = data;
                $('#noSub').html(noSubTemplate(noSubData));
            /*}*/
            var noSubHtmlNull = $('#noSub').html().trim() === '';
            if (noSubHtmlNull) {
                $('#noSub').html('<p style="text-align:center">目前您没有可预约课程~</p>');
            }
            //调用tab标签切换方法
            SubPage.tabSwitch();
            SubPage.subEvent();
        };
    },
    //已预约课程成功回调
    alSubViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            /*if (!data.items || _.isEmpty(data.items)){
                // alert(1);
                $('#alSub').html('<p style="text-align:center">目前您没有已预约课程~</p>');
            }else{*/
                var alSubTemplate = Handlebars.compile($("#alSub-template").html());
                var renderHTML = data;
                $('#alSub').html(alSubTemplate(renderHTML));
            /*}*/
            var alSubHtmlNull = $('#alSub').html().trim() === '';
            if (alSubHtmlNull) {
                $('#alSub').html('<p style="text-align:center">目前您没有已预约课程~</p>');
            }
            //调用tab标签切换方法
            SubPage.tabSwitch();
            SubPage.cancelEvent();
        }
    },
    //失败回调
    noSubViewError:function (err) {
        // alert(err);
    },
    alSubViewError:function (err) {
        // alert(err);
    },
    //事件绑定
    subEvent:function () {
        // $('.canSubBtn').off("tap");
        $('.canSubBtn').on("tap",function (e) {
            // alert(111);
            var subId = $(this).attr("subdata-id");
            console.log(subId);
            common.post("/subscribeClass/subscribeCourse", {Integer:'int',subscribeClassId:subId},function (data) {
                swal("",data,"success").then(function () {
                    window.location.reload();
                });
            },function (err) {
                swal("",err,"error");
            });
            e.stopPropagation();
            return false;
        })
    },
    cancelEvent:function () {
        // $('.canSubBtn').off("tap");
        $('.cancelBtn').on("tap",function (e) {
            // alert(222);
            var cancelId = $(this).attr("canceldata-id");
             console.log(cancelId);
             common.post("/subscribeClass/cancleSubscribe", {Integer:'int',subscribeClassId:cancelId},function (data) {
             swal("",data,"success").then(function () {
                window.location.reload();
             });
             },function (err) {
                swal("",err,"error");
             });
            e.stopPropagation();
            return false;
        })
    },
    //页面初始化
    init:function(){
        SubPage.noSubView();
        SubPage.alSubView();
    }
}

$(function () {
    SubPage.init();
    // SubPage.tabSwitch();
    // SubPage.noSubViewSuccess(NoSubPageData.payload);
    // SubPage.alSubViewSuccess(AlSubPageData.payload);
});
