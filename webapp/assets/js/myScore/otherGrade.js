/**
 * Created by kevin on 2017/6/15.
 * myScore 部分的js
 */

// 静态数据
var otherGradeData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": [{
            "score": 0,
            "examBeginTime": "2017-06-13",
            "code": "exam001",
            "examName": "测试一个完整的试卷"
        }, {"score": 0, "examBeginTime": "2017-06-15", "code": "exam010", "examName": "测试1大题1小题"}, {
            "score": 0,
            "examBeginTime": "2017-06-15",
            "code": "exam009",
            "examName": "测试remark2"
        }], "message": "请求成功", "status": "200"
    }
};
var otherGrade = {
    // 页面初始化ajax数据请求
    homeView: function () {
        common.post("/grade/getOtherGrade", null, otherGrade.homeViewSuccess, otherGrade.homeViewError);
    },
    // homeView 成功回调
    homeViewSuccess: function (data) {
        console.log(data);
        if (data.status === '200') {
            if (data.result.length !== 0) {
                var myTemplate = Handlebars.compile($("#myScore-otherGradeTpl").html());
                $('#myScore-otherGradeInfo').html(myTemplate(data));

                $(".loading").hide();
                // 下拉功能实现
                otherGrade.dropDown();
            } else {
                $(".loading").hide();
                swal({
                    title: '怎么没有试卷信息呢?',
                    text: '请确定您是否已经考试了呦.',
                    type: "question",
                    timer: 3000,
                    showCancelButton: false
                }).then(function () {window.history.back(-1);},
                    function () {window.history.back(-1);});
            }
        }
    },
    // homeView 失败回调
    homeViewError: function (err) {},
    // 注册向下拉功能事件
    dropDown: function () {
        $("#myScore-otherGradeInfo .brand-name").tap(function () {
            if ($.mySlideFlag) {
                $(this).find(".iconfont").toggleClass("transfrom90");
            }
            $(this).next(".brand-model").slideToggle("slow");
        });
    },
    init: function () {
        otherGrade.homeView();
    }
};

$(function () {
    // 页面初始化
    otherGrade.init();
    // otherGrade.homeViewSuccess(otherGradeData.payload);
});

