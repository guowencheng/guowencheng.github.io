/**
 * Created by kevin on 2017/6/23.
 */
/**
 * Created by kevin on 2017/6/19.
 */
var scoreDetailData = {
        "success": true,
        "message": "",
        "error": "",
        "payload": {
            "result": {
                "unitType": "standard",
                "totalItemsCount": 2,
                "userFlowUnitList": [
                    {
                        "unitName": "The First Day",
                        "cycleindex": 2,
                        "grammarScore": 80,
                        "f": 1,
                        "speakingScore": 100,
                        "spellingScore": 80,
                        "score": 78,
                        "courseName": "视听说第一级",
                        "testStatus": "1",
                        "testStatusName": "通过",
                        "unitId": 2,
                        "id": 2,
                        "vocabularyScore": 80,
                        "time": "2017/06/20",
                        "listeningScore": 50,
                        "flowId": "1",
                        "status": "已完成"
                    }
                ],
                "pageSize": 10
            },
            "message": "请求成功",
            "status": "200"
        }
    };

var scoreDetail = {
    homeView: function () {
        var parmas= common.getUrlParams();
        common.post("/grade/getUnitGrade", parmas, scoreDetail.homeViewSuccess,scoreDetail.homeViewError);
    },
    homeViewSuccess:function (data) {
        if (data.status === '200') {
            if (data.result.userFlowUnitList && data.result.userFlowUnitList.length !== 0) {
                var scoreInfo = data.result.userFlowUnitList[0];
                if(scoreInfo.score) {
                    $("#scoreSum").html(scoreInfo.score);
                }
                var showData = common.getNewScore(scoreInfo);
                var myTemplate = Handlebars.compile($("#myScore-scoreDetailTpl").html());
                $('#myScore-scoreDetailInfo').html(myTemplate(showData));

                $(".loading").hide();
            } else {
                $(".loading").hide();
                swal({
                    title: '怎么没有成绩信息呢?',
                    text: '请确定您是否已经学习了呦.',
                    type:"question",
                    timer: 3000,
                    showCancelButton: false
                }).then(function () {window.history.back(-1);},
                    function () {window.history.back(-1);});
            }
        }
    },
    homeViewError: function (err) {
        // alert(err);
        // scoreDetail.homeViewSuccess(scoreDetailData);
    },
    init:function () {  // 页面初始化
        this.homeView();
    }
};
$(function () {
    // 页面初始化
    scoreDetail.init();
    // scoreDetail.homeViewSuccess(scoreDetailData.payload);
})


