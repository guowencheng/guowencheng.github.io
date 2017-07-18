// 模拟数据
var unitDetailData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": [
            {"name": "Goals", "index": 1, "id": 1, "type": "content", "required": true, "status": 2 /* 学完了*/},
            {"name": "Watch the Video", "index": 2, "id": 2, "type": "content", "required": true, "status": 1 /* 正在学*/}, {
            "name": "Global Comprehension", "index": 3, "id": 3, "type": "sectionExam", "required": true, "status": 0 /* 还没有学*/},
            {"name": "Review", "index": 4, "id": 4, "type": "content", "required": true, "status": 0}, 
            {"name": "Detailed Comprehension", "index": 5, "id": 8, "type": "sectionExam", "required": true, "status": 0}, 
            {"name": "More Listening", "index": 6, "id": 17, "type": "sectionExam", "required": true, "status": 0}
        ],
        "unit": 4,
        "message": "请求成功",
        "status": "200"
    }
};
var unitDetail = {
    homeView: function () { // 页面初始化ajax数据请求
        var parmas = common.getUrlParams();
        common.post("/Course/detailSectionByunitId", parmas, unitDetail.homeViewSuccess, unitDetail.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        // console.log(data);
        // data = unitDetail.getUrlById(data);
        // console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#unitDetailTpl").html());
            $('#unitDetailInfo').html(myTemplate(data));
            $(".loading").hide();
        }
    },
    homeViewError: function (err) { //失败回调
        // alert(err);
        // unitDetail.homeViewSuccess(unitDetailData.payload);
    },
    // getUrlById: function (data) { //重新规划数据
    //     data["result"].forEach(function (item, index) {
    //         switch (true) {
    //             case(item.name === "Goals"):
    //                 item.url = "./unitTest/studyGoals.html";
    //                 break;
    //             case(item.name === "Watch the Video"):
    //                 item.url = "./unitTest/watchVideo.html"
    //                 break;
    //             case(item.name === "Global Comprehension"):
    //                 item.url = "./unitTest/studyGolals.html"
    //                 break;
    //             case(item.name === "Review"):
    //                 item.url = "./unitTest/review.html"
    //                 break;
    //             case(item.name === "Detailed Comprehension"):
    //                 item.url = "./unitTest/studyGolals.html"
    //                 break;
    //             case(item.name === "More Listening"):
    //                 item.url = "./unitTest/studyGolals.html"
    //                 break;
    //             default:
    //                 item.url = "./unitTest/studyGolals.html"
    //         }
    //     });
    //     return data;
    // },
    init: function () {
        unitDetail.homeView();
    }
}
$(function () {
    // unitDetail.init();
    unitDetail.homeViewSuccess(unitDetailData.payload);
});

 