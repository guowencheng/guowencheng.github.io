/**
 * Created by kevin on 2017/6/15.
 * myScore 部分的js
 */

// 静态数据
var myScoreData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "courseList": [
            {
                "name": "新时代交互英语 视听说第一级",
                "id": 1,
                "category": 2
            },
            {
                "name": "新时代交互英语 读写译第一级",
                "id": 5,
                "category": 3
            }
        ],
        "message": "请求成功",
        "status": "200"
    }
};
var myScore = {
    homeView: function () { // 页面初始化ajax数据请求
        common.post("/grade/getStudentCourse", null, myScore.homeViewSuccess, myScore.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#myScore-HomeTpl").html());
            $('#myScore-HomeInfo').html(myTemplate(data));
            $(".loading").hide();
            // 下拉功能实现
            myScore.dropDown()
        } else if (data.status === '514') {
            swal({
                title: "温馨提示",
                text: "~ *目前您没有在修课程* ~",
                type: "info"
            }).then(function () {
                window.history.back(-1);
            });
        } else if (data.status === '506') {
            swal({
                title: "温馨提示",
                text: "~ *目前您还没有成绩信息呢* ~",
                type: "info"
            }).then(function () {
                window.history.back(-1);
            });
        }
    },
    homeViewError: function (err) { },
    dropDown: function () {
        $("#myScore-HomeInfo .brand-name").tap(function () {
            if ($.mySlideFlag) {
                $(this).find(".iconfont").toggleClass("transform90");
            }
            $(this).next(".brand-model").slideToggle("slow");
        });
    },
    init: function () {
        myScore.homeView();
    }
};

$(function () {
    // 页面初始化
    myScore.init();
    // myScore.homeViewSuccess(myScoreData.payload);
});



