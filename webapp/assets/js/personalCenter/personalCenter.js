//个人中心js
//模拟数据（个人中心首页）
var PerCenData = {
    "message": "请求成功",
    "status": "200",
    "result": {
        "birthday": 20170623,
        "classs": "1301班",
        "countNoRead": true,
        "department": "信息工程学院",
        "email": "",
        "face": "upicawahead20170606062006166.gif",
        "introduce": "",
        "moblie": "13333333333",
        "name":"郭文超aaa",
        "professional": "计算机科技",
        "sex": "男",
        "studentLevel":[
            {
                "category":"视听说",
                "level":1
            },
            {
                "category":"读写译",
                "level":1
            }
        ],
        "userCode":"8888888",
        "username":"guowc"
    },
};
//个人中心首页
var perCenPage = {
    // 页面初始化ajax数据请求
    perCenView: function () {
        common.post("/userInfo/selectUserInfo",null,this.perCenViewSuccess,this.perCenViewError);
    },
    //成功回调
    perCenViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var picTextTemplate = Handlebars.compile($("#picText-template").html());
            var nowGradeTemplate = Handlebars.compile($("#nowGrade-template").html());
            var renderHTML = data.result;
            $('.pic-text').html(picTextTemplate(renderHTML));
            $('.now-grade-copy').html(nowGradeTemplate(renderHTML));
        };
    },
    //失败回调
    perCenViewError:function (err) {
        alert(err);
    },
    bindEvent:function () {
        // alert(2);
        $('.logout').on("tap",function () {
            // alert(1);
            common.post("/userLogin/logout",null,function (data) {
                swal("","当前用户已退出","success").then(
                    function () {
                        window.location.href="../../login.html";
                    }
                );
            },function (err) {
                swal("",err,"error");
            });
            return false;
        })
    },
    //页面初始化
    init:function(){
        perCenPage.perCenView();
        perCenPage.bindEvent();
    }
}

$(function () {
    perCenPage.init();
    // perCenPage.bindEvent();
    // perCenPage.perCenViewSuccess(PerCenData);
});





