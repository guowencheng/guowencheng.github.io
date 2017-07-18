/**
 * Created by kevin on 2017/6/26.
 * myCourse 部分的js
 */

// 静态数据
var myCourseData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": [
            {
                "courseImg": "/assets/styles/images/course/vls1.jpg",
                "name": "新时代交互英语 视听说第一级",
                "id": 1,
                "category": 2
            }, 
            {
                "courseImg": "/assets/styles/images/course/rwt1.jpg",
                "name": "新时代交互英语 读写译第一级", 
                "id": 5, 
                "category": 3
            }],
        "message": "请求成功",
        "status": "200"
    }
};
var myCourse = {
    homeView: function () { // 页面初始化ajax数据请求
        common.post("/Course/getUserCourse", null, myCourse.homeViewSuccess, myCourse.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#myCourse-HomeTpl").html());
            $('#myCourse-HomeInfo').html(myTemplate(data));
            $(".loading").hide();
        }else if (data.status === '514') {
            swal({
                title: "温馨提示",
                text: "~ *目前您没有在修课程* ~",
                type: "info"
            }).then(function () {
                window.history.back(-1);
            });
        }
    },
    homeViewError: function (err) { //失败回调
        // alert(err);
    },
    init: function () {
        myCourse.homeView();
    }
};

$(function () {
    //页面初始化
    // myCourse.init();
    myCourse.homeViewSuccess(myCourseData.payload);
});





 