//笔记答疑展示首页js
//模拟数据（笔记答疑展示首页）
var NodeQuesPageData = {
        "success": true,
        "message": "",
        "error": "",
        "payload": {
            "result": [//返回结果详细信息
                {
                    "courseName": "新时代交互英语 读写译第一级",
                    "courseImg": "../../assets/images/course.png",
                    "courseId": 5
                },
                {
                    "courseName": "新时代交互英语 视听说第一级",
                    "courseImg": "../../assets/images/course.png",
                    "courseId": 1
                }
            ],
            "message": "请求成功",
            "status": "200" //返回状态值

        }
    };
//笔记答疑展示首页
var NodeQuesPage = {
    //页面初始化ajax数据请求
    nodeQuesView: function () {
        common.post("/studentNews/courseNoticeFind", null,this.nodeQuesViewSuccess,this.nodeQuesViewError)
    },
    //成功回调
    nodeQuesViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var nodeQuesTemplate = Handlebars.compile($("#nodeQues-template").html());
            var renderHTML = data;
            $('#nodeQues').html(nodeQuesTemplate(renderHTML));
        };
        if(data.status === '506'){
            swal("","您所学课程暂无笔记和答疑！","warning").then(function () {
                window.history.go(-1);
            });
        }
    },
    //失败回调
    nodeQuesViewError:function (err) {
        alert(err);
    },
    //页面初始化
    init:function(){
        this.nodeQuesView();
    }
}

$(function () {
    NodeQuesPage.init();
    // NodeQuesPage.nodeQuesViewSuccess(NodeQuesPageData.payload);
});
