//班级消息详情js
//模拟数据（班级消息详情）
var ClassNewsData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "noticePage": {
            "totalItemsCount": 2,
            "pageSize": 10,
            "pageNumber": 1,
            "items": [
                {
                    "createUser": 20,
                    "top": true,
                    "type": "courseclass",
                    "bid": 0,
                    "status": "publish",
                    "publishedUser": 0,
                    "publishedTime": 0,
                    "content": "测试数据啊aaa",
                    "title": "测试数据啊aaa",
                    "id": 3,
                    "corg": 0,
                    "updatetime": 0,
                    "createtime": 1499052180826
                },
                {
                    "createUser": 20,
                    "top": true,
                    "type": "courseclass",
                    "bid": 0,
                    "status": "publish",
                    "publishedUser": 0,
                    "publishedTime": 0,
                    "content": "这是一次测试通知这是一次测试通知",
                    "title": "这是一次测试通知",
                    "id": 2,
                    "corg": 0,
                    "updatetime": 0,
                    "createtime": 1497497139674
                }
            ],
            "lastPage": true
        },
        "noticeMsgList": [
            {
                "createTime": "2017/07/03 11:23:00",
                "createUser": "教师1",
                "title": "测试数据啊",
                "noticeId": 3
            },
            {
                "createTime": "2017/06/15 11:25:39",
                "createUser": "教师1",
                "title": "这是一次测试通知",
                "noticeId": 2
            }
        ],
        "message": "请求成功",
        "status": "200"
    }
};
//班级消息详情页
var ClassNDetailPage = {
    // 页面初始化ajax数据请求
    classNDetailView: function () {
        common.post("/userInfo/userNews",{type:1,pageNum:1},this.classNDetailViewSuccess,this.classNDetailViewError)
    },
    //成功回调
    classNDetailViewSuccess:function (data) {
        console.log(data);
        var classNewsid=common.getUrlParams('id');
        console.log(classNewsid);
        var classNDetailTemplate = Handlebars.compile($("#classNDetail-template").html());
        var renderHTML = data.result;
        renderHTML["classNewsid"] = classNewsid;
        $('.main-content').html(classNDetailTemplate(renderHTML));
    },
    //失败回调
    classNDetailViewError:function (err) {
        alert(err);
    },
    //页面初始化
    init:function(){
        this.classNDetailView();
    }
}

$(function () {
    ClassNDetailPage.init();
    // ClassNDetailPage.classNDetailViewSuccess(ClassNewsData.payload);
});
