//我的消息详情js
//模拟数据（我的消息详情）
var MyNewsData = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "messageList": [
            {
                "content":"看到来了了看到来了了看到来了了看到来了了看到来了了看到来了了看到来了了看到来了了看到来了了",
                "createTime": "2017/07/03 11:23:00",
                "fromuser": "教师a",
                "id": 5,
                "readed":false,
                "touser":"郭文超",
                "type":"user",
                "typeName":"个人"
            },
            {
                "content":"速度符合实际得分和康师傅",
                "createTime": "2017-07-03 11:34",
                "fromuser": "教师a",
                "id": 4,
                "readed":true,
                "touser":"郭文超",
                "type":"user",
                "typeName":"个人"
            },
            {
                "content":"水电费经理说了都快疯掉了",
                "createTime": "2017/07/03 11:23:00",
                "fromuser": "教师a",
                "id": 3,
                "readed":true,
                "touser":"郭文超",
                "type":"user",
                "typeName":"个人"
            }
        ],
        "message": "请求成功",
        "status": "200"
    }
};
//我的消息详情页
var MyNDetailPage = {
    // 页面初始化ajax数据请求
    myNDetailView: function () {
        common.post("/userInfo/userNews",{type:2,pageNum:1},this.myNDetailViewSuccess,this.myNDetailViewError)
    },
    //成功回调
    myNDetailViewSuccess:function (data) {
        console.log(data);
        var myNewsid=common.getUrlParams('id');
        console.log(myNewsid);
        var myNDetailTemplate = Handlebars.compile($("#myNDetail-template").html());
        var renderHTML = data.result;
        renderHTML["myNewsid"] = myNewsid;
        $('.main-content').html(myNDetailTemplate(renderHTML));
    },
    //失败回调
    myNDetailViewError:function (err) {
        alert(err);
    },
    //页面初始化
    init:function(){
        this.myNDetailView();
    }
}

$(function () {
    MyNDetailPage.init();
    // MyNDetailPage.myNDetailViewSuccess(MyNewsData.payload);
});
