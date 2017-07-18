/**
 * Created by kevin on 2017/7/3.
 * 我的课程 单元学习的各个模块
 */
var loadingImage = $(".loading");
/**
 *下拉菜单模块
 */
var studyMenuData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": [
            {"name": "Goals", "index": 1, "id": 1, "type": "content", "required": true, "status": 2 /* 学完了*/},
            {"name": "Watch the Video", "index": 2, "id": 2, "type": "content", "required": true, "status": 1 /* 正在学*/},
            {"name": "Global Comprehension", "index": 3, "id": 3, "type": "sectionExam", "required": true, "status": 0 /* 还没有学*/},
            {"name": "Review", "index": 4, "id": 4, "type": "content", "required": true, "status": 0},
            {"name": "Detailed Comprehension", "index": 5, "id": 8, "type": "sectionExam", "required": true, "status": 0},
            {"name": "More Listening", "index": 6, "id": 17, "type": "sectionExam", "required": true, "status": 0}
        ],
        "unit": 4,
        "message": "请求成功",
        "status": "200"
    }
};
var studyMenu = {
    homeView: function () { // 页面初始化ajax数据请求
        var parmas = {};
        parmas["unitId"] = common.getUrlParams("historyUnit");
        common.post("/Course/detailSectionByunitId", parmas, studyMenu.homeViewSuccess, studyMenu.homeViewError);
    },
    homeViewSuccess: function (data) { //成功回调
        // console.log(data);
        if (data.status === '200') {
            var myTemplate = Handlebars.compile($("#studyMenuTpl").html());
            $('#studyMenuInfo').html(myTemplate(data));
            studyMenu.menuSlide();
        }
    },
    homeViewError: function (err) { //失败回调
        // alert(err);
        // studyMenu.homeViewSuccess(studyMenuData.payload);
    },
    menuSlide: function () {
        $(".pageInfo .menu-icon").off("tap");
        $(".pageInfo .menu-icon").tap(function (e) {
            // console.log(123);
            $(this).parent().next(".unit-detail").slideToggle("slow");
            return false;
        });
    },
    init: function () {
        studyMenu.homeView();
        // studyMenu.homeViewSuccess(studyMenuData.payload);
    }
}

/**
 * 公共模块和全局变量
 *
 */

