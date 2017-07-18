// 模拟数据
var courseDetailData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": {
            "courseName": "新时代交互英语 视听说第一级",
            "courseImg": "/assets/images/course-one01.png",
            "list": [
                {"name": "The First Day", "index": 1, "id": 2, "type": "standard", "status": 2},
                {"name": "A Great Place", "index": 2, "id": 3, "type": "standard", "status": 1},
                {"name": "Whose Stuff?", "index": 3, "id": 4, "type": "standard", "status": 0},
                {"name": "Lunch at the Rock", "index": 4, "id": 5, "type": "standard", "status": 0},
                {"name": "A Busy Life", "index": 5, "id": 6, "type": "standard", "status": 0},
                {"name": "Section Test A", "index": 5, "type": "phase", "status": 0},
                {"name": "Shopping Trip", "index": 6, "id": 8, "type": "standard", "status": 0},
                {"name": "Having a Snack", "index": 7, "id": 9, "type": "standard", "status": 0},
                {"name": "Ana's Family", "index": 8, "id": 10, "type": "standard", "status": 0},
                {"name": "Lunch with the Stars", "index": 9, "id": 11, "type": "standard", "status": 0},
                {"name": "Section Test B", "index": 9, "type": "phase", "status": 0},
                {"name": "A Birthday Present","index": 10, "id": 13, "type": "standard", "status": 0},
                {"name": "Looking for a Job", "index": 11, "id": 14, "type": "standard", "status": 0},
                {"name": "Do I Know You?", "index": 12, "id": 15, "type": "standard", "status": 0},
                {"name": "Somebody New", "index": 13, "id": 16, "type": "standard", "status": 0},
                {"name": "Section Test C", "index": 13, "type": "phase", "status": 0},
                {"name": "Level Test", "index": 13, "type": "level", "status": 0}
            ],
            "flowId": 1,
            "totalUnit": 13
        }, "message": "请求成功", "status": "200"
    }
};

var courseDetail = {
    homeView: function () { // 页面初始化ajax数据请求
        var parmas = common.getUrlParams();
        common.post("/Course/detailUnitByCoursecId", parmas, courseDetail.homeViewSuccess, courseDetail.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#courseDetailTpl").html());
            $('#courseDetailInfo').html(myTemplate(data.result));
            $(".loading").hide();
            
        }
    },
    homeViewError: function (err) { //失败回调
        // alert(err);
        // courseDetail.homeViewSuccess(courseDetailData.payload);
    },
    init: function () {
        courseDetail.homeView();
    }
}
$(function () {
    courseDetail.init();
    // courseDetail.homeViewSuccess(courseDetailData.payload)
});