/**
 * Created by kevin on 2017/6/19.
 */
var classificationData = {
        "result": [{
            "data": {
                "score": 62.4,
                "teacher": "教师1",
                "tchTime": "2017-06-08",
                "grammarScore": 57,
                "stuTime": "2017-06-06",
                "vocabularyScore": 40,
                "speakingScore": 66,
                "tchLevel": "1级",
                "listeningScore": 70,
                "spellingScore": 78,
                "stuLevel": "1级"
            },
            "name": "视听说",
            "category": 2
        }, {
            "data": {
                "score": 55.6,
                "teacher": "教师1",
                "phrasesScore": 0,
                "correctionScore": 0,
                "tchTime": "2017-06-08",
                "stuTime": "2017-06-06",
                "readingScore": 0,
                "vocabularyScore": 50,
                "clozeScore": 0,
                "tchLevel": "1级",
                "stuLevel": "1级"
            },
            "name": "读写译",
            "category": 3
        }],
        "message": "请求成功",
        "status": "200"
    };

var classification = {
    homeView: function () {
        common.post("/grade/getStudentLevelGrade", null, classification.homeViewSuccess,classification.homeViewError);
    },
    homeViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#myScore-classificationTpl").html());
            $('#myScore-classificationInfo').html(myTemplate(data));

            $(".loading").hide();
            // 添加table切换功能
            classification.tabSwitch();
        }
    },
    homeViewError: function (err) {},
    // tab标签切换
    tabSwitch: function () {
        var swiper = new Swiper('.swiper-container', {
            onSlideChangeStart: function () {
                $(".tab .item").removeClass("selected");
                $(".tab .item").eq(swiper.activeIndex).addClass("selected");
            }
        });
        //tab标签切换
        $(".tab .item").click(function () {
            $(".tab .item").removeClass("selected");
            $(this).addClass("selected");
            var _index = $(this).index();
            swiper.slideTo(_index)
            return false;
        })
    },
    init:function () {  // 页面初始化
        classification.homeView();
    }
};
$(function () {
    // 页面初始化
    classification.init();
    // classification.homeViewSuccess(classificationData);
})

// classification.homeViewSuccess(classificationData);