var unitTest = {
    pageView: function () { // 页面初始化ajax数据请求
        var parmas = common.getUrlParams();
        $.extend(parmas, {
            "counts": 1,
            "currentSection": 0,
            "currentUnit": 0,
            "jump": false
        });
        common.post("/Course/getStudy", parmas, unitTest.pageViewSuccess, unitTest.pageViewError);
    },
    pageViewSuccess: function (data) { //成功回
        if (data.status === "200") {
            if (data.required) {
                //成功回调执行函数
                unitTest.pageViewSuccessHandler(data);
            } else {
                swal({
                        title: "本环节为选修环节",
                        text: "你是否跳过本环节的学习?",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "多多益善！",
                        cancelButtonText: "多学无益！",
                    },
                function (isConfirm) {
                    if (isConfirm) {
                        unitTest.pageViewSuccessHandler(data);
                    } else {
                        unitTest.nextButtonHandler(data);
                    }
                });
            }
        } else if (data.status === "511") {
            $(".loading").hide();
            swal({
                title: "温馨提示",
                text: data.message,
                type: "info",
            }).then(function () {
                window.location.href = "/webapp/index.html";
            });
        } else if (data.status === "507") {
            window.location.href = "/webapp/login.html";
        };
    },
    pageViewSuccessHandler: function (data) {
        var partType = "";
        if (data.studyType === "content") { // 判断数据类型
            partType = data.studyContent.type;
        } else if (data.studyType === "sectionExam") {
            partType = data.questions[0].questionType;
            // 按钮转换
            $(".nextCommon a").html("SUBMIT");
        }
        // alert(partType);
        if (partType === "goals") {
            studyGolas.init(data);
        } else if (partType === "watchVideo") {
            watchVideo.init(data);
        } else if (partType === "review") {
            review.init(data);
        } else if (partType === "listening") {
            listeningChoice.init(data);
        } else if (partType === "fill") {
            moreLinstening.init(data);
        } else {
            return;
        }

        unitTest.changeURL(data);
        // 注册 NEXT 点击事件
        unitTest.nextButtonEvent(data);
        // 更新 menu 菜单数据
        studyMenu.init();
    },
    // 无刷新改变 url
    changeURL: function (data) {
        var oldURL = window.location.href;
        var tempArr = oldURL.split("?");
        var paramsStr = "?historySection="+data.currentSection+"&historyUnit="+data.currentUnit;
        var newUrl = tempArr[0] + paramsStr;
        window.history.replaceState("",data.sectionName,newUrl)
        $("#pageTitle").html(data.sectionName);
    },
    // NEXT 按钮点击事件
    nextButtonEvent: function (data) {
        // 注册事件之前先移除上一个事件
        $(".nextCommon").off("tap");
        $(".nextCommon").on("tap", function (e) {
            unitTest.nextButtonHandler(data, this);
            return false;
        })
    },
    // NEXT 按钮事件 执行函数
    nextButtonHandler: function (data, ele) {
        var buttonText = $(ele).find("a").html();
        buttonText = $.trim(buttonText)
        // alert(buttonText);
        if (buttonText == "NEXT") {
            // alert("下一环节");
            // console.log(data);
            var parmas = {
                "counts": 2,
                "currentSection": data.currentSection,
                "currentUnit": data.currentUnit,
                "historySection": 0,
                "historyUnit": 0,
                "jump": false
            };
            common.post("/Course/getStudy", parmas, unitTest.pageViewSuccess, unitTest.pageViewError);
        } else if (buttonText == "SUBMIT") {
            // alert("数据提交");
            var params = {
                "courseId": 1,
                "index": data.index,
                "currentSection": data.currentSection,
                "currentUnit": data.currentUnit,
                "examId": data.examId,
            };
            var parmas = $.param(params);
            parmas = parmas + "&" + $("form.study-part").serialize();
            common.post("/Course/submitData", parmas, function (data) { // inStudy
                if ( data.hasOwnProperty("inStudy")) {
                    swal({
                        title: "友情提示",
                        text: "你已经学过此环节了!",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(function () {}, function () {});
                    return false;
                } else {
                    // alert("答案回显");
                    var questionType = data.questions[0].questionType;
                    if (questionType === "listening") {
                        listeningChoice.answerChechedHandker(data);
                    } else if (questionType === "fill") {
                        moreLinstening.answerChechedHandker(data);
                    }
                }
            });
            $(".nextCommon a").html("NEXT");
        }

    },
    pageViewError: function (data) {},
}

/**
 * studyGoals 模块
 */
var studyGolasData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "sectionName": "1/12      Goals",
        "unit": "UNIT  1  The First Day",
        "idkey": "a395e35975e94a35a513aab668595957",
        "studyType": "content",
        "currentSection": 1,
        "studyContent": {
            "idkey": "3df713448ac74aceb19f06be189367c9",
            "type": "goals",
            "data": "{\"words\":{\"0\":{\"word\":\"nervous\",\"translation\":\"worried or frightened\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"1\":{\"word\":\"embarrassed\",\"translation\":\"painfully self-conscious, ill at ease, ashamed, or humiliated\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"2\":{\"word\":\"professor\",\"translation\":\"a university teacher of the highest grade\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"3\":{\"word\":\"instructor\",\"translation\":\"a teacher\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"4\":{\"word\":\"nice\",\"translation\":\"friendly or kind\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"5\":{\"word\":\"when it comes to something\",\"translation\":\"when dealing with something or talking about something\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"6\":{\"word\":\"to try out\",\"translation\":\"to compete for a part in a play or a position of a sports team by playing or performing in front of other people\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"},\"7\":{\"word\":\"lines\",\"translation\":\"the words that actors speak when performing\",\"content\":\"\",\"example\":\"\",\"resourceId\":\"\"}},\"goals\":{\"Topic\":\"\u003cb\u003eIntroducing Yourself\u003c/b\u003e\",\"Function\":\"● Introducing: \u003ci\u003eI\u0027m a student too. My name\u0027s Jin.\u003c/i\u003e\u003cbr/\u003e● Registering: \u003ci\u003eHi, I want to register for a class.\u003c/i\u003e\",\"Language Learning Strategy\":\"Autonomous learning is a prerequisite for successful learning\",\"Pronunciation\":\"● Sentence stress: \u003ci\u003eI\u0027m late. I\u0027m the teacher\u003c/i\u003e.\u003cbr/\u003e● Contractions with be: \u003ci\u003eIt\u0027s ten o\u0027clock. That\u0027s OK\u003c/i\u003e.\",\"Communication Tip\":\"Greeting by shaking hands\"},\"type\":\"goals\",\"resourceItems\":{\"0\":{\"id\":\"\",\"type\":\"swf\",\"url\":\"nullVLSP/Directions/Goals.swf\"}},\"directions\":[{\"resourceid\":\"0\",\"content\":\"For the learning objectives of the unit, please see the table below. You can find the explanations of the new words or phrases by clicking on them.\"}]}",
            "flowType": "course",
            "id": 1,
            "corg": 0,
            "updatetime": 0,
            "createtime": 1496301405788
        },
        "section": 65,
        "currentUnit": 2,
        "courseId": 1,
        "required": true
    }
};
var studyGolas = {
    // 请求成功执行函数
    pageViewHandler: function (data) {
        data.studyContent.data = $.parseJSON(data.studyContent.data);
        // 处理一下不好获取的数据
        var tempObj = data.studyContent.data.goals;
        tempObj["Strategy"] = tempObj["Language Learning Strategy"];
        tempObj["Tip"] = tempObj["Communication Tip"];
        if (data.studyContent) {
            var myTemplate = Handlebars.compile($("#studyGolasTpl").html());
            $('#unitTestPartInfo').html(myTemplate(data.studyContent));

            $(".loading").hide();

            studyGolas.slideControl();// 注册 slide 事件
            studyGolas.showTranslation(); // 注册 word 翻译事件
        }
    },
    // golas 页面控制上下滑动
    slideControl: function () {
        $(".goals-info .item-title").tap(function (e) {
            if ($.mySlideFlag) {
                $(this).find(".iconfont").toggleClass("transfrom90");
            }
            $(this).next(".item-info").slideToggle(300);
            return false;
        });
    },
    // 单词翻译事件
    showTranslation: function () {
        $("ul.item-info li").tap(function (e) {
            var title = $(this).find("span:first-child").text();
            var text = $(this).find("span:last-child").text();
            swal({
                title: title,
                text: "Paraphrase : " + text,
                timer: 2000,
                showConfirmButton: false
            }).then(function () {}, function () {});
            return false;
        })
    },

    init: function (data) {
        studyGolas.pageViewHandler(data);
    }
};

/**
 * watchVideos 模块
 */
var watchVideoData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "sectionName": "2/12      Watch the Video",
        "unit": "UNIT  1  The First Day",
        "idkey": "a395e35975e94a35a513aab668595957",
        "studyType": "content",
        "currentSection": 2,
        "studyContent": {
            "idkey": "a46717cf35194c3a884a08dc3e80ba73",
            "type": "watchVideo",
            "data": "{\"resourceid\":\"1\",\"note\":\"\u003cp\u003eEmi asks, \\\"Is this English with Professor Brown?\\\" She means, \\\"Is this the English class, with Professor Brown as the teacher?\\\" On the first day of class, many students ask this question.\u003c/p\u003e\u003cp\u003eThe instructor says, \\\"This class is easy\\\" and, \\\"The instructor is really nice.\\\" He is joking; many American teachers speak very informally and humorously to their pupils.\u003c/p\u003e\u003cp\u003eClassmates in the U.S. usually call each other by their first names. Emi calls Jin Koh \\\"Jin.\\\"\u003c/p\u003e\",\"type\":\"watchVideo\",\"resourceItems\":{\"0\":{\"id\":\"\",\"type\":\"swf\",\"url\":\"http://10.96.142.131/RES/VLSP/Directions/WatchTheVideo.swf\"},\"1\":{\"id\":\"\",\"type\":\"mp4\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Video/V111.mp4\"}},\"directions\":[{\"resourceid\":\"0\",\"content\":\"You will now watch a short video. Watch the video once and try to understand the general meaning of what the speakers say.\"}]}",
            "flowType": "course",
            "id": 2,
            "corg": 0,
            "updatetime": 0,
            "createtime": 1496301411218
        },
        "section": 66,
        "currentUnit": 2,
        "courseId": 1,
        "required": true
    }
};
var watchVideo = {
    // 请求成功执行函数
    pageViewHandler: function (data) {
        data.studyContent.data = $.parseJSON(data.studyContent.data);
        // console.log(data);
        // console.log(data.studyContent);
        if (data.studyContent) {
            var myTemplate = Handlebars.compile($("#watchVideoTpl").html());
            $('#unitTestPartInfo').html(myTemplate(data.studyContent));

            $(".loading").hide();

            watchVideo.slideControl();// 注册 slide 事件
        }
    },
    // watchVideo 页面控制上下滑动
    slideControl: function () {
        $(".watchiVideo-item .item-title").tap(function (e) {
            if ($.mySlideFlag) {
                $(this).find(".iconfont").toggleClass("transfrom90");
            }
            $(this).next(".item-info").slideToggle("slow");
            return false;
        });
    },

    init: function (data) {
        watchVideo.pageViewHandler(data);
    }
};

/**
 * review 模块
 */

var reviewData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "sectionName": "5/6      Review",
        "unit": "UNIT  1  The First Day",
        "idkey": "a395e35975e94a35a513aab668595957",
        "studyType": "content",
        "currentSection": 4,
        "studyContent": {
            "idkey": "2d8e8b05800040baa8a82a6568e87873",
            "type": "review",
            "data": "{\"resourceid\":\"1\",\"note\":\"<p>Emi asks, \\\"Is this English with Professor Brown?\\\" She means, \\\"Is this the English class, with Professor Brown as the teacher?\\\" On the first day of class, many students ask this question.</p><p>The instructor says, \\\"This class is easy\\\" and, \\\"The instructor is really nice.\\\" He is joking; many American teachers speak very informally and humorously to their pupils.</p><p>Classmates in the U.S. usually call each other by their first names. Emi calls Jin Koh \\\"Jin.\\\"</p>\",\"items\":[{\"startTime\":4.8,\"endTime\":9.1,\"normalImage\":\"2\",\"focusImage\":\"3\",\"content\":\"Oh, no ...  It's ____ o'clock!  I'm ____.\"},{\"startTime\":15.0,\"endTime\":18.0,\"normalImage\":\"4\",\"focusImage\":\"5\",\"content\":\"Is this ____ ____ Professor Brown?\"},{\"startTime\":18.0,\"endTime\":21.1,\"normalImage\":\"6\",\"focusImage\":\"7\",\"content\":\"Yes.  This is it.\"},{\"startTime\":21.1,\"endTime\":24.9,\"normalImage\":\"8\",\"focusImage\":\"9\",\"content\":\"I'm ____.\"},{\"startTime\":24.9,\"endTime\":28.5,\"normalImage\":\"10\",\"focusImage\":\"11\",\"content\":\"Don't ____ ____.  This class is ____.\"},{\"startTime\":28.5,\"endTime\":31.3,\"normalImage\":\"12\",\"focusImage\":\"13\",\"content\":\"Really?  It's ____?\"},{\"startTime\":31.3,\"endTime\":34.8,\"normalImage\":\"14\",\"focusImage\":\"15\",\"content\":\"Yes.  And the ____ is really ____.\"},{\"startTime\":34.8,\"endTime\":40.4,\"normalImage\":\"16\",\"focusImage\":\"17\",\"content\":\"He is?  ____ ...  Are you a ____?\"},{\"startTime\":40.4,\"endTime\":44.3,\"normalImage\":\"18\",\"focusImage\":\"19\",\"content\":\"No, I'm not.  I'm the ____.\"},{\"startTime\":44.3,\"endTime\":48.6,\"normalImage\":\"20\",\"focusImage\":\"21\",\"content\":\"You're ____ Brown?!  I'm so ____.\"},{\"startTime\":48.6,\"endTime\":51.6,\"normalImage\":\"22\",\"focusImage\":\"23\",\"content\":\"Don't ____.  Welcome to the class.\"},{\"startTime\":51.6,\"endTime\":58.2,\"normalImage\":\"24\",\"focusImage\":\"25\",\"content\":\"Hi.\"},{\"startTime\":58.2,\"endTime\":59.4,\"normalImage\":\"26\",\"focusImage\":\"27\",\"content\":\"Hi.\"},{\"startTime\":59.4,\"endTime\":62.9,\"normalImage\":\"28\",\"focusImage\":\"29\",\"content\":\"I'm a student, too.  My name's Jin.\"},{\"startTime\":62.9,\"endTime\":66.3,\"normalImage\":\"30\",\"focusImage\":\"31\",\"content\":\"Hi.  I'm Emi ...  Emi Okada.\"},{\"startTime\":66.3,\"endTime\":68.7,\"normalImage\":\"32\",\"focusImage\":\"33\",\"content\":\"Oh, you're ____!\"},{\"startTime\":68.7,\"endTime\":72.0,\"normalImage\":\"34\",\"focusImage\":\"35\",\"content\":\"That's right.  And you're ...?\"},{\"startTime\":72.0,\"endTime\":77.6,\"normalImage\":\"36\",\"focusImage\":\"37\",\"content\":\"I'm ____.  This is my first class here.  I'm a little ____, too.\"},{\"startTime\":77.6,\"endTime\":84.3,\"normalImage\":\"38\",\"focusImage\":\"39\",\"content\":\"Well, it's nice to meet you.  Your name's Jean?\"},{\"startTime\":84.3,\"endTime\":86.6,\"normalImage\":\"40\",\"focusImage\":\"41\",\"content\":\"Jin.  Jin Koh.\"},{\"startTime\":86.6,\"endTime\":93.1,\"normalImage\":\"42\",\"focusImage\":\"43\",\"content\":\"OK, everyone.  Good morning.  I'm Eric Brown.  Let's ____ ____ ...\"}],\"type\":\"review\",\"resourceItems\":{\"0\":{\"id\":\"\",\"type\":\"swf\",\"url\":\"http://10.96.142.131/RES/VLSP/Directions/Review.swf\"},\"1\":{\"id\":\"\",\"type\":\"mp3\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Audio/A111.mp3\"},\"2\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110100.gif\"},\"3\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110101.gif\"},\"4\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110200.gif\"},\"5\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110201.gif\"},\"6\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110300.gif\"},\"7\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110301.gif\"},\"8\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110400.gif\"},\"9\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110401.gif\"},\"10\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110500.gif\"},\"11\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110501.gif\"},\"12\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110600.gif\"},\"13\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110601.gif\"},\"14\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110700.gif\"},\"15\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110701.gif\"},\"16\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110800.gif\"},\"17\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110801.gif\"},\"18\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110900.gif\"},\"19\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1110901.gif\"},\"20\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111000.gif\"},\"21\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111001.gif\"},\"22\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111100.gif\"},\"23\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111101.gif\"},\"24\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111200.gif\"},\"25\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111201.gif\"},\"26\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111300.gif\"},\"27\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111301.gif\"},\"28\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111400.gif\"},\"29\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111401.gif\"},\"30\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111500.gif\"},\"31\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111501.gif\"},\"32\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111600.gif\"},\"33\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111601.gif\"},\"34\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111700.gif\"},\"35\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111701.gif\"},\"36\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111800.gif\"},\"37\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111801.gif\"},\"38\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111900.gif\"},\"39\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1111901.gif\"},\"40\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1112000.gif\"},\"41\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1112001.gif\"},\"42\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1112100.gif\"},\"43\":{\"id\":\"\",\"type\":\"gif\",\"url\":\"http://10.96.142.131/RES/VLS1/Course/Review/Images/111/1112101.gif\"}},\"directions\":[{\"resourceid\":\"0\",\"content\":\"Now watch the video again. This time the video is broken into sections. Try to understand exactly what is said in each section. Click on the picture to hear the corresponding section, and use the slider to slow down or speed up the speakers if you like. You will see an incomplete version of the script on the screen.\"}]}",
            "flowType": "course",
            "id": 3,
            "corg": 0,
            "updatetime": 0,
            "createtime": 1496301412261
        },
        "section": 68,
        "currentUnit": 2,
        "courseId": 1,
        "required": true
    }
};
var review = {
    // 请求成功执行函数
    pageViewHandler: function (data) {
        var studyContent = data.studyContent;
        if (data.studyContent) {
            var myTemplate = Handlebars.compile($("#reviewTpl").html());
            $('#unitTestPartInfo').html(myTemplate(data.studyContent));

            studyIncidents(studyContent);

            $(".loading").hide();
        }
    },
    init: function (data) {
        review.pageViewHandler(data);
    }
};


/**
 * listeningChoice 模块
 */

