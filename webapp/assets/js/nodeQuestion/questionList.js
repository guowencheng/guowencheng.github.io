//答疑列表页js
//模拟数据（答疑列表）
var QuesListPageData = {
    "result": {
        "teacherName": "教师1",//用户名称
        "teacherImg":"../../assets/images/partner/partner1.png",
        "alReply": [
            {
                "questionContent": "未回答测试问题a",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "已回答测试问题aa",//问题内容
                "questionCreateTime": 1496971523759,//创建时间
                "location": "Unit 4 4-11",
                "isReply": true,//是否回答 true 已回答 false 未回答
                "answerContent": "回答测试，本单元的词汇在下周二的第二节英语课中会抽查默写，请做好复习工作。",//回答内容
                "answerCreateTime": 1496971523759//回答时间
            },{
                "questionContent": "未回答测试问题b",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "已回答测试问题bb",//问题内容
                "questionCreateTime": 1496971523759,//创建时间
                "location": "Unit 4 4-11",
                "isReply": true,//是否回答 true 已回答 false 未回答
                "answerContent": "回答测试，本单元的词汇在下周二的第二节英语课中会抽查默写，请做好复习工作。",//回答内容
                "answerCreateTime": 1496971523759//回答时间
            },{
                "questionContent": "未回答测试问题c",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题d",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题e5",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题f",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题g",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题h",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题i",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题j10",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题k11",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题l",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题m",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题n",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            },{
                "questionContent": "未回答测试问题o15",
                "questionCreateTime": 1496971761425,
                "location": "Unit 4 4-12",
                "isReply": false
            }],
        "teacherUserName": "teacher1" //老师用户名
    },
    "message": "请求成功",
    "status": "200"
};
//答疑列表页
var QuesListPage = {
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
        })
    },
    // 页面初始化ajax数据请求
    quesListView: function (id) {
        common.post("/studentNews/userQaFindByCourse",{courseId:id,pageNum:1},this.quesListViewSuccess,this.quesListViewError)
    },
    //成功回调

    quesListViewSuccess:function (data) {
        console.log(data);
        // alert(data.status);
        if (data.status === '200') {
            var alReplayTemplate = Handlebars.compile($("#al-reply-template").html());
            var noReplayTemplate = Handlebars.compile($("#no-reply-template").html());
            var renderHTML = data;

            $('#al-replay').html(alReplayTemplate(renderHTML));
            $('#no-replay').html(noReplayTemplate(renderHTML));

            var alRHtmlNull = $('#al-replay').html().trim() === '';
            var noRHtmlNull = $('#no-replay').html().trim() === '';
            // alert($('#al-replay').html().trim() === '');
            if (alRHtmlNull) {
                $('#al-replay').html('<p style="text-align:center">此门课程您没有已回复问题~</p>');
            }
            if (noRHtmlNull) {
                $('#no-replay').html('<p style="text-align:center">此门课程您没有未回复问题~</p>');
            }
        };
    },
    //失败回调
    quesListViewError:function (err) {
        alert(err);
    },
    //页面初始化
    init:function(id){
        this.quesListView(id);
        this.tabSwitch();
    }
}

$(function () {
    var quesID=common.getUrlParams('id');
    console.log(quesID);
    QuesListPage.init(quesID);

    // QuesListPage.tabSwitch();
    // QuesListPage.quesListViewSuccess(QuesListPageData);
});