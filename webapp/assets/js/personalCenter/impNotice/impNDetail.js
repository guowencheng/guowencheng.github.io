//详情通知js
/*
var noticeDetail = noticeDetail || {};


//失败回调
function error(data) {
    console.log(data)
}

//初始化方法
noticeDetail.init = function () {
    var template = Handlebars.compile($("#detailTPLT").html());
    var renderHTML = template(data1);
    var html = '';
    $('.main-content').html(renderHTML);
    if (_.isEmpty(data1.Data)) {
        return;
    }
    _.each(data1.Data.File, function (val, key) {
        html += '<a style="display:block;margin:10px auto;" href=' + val + '>附件' + (key + 1) + '</a>';
    })
    $('.content').append(html);
}
//执行初始化
noticeDetail.init();*/

//模拟数据
var ImpNDetailData = {
    "result": [//返回结果详细信息
        {
            "MESSAGEID": 321208.0,
            "content":"具体通知aaa",
            "createTime":"2017-07-03 11:23:00",
            "title":"测试数据aaa",
            "top":true
        },
        {
            "MESSAGEID": 321209.0,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        }
    ],
    "message": "请求成功",
    "status": "200"
};

var ImpNDetailPage = {
    pageNum:1,
    // 页面初始化ajax数据请求
    impNDetailView: function () {
        common.post("/userInfo/studentNoticeSelcet",{pageNum:this.pageNum},this.impNDetailViewSuccess,this.impNDetailViewError)
    },
    //成功回调
    impNDetailViewSuccess:function (data) {
        console.log(data);
        var impNid=common.getUrlParams('id');
        console.log(impNid);

        var impNDetailTemplate = Handlebars.compile($("#impNDetail-template").html());
        var renderHTML = data.result;
        renderHTML["impNid"] = impNid;
        $('.main-content').html(impNDetailTemplate(renderHTML));
    },
    //失败回调
    impNDetailViewError:function (err) {
        alert(err);
    },
    //页面初始化
    init:function(){
        this.impNDetailView();
    }
}

$(function () {
    ImpNDetailPage.init();
    // ImpNDetailPage.impNDetailViewSuccess(ImpNDetailData);
});