var listeningChoiceData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "currentSection": 3,
        "questions": [{
            "questionType": "listening",
            "subjective": false,
            "status": "auditsuccess",
            "subsidiary": false,
            "flowType": "course",
            "difficulty": 0,
            "createUser": 0,
            "auditTeacher": 0,
            "audit": true,
            "data": "{\n  \"resourceId\": \"0\",\n  \"questions\": [\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"What can you infer about the relationship between Jin and Emi?\\\",\\n  \\\"answer\\\": \\\"3\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Jin is Emi\u0027s instructor.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Jin is Emi\u0027s old friend.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"They have never met each other before.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Jin is Emi\u0027s old classmate.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601zirwvuwa\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301411348\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"Which statement is true?\\\",\\n  \\\"answer\\\": \\\"2\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Emi and Jin are in the different classes.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Emi and Jin both felt nervous about the class.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"Jin has taken Professor Brown\u0027s class before.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Jin is a Japanese.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601mwfddsaq\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301411387\n    }\n  ],\n  \"type\": \"listening\",\n  \"resourceItems\": {\n    \"0\": {\n      \"id\": \"\",\n      \"type\": \"mp4\",\n      \"url\": \"http://10.96.142.131/RES/VLS1/Course/Video/V111.mp4\"\n    }\n  }\n}",
            "id": "LI20170601jymmhkcm",
            "corg": 0,
            "updatetime": 0,
            "createtime": 1496301411405
        }],
        "index": 0,
        "section": 66,
        "currentUnit": 2,
        "required": true,
        "sectionName": "3/12      Global Comprehension",
        "descr": "Click on the statements you think best match what happened in the video you just watched. If you get any of the answers wrong, you will have to watch the video again.",
        "unit": "UNIT  1  The First Day",
        "idkey": "a395e35975e94a35a513aab668595957",
        "descResourceUrl": "http://10.96.142.131/RES/VLSP/Directions/GlobalComprehension.swf",
        "regulation": 1,
        "studyType": "sectionExam",
        "examId": "EXAM20170601hpanv",
        "courseId": 1
    }
};
// 答案提交回显
var answerData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "questions": [{
            "questionType": "listening",
            "subjective": false,
            "status": "auditsuccess",
            "subsidiary": false,
            "flowType": "course",
            "difficulty": 0,
            "createUser": 0,
            "auditTeacher": 0,
            "audit": true,
            "data": "{\n  \"resourceId\": \"0\",\n  \"questions\": [\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"What can you infer about the relationship between Jin and Emi?\\\",\\n  \\\"answer\\\": \\\"3\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Jin is Emi\u0027s instructor.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Jin is Emi\u0027s old friend.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"They have never met each other before.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Jin is Emi\u0027s old classmate.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601zirwvuwa\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301411348\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"Which statement is true?\\\",\\n  \\\"answer\\\": \\\"2\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Emi and Jin are in the different classes.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Emi and Jin both felt nervous about the class.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"Jin has taken Professor Brown\u0027s class before.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Jin is a Japanese.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601mwfddsaq\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301411387\n    }\n  ],\n  \"type\": \"listening\",\n  \"resourceItems\": {\n    \"0\": {\n      \"id\": \"\",\n      \"type\": \"mp4\",\n      \"url\": \"VLS1/Course/Video/V111.mp4\"\n    }\n  }\n}",
            "id": "LI20170601jymmhkcm",
            "corg": 0,
            "updatetime": 0,
            "createtime": 1496301411405
        }], "score": 0, "courseId": 1
    }
};
var listeningChoice = {
    // 请求成功执行函数
    pageViewHandler: function (data) {
        // 处理不好解析的数据
        var tempObj = data.questions[0].data;
        data.questions[0].data = $.parseJSON(tempObj);
        $.each(data.questions[0].data.questions, function (index, item) {
            data.questions[0].data.questions[index].data = $.parseJSON(item.data);
        });
        // console.log(data);
        // console.log(data.questions[0]);
        console.log(data.questions[0].data);

        if (data.questions[0]) {
            var myTemplate = Handlebars.compile($("#listeningChoiceTpl").html());
            $('#unitTestPartInfo').html(myTemplate(data));

            $(".loading").hide();

            listeningChoice.slideControl(); // 注册事件
        }
    },
    // 成绩提交后的处理函数
    answerChechedHandker: function (data) {
        // 处理不好解析的数据
        var tempObj = data.questions[0].data;
        data.questions[0].data = $.parseJSON(tempObj);
        $.each(data.questions[0].data.questions, function (index, item) {
            data.questions[0].data.questions[index].data = $.parseJSON(item.data);
        });

        // console.log(data);
        // console.log(data.questions[0]);
        // console.log(data.questions[0].data);

        if (data.score === 100) {
            swal('Good job!', 'You get ' + data.score + " !", 'success');
        } else if (data.score === 0) {
            swal('Very Sorry!', 'You get ' + data.score + " !", 'warning');
        } else {
            swal('Do More!', 'You get ' + data.score + " !");
        }

        var answerArr = data.questions[0].data.questions;
        var inputEleArra = $("form.study-part .choice-part .swiper-slide");
        $.each(inputEleArra, function (index, item) {
            var inputEle = $(item).find("input[type='radio']:checked");
            var answer = answerArr[index].data.answer;
            if (inputEle){
                var value = inputEle.val();
                if (value !== answer) {
                    $(item).find(".choice-title").css("color","#f95959");
                    inputEle.siblings(".option-label").removeClass("selected");
                    inputEle.siblings(".option-label").addClass("waring");
                    showRight(item, answer);
                }
            } else {
                showRight(item, answer);
            }
        });
        // 标注正确答案
        function showRight(item, answer) {
            var eleArray = $(item).find("input[type='radio']");
            $.each(eleArray, function (index, inputEle) {
                if ($(inputEle).val() === answer) {
                    $(inputEle).siblings(".option-label").addClass("selected");
                }
            });
        }
    },
    // listeningChoice 页面控制 Swiper
    slideControl: function () {
        // 单项选择题 options 的点击改变样式
        $(".choice-option").tap(function () {
            $(this).find(".option-label").addClass("selected");
            $(this).siblings().find(".option-label").removeClass("selected");
            return false;
        })
        // Swiper 滑动
        var choiceSwiper = new Swiper('.swiper-container', {
            speed: 100,
            onSlideChangeEnd: function (swiper) {
                var currentSerial = document.querySelector("#current-serial");
                currentSerial.innerHTML = (swiper.activeIndex + 1);
            }
        });
    },

    init: function (data) {
        listeningChoice.pageViewHandler(data);
    }
};

