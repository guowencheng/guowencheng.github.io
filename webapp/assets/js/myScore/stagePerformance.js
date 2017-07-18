/**
 * Created by kevin on 2017/6/21.
 */
// 静态数据
var stagePerformanceData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": {
            "overUnit": 12,
            "courseName": "新时代交互英语 视听说第四级",
            "data": [{"name": "Section Test A", "id": 56}, {
                "name": "Section Test B",
                "id": 61
            }, {"name": "Section Test C", "id": 66}],
            "category": 2
        }, "message": "请求成功", "status": "200"
    }
};
var stagePerformance = {
    homeView: function () { // 页面初始化ajax数据请求
        var params = common.getUrlParams();
        common.post("/grade/getUnitAndPhaseByCourse", params, stagePerformance.homeViewSuccess, stagePerformance.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#myScore-stageTpl").html());
            $('#myScore-stageInfo').html(myTemplate(data));

            $(".loading").hide();
            // 下拉功能实现
            stagePerformance.dropDown()
        }
    },
    homeViewError: function (err) { //失败回调
        // alert(err);
        // stagePerformance.homeViewSuccess(stagePerformanceData.payload);
    },
    dropDown: function () {
        $("#myScore-stageInfo .brand-name").tap(function () {
            if ($.mySlideFlag) {
                $(this).find(".iconfont").toggleClass("transfrom90");
            }
            $(this).next(".brand-model").slideToggle("slow");
        });
    },
    init: function () {
        stagePerformance.homeView();
    }
};

$(function () {
    // 页面初始化
    stagePerformance.init();
    // stagePerformance.homeViewSuccess(stagePerformanceData.payload);
});
