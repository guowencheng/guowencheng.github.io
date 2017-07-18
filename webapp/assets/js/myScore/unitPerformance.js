/**
 * Created by kevin on 2017/6/23.
 */
// 静态数据
var unitPerformanceData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": {
            "overUnit": 2,
            "data": [
                {"name": "The First Day", "id": 2}, 
                {"name": "A Great Place", "id": 3},
                {"name": "Whose Stuff?", "id": 4},
                {"name": "Lunch at the Rock", "id": 5},
                {"name": "A Busy Life", "id": 6},
                {"name": "Shopping Trip", "id": 8},
                {"name": "Having a Snack", "id": 9},
                {"name": "Ana\u0027s Family", "id": 10}, 
                {"name": "Lunch with the Stars", "id": 11},
                {"name": "A Birthday Present", "id": 13},
                {"name": "Looking for a Job", "id": 14}, 
                {"name": "Do I Know You?", "id": 15}, {"name": "Somebody New", "id": 16}
            ]}, 
        "message": "请求成功",
        "status": "200"
    }
};
var unitPerformance = {
    homeView: function () { // 页面初始化ajax数据请求
        var params = common.getUrlParams();
        common.post("/grade/getUnitAndPhaseByCourse", params, unitPerformance.homeViewSuccess, unitPerformance.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#myScore-unitTpl").html());
            $('#myScore-unitInfo').html(myTemplate(data));

            $(".loading").hide();
            // 下拉功能实现
            unitPerformance.dropDown()
        }
    },
    homeViewError: function (err) { },
    dropDown: function () {
        $("#myScore-unitInfo .brand-name").tap(function () {
            if ($.mySlideFlag) {
                $(this).find(".iconfont").toggleClass("transfrom90");
            }
            $(this).next(".brand-model").slideToggle("slow");
        });
    },
    init: function () {
        unitPerformance.homeView();
    }
};
$(function () {
    // 页面初始化
    unitPerformance.init();
    // unitPerformance.homeViewSuccess(unitPerformanceData.payload);
});