/**
 * moreLinstening 模块
 */

var moreListeningData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "courseId": 4,
        "examId": "EXAM20170601eypph",
        "studyType": "sectionExam",
        "required": true,
        "section": 1517,
        "currentSection": 1404,
        "currentUnit": 52,
        "sectionName": "12/18      More Listening Comprehension 4",
        "unit": "UNIT  1  The Straight Story",
        "index": 0,
        "questions": [
            {
                "questionType": "fill",
                "subjective": false,
                "status": "auditsuccess",
                "subsidiary": false,
                "flowType": "course",
                "difficulty": 0,
                "createUser": 0,
                "auditTeacher": 0,
                "audit": true,
                "data": "{\n  \"stem\": \"<b>Talia:</b> <textentry></textentry> <textentry></textentry> a second. You never said anything about a commercial. I want to hear more about this. Don't <textentry></textentry> <textentry></textentry> any details. This could be important.<br/><b>Nick:</b> OK. So, over lunch she describes <textentry></textentry> <textentry></textentry> … <br/><b>Jackie:</b> So, you'll <textentry></textentry> our shoes when you play. And we'll use your name in <textentry></textentry> . Do that and fifty thousand dollars is yours.<br/><b>Nick:</b> <textentry></textentry> <textentry></textentry> . And this will be sometime next year?<br/><b>Jackie:</b> Uh, yeah, that's right. We can <textentry></textentry> <textentry></textentry> the details later for this, but we'll probably want you to <textentry></textentry> in a commercial.<br/><b>Nick:</b> <textentry></textentry> !<br/><b>Jackie:</b> <textentry></textentry> <textentry></textentry> , I'm working on an idea for a commercial right now. Do you want to hear about it?<br/><b>Nick:</b> Sure.<br/><b>Jackie:</b> OK. <textentry></textentry> this. You're sitting in a park. On a bench. It's a beautiful spring day.<br/><b>Nick:</b> <textentry></textentry> <textentry></textentry> , <textentry></textentry> <textentry></textentry> .<br/><b>Jackie:</b> OK. A young kid <textentry></textentry> <textentry></textentry> to you and says, \\\"Hey! Aren't you Nick Crawford, the soccer star?\\\"<br/><b>Nick:</b> Uh-huh.<br/><b>Jackie:</b> And you say, \\\"That's me.\\\" Or something <textentry></textentry> <textentry></textentry> .<br/><b>Nick:</b> Right.<br/><b>Jackie:</b> And then the kid says, \\\"Wow! Cool shoes! What are they?\\\" And you say, \\\"Kicks. <textentry></textentry> <textentry></textentry> ?\\\"<br/><b>Nick:</b> That's it?<br/><b>Jackie:</b> That's it.<br/><b>Nick:</b> So, <textentry></textentry> I have to do is sit on the bench … And talk to a kid?<br/><b>Jackie:</b> That's all you have to do.<br/><b>Talia:</b> That's what I thought! This Jackie person recorded your conversation over lunch. Then she <textentry></textentry> the tape so it sounds like you're <textentry></textentry> <textentry></textentry> <textentry></textentry> . <br/><b>Nick:</b> Oh, wow!\",\n  \"options\": {},\n  \"answers\": {},\n  \"resourceId\": \"0\",\n  \"type\": \"fill\",\n  \"resourceItems\": {\n    \"0\": {\n      \"id\": \"\",\n      \"type\": \"mp3\",\n      \"url\": \"http://115.182.41.67/RES/VLS4/Course/More Listening/V413.mp3\"\n    }\n  }\n}",
                "id": "FI20170601gmliijye",
                "corg": 0,
                "updatetime": 0,
                "createtime": 1496301751343
            }
        ],
        "descr": "Listen to the dialogue again and fill in the missing words based on what you have heard. You can click on the \"Pause\" button whenever you need time to type the missing words. Use the slider bar to change the speed of the speakers. If you fail to get more than 70% of the items correct, you will have to do the exercise again.",
        "regulation": 0,
        "descResourceUrl": "http://115.182.41.67/RES/VLSP/Directions/Speak.swf?surl=21.mp3",
        "idkey": "ac0815aa7b8042cb8aed685b665ba211"
    }
};
// 答案提交回显
var answerDataMore = {
    "payload": {
        "questions": [
            {
                "questionType": "fill",
                "subjective": false,
                "status": "auditsuccess",
                "subsidiary": false,
                "flowType": "course",
                "difficulty": 0,
                "createUser": 0,
                "auditTeacher": 0,
                "audit": true,
                "data": "{\n  \"stem\": \"<b>Talia:</b> <textentry></textentry> <textentry></textentry> a second. You never said anything about a commercial. I want to hear more about this. Don't <textentry></textentry> <textentry></textentry> any details. This could be important.<br/><b>Nick:</b> OK. So, over lunch she describes <textentry></textentry> <textentry></textentry> … <br/><b>Jackie:</b> So, you'll <textentry></textentry> our shoes when you play. And we'll use your name in <textentry></textentry> . Do that and fifty thousand dollars is yours.<br/><b>Nick:</b> <textentry></textentry> <textentry></textentry> . And this will be sometime next year?<br/><b>Jackie:</b> Uh, yeah, that's right. We can <textentry></textentry> <textentry></textentry> the details later for this, but we'll probably want you to <textentry></textentry> in a commercial.<br/><b>Nick:</b> <textentry></textentry> !<br/><b>Jackie:</b> <textentry></textentry> <textentry></textentry> , I'm working on an idea for a commercial right now. Do you want to hear about it?<br/><b>Nick:</b> Sure.<br/><b>Jackie:</b> OK. <textentry></textentry> this. You're sitting in a park. On a bench. It's a beautiful spring day.<br/><b>Nick:</b> <textentry></textentry> <textentry></textentry> , <textentry></textentry> <textentry></textentry> .<br/><b>Jackie:</b> OK. A young kid <textentry></textentry> <textentry></textentry> to you and says, \\\"Hey! Aren't you Nick Crawford, the soccer star?\\\"<br/><b>Nick:</b> Uh-huh.<br/><b>Jackie:</b> And you say, \\\"That's me.\\\" Or something <textentry></textentry> <textentry></textentry> .<br/><b>Nick:</b> Right.<br/><b>Jackie:</b> And then the kid says, \\\"Wow! Cool shoes! What are they?\\\" And you say, \\\"Kicks. <textentry></textentry> <textentry></textentry> ?\\\"<br/><b>Nick:</b> That's it?<br/><b>Jackie:</b> That's it.<br/><b>Nick:</b> So, <textentry></textentry> I have to do is sit on the bench … And talk to a kid?<br/><b>Jackie:</b> That's all you have to do.<br/><b>Talia:</b> That's what I thought! This Jackie person recorded your conversation over lunch. Then she <textentry></textentry> the tape so it sounds like you're <textentry></textentry> <textentry></textentry> <textentry></textentry> . <br/><b>Nick:</b> Oh, wow!\",\n  \"options\": {},\n  \"answers\": {\n    \"1\": [\n      \"Hang\"\n    ],\n    \"2\": [\n      \"on\"\n    ],\n    \"3\": [\n      \"leave\"\n    ],\n    \"4\": [\n      \"out\"\n    ],\n    \"5\": [\n      \"the\"\n    ],\n    \"6\": [\n      \"deal\"\n    ],\n    \"7\": [\n      \"wear\"\n    ],\n    \"8\": [\n      \"ads\"\n    ],\n    \"9\": [\n      \"Sounds\"\n    ],\n    \"10\": [\n      \"good\"\n    ],\n    \"11\": [\n      \"work\"\n    ],\n    \"12\": [\n      \"out\"\n    ],\n    \"13\": [\n      \"appear\"\n    ],\n    \"14\": [\n      \"Cool\"\n    ],\n    \"15\": [\n      \"In\"\n    ],\n    \"16\": [\n      \"fact\"\n    ],\n    \"17\": [\n      \"Picture\"\n    ],\n    \"18\": [\n      \"So\"\n    ],\n    \"19\": [\n      \"far\"\n    ],\n    \"20\": [\n      \"so\"\n    ],\n    \"21\": [\n      \"good\"\n    ],\n    \"22\": [\n      \"comes\"\n    ],\n    \"23\": [\n      \"up\"\n    ],\n    \"24\": [\n      \"like\"\n    ],\n    \"25\": [\n      \"that\"\n    ],\n    \"26\": [\n      \"What\"\n    ],\n    \"27\": [\n      \"else\"\n    ],\n    \"28\": [\n      \"all\"\n    ],\n    \"29\": [\n      \"edited\"\n    ],\n    \"30\": [\n      \"accepting\"\n    ],\n    \"31\": [\n      \"a\"\n    ],\n    \"32\": [\n      \"bribe\"\n    ]\n  },\n  \"resourceId\": \"0\",\n  \"type\": \"fill\",\n  \"resourceItems\": {\n    \"0\": {\n      \"id\": \"\",\n      \"type\": \"mp3\",\n      \"url\": \"VLS4/Course/More Listening/V413.mp3\"\n    }\n  }\n}",
                "id": "FI20170601gmliijye",
                "corg": 0,
                "updatetime": 0,
                "createtime": 1496301751343
            }
        ],
        "score": 0,
        "courseId": 1
    },
    "message": "",
    "error": "",
    "success": true
};
var moreLinstening = {
    // 请求成功执行函数
    pageViewHandler: function (data) {
        // 处理不好解析的数据
        var tempObj = data.questions[0].data;
        data.questions[0].data = $.parseJSON(tempObj);

        // console.log(data);
        // console.log(data.questions[0]);
        console.log(data.questions[0].data);

        if (data.questions[0]) {
            var myTemplate = Handlebars.compile($("#moreListeningTpl").html());
            $('#unitTestPartInfo').html(myTemplate(data));
        };
        $(".loading").hide();
    },

    // 成绩提交后的处理函数
    answerChechedHandker: function (data) {
        // ff6666
        // 处理不好解析的数据
        var tempObj = $.parseJSON(data.questions[0].data);
        data.questions[0].data = tempObj;

        // console.log(data);
        // console.log(data.questions[0]);
        // console.log(data.questions[0].data);
        // console.log(data.questions[0].data.answers);
        var answersArr = tempObj.answers;
        var inputEleArra = $("form.study-part input[name='"+data.questions[0].id+"']");
        // console.log(answersArr);
        var studValue = '';
        var answerValue = '';
        $.each(inputEleArra,function (index,item) {
            index++
            studValue = $(item).val();
            answerValue = answersArr[index][0];
            // console.log(answerValue);
            if(studValue !== answerValue){
                $(item).css("backgroundColor","#ff6666");
                $(item).attr("disabled","disabled");
                (function (item,answerValue) {
                    $(item).tap(function (e) {
                        swal({
                            title: "KEYS",
                            text: answerValue,
                            timer: 2000,
                            showConfirmButton: false
                        }).then(function () {}, function () {});
                        return false;
                    });
                })(item,answerValue);

            }
        })

        if (data.score === 100) {
            swal('Good job!', 'You get ' + data.score + " !", 'success');
        } else if (data.score === 0) {
            swal('Very Sorry!', 'You get ' + data.score + " !", 'warning');
        } else {
            swal('Do More!', 'You get ' + data.score + " !");
        }

    },
    init: function (data) {
        moreLinstening.pageViewHandler(data);
    }
};

/**
 * Detailed Comprehension
 */
var DetailedComprehension = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "currentSection": 8,
        "questions": [
            {
                "questionType": "listening",
                "subjective": false,
                "status": "auditsuccess",
                "subsidiary": false,
                "flowType": "course",
                "difficulty": 0,
                "createUser": 0,
                "auditTeacher": 0,
                "audit": true,
                "data": "{\n  \"resourceId\": \"0\",\n  \"questions\": [\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"What time did Emi come to the class?\\\",\\n  \\\"answer\\\": \\\"2\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Nine o'clock.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Ten o'clock.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"Eleven o'clock.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Twelve o'clock.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601rzeutjih\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301412664\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"Which class is Emi taking?\\\",\\n  \\\"answer\\\": \\\"3\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"The English class with Dr.Jin.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"The Math class with Professor Brown.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"The English class with Professor Brown.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"The Literature class with Professor Green.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601pskumcwb\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301412693\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"What did the professor say about the course?\\\",\\n  \\\"answer\\\": \\\"2\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"The course is not easy.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"The instructor is very nice.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"He comes here to observe the class.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"The class hasn't finished.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601wbrnnnbb\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301412716\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"How did Emi feel at first?\\\",\\n  \\\"answer\\\": \\\"2\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Excited.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Uneasy.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"Sad.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Angry.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601geejzwnx\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301412733\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"Why did Emi feel embarrassed?\\\",\\n  \\\"answer\\\": \\\"3\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"Because she came early for the course.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"Because she came to the wrong class.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"Because she thought Professor Brown was a student.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"Because the class is difficult.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601luafghgi\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301412752\n    },\n    {\n      \"questionType\": \"choice\",\n      \"subjective\": false,\n      \"status\": \"auditsuccess\",\n      \"subsidiary\": false,\n      \"flowType\": \"course\",\n      \"difficulty\": 0,\n      \"createUser\": 0,\n      \"auditTeacher\": 0,\n      \"audit\": true,\n      \"data\": \"{\\n  \\\"stem\\\": \\\"What did Professor suggest to Emi?\\\",\\n  \\\"answer\\\": \\\"2\\\",\\n  \\\"optionLayout\\\": 1,\\n  \\\"options\\\": {\\n    \\\"1\\\": {\\n      \\\"content\\\": \\\"She should know her classmates.\\\"\\n    },\\n    \\\"2\\\": {\\n      \\\"content\\\": \\\"She should take it easy.\\\"\\n    },\\n    \\\"3\\\": {\\n      \\\"content\\\": \\\"She should come early next time.\\\"\\n    },\\n    \\\"4\\\": {\\n      \\\"content\\\": \\\"She should introduce herself.\\\"\\n    }\\n  },\\n  \\\"type\\\": \\\"choice\\\"\\n}\",\n      \"id\": \"CH20170601nclyeuxv\",\n      \"corg\": 0,\n      \"updatetime\": 0,\n      \"createtime\": 1496301412770\n    }\n  ],\n  \"type\": \"listening\",\n  \"resourceItems\": {\n    \"0\": {\n      \"id\": \"\",\n      \"type\": \"mp4\",\n      \"url\": \"http://10.96.142.131/RES/VLS1/Course/Video/V111.mp4\"\n    }\n  }\n}",
                "id": "LI20170601kwasmaxg",
                "corg": 0,
                "updatetime": 0,
                "createtime": 1496301412798
            }
        ],
        "index": 0,
        "section": 68,
        "currentUnit": 2,
        "required": true,
        "sectionName": "6/6      Detailed Comprehension",
        "descr": "Choose the appropriate response to each of the following questions or statements about the video. If you fail to get more than 70% of the items correct, you will have to watch the video again.",
        "unit": "UNIT  1  The First Day",
        "idkey": "a395e35975e94a35a513aab668595957",
        "descResourceUrl": "http://10.96.142.131/RES/VLSP/Directions/DetailedComprehension.swf",
        "regulation": 1,
        "studyType": "sectionExam",
        "examId": "EXAM20170601wpazm",
        "courseId": 1
    }
};

$(function () {
    // studyMenu.init();
    // unitTest.pageView(studyGolasData.payload);
    unitTest.pageViewSuccess(listeningChoiceData.payload);
    // unitTest.pageViewSuccess(moreListeningData.payload);
    // unitTest.pageViewSuccess(reviewData.payload);
    // listeningChoice.pageViewHandler(listeningChoiceData.payload);
    // unitTest.pageView();
    
});



