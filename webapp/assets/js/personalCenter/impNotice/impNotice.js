//重要通知js
/*
var importantNotice = importantNotice || {};

//显示课程列表
function coursesShow(data) {
    $('.loading').hide();
    var template = Handlebars.compile($("#noticeListTPLT").html());
    var renderHTML = template(data);
    $('.notice-list').html(renderHTML);
}
//失败回调
function error(data) {
    console.log(data)
}

//初始化方法
importantNotice.init = function () {
    //$('.loading').show();
    if (_.isEmpty(data1.Data)) {
        $('.none-content').show();
        return;
    }
    coursesShow(data1);
}
//执行初始化
importantNotice.init();*/

//模拟数据
var ImpNoticePageData = {
    "result": [//返回结果详细信息
        {
            "id": 3,
            "content":"具体通知aaa",
            "createTime":"2017-07-03 11:23:00",
            "title":"测试数据aaa",
            "top":true
        },{
            "id": 2,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 4,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 5,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 1,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 6,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 7,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 8,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 9,
            "content":"具体通知bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 10,
            "content":"具体通知ccc关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        },{
            "id": 11,
            "content":"具体通知ddd关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "createTime":"2017-08-03 11:23:00",
            "title":"测试数据bbb关于做好在校生新学期（2016年秋季）开学准备工作的通知",
            "top":true
        }
    ],
    "message": "请求成功",
    "status": "200"
};

var ImpNoticePage = {
    iScrollFlag: true,
    pageNum:1,
    // 页面初始化ajax数据请求
    impNoticeView: function () {
        common.post("/userInfo/studentNoticeSelcet",{pageNum:this.pageNum},this.impNoticeViewSuccess,this.impNoticeViewError)
    },
    //成功回调
    impNoticeViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var impNoticeTemplate = Handlebars.compile($("#impNotice-template").html());
            var renderHTML = data.result;
            $('.notice-list').html(impNoticeTemplate(renderHTML));
            ImpNoticePage.impScroll = new IScroll(".scroll-wrapper",{
                mouseWheel: true,
                scrollbars:true,
                click:true//设置不让点击事件失效
            });
            ImpNoticePage.bindEvent();
        };
        if(data.status === '506'){
            swal("","暂无学校公告通知","warning").then(function () {
                window.history.go(-1);
            });
        }
    },
    moreView: function () {
        common.post("/userInfo/studentNoticeSelcet",{pageNum:this.pageNum+1},function (data) {
            console.log(data);
            if (data.status === '200') {
                var impNoticeTemplate = Handlebars.compile($("#impNotice-template").html());
                var renderHTML = data.result;
                $('.notice-list').append(impNoticeTemplate(renderHTML));
                if (!data.result.isLastPage) {
                    ImpNoticePage.pageNum++;
                }else {
                    ImpNoticePage.iScrollFlag = false;
                }
                ImpNoticePage.impScroll.refresh();//让IScroll更新滚动区域
            };
        },this.impNoticeViewError)
    },
    //失败回调
    impNoticeViewError:function (err) {
        alert(err);
    },
    //加载更多（滑动事件）
    bindEvent:function () {
        this.impScroll.on("scrollEnd",function (){
            if(this.y == this.maxScrollY){//滑动到底部
                // alert(ImpNoticePage.iScrollFlag);
                if(ImpNoticePage.iScrollFlag){
                    ImpNoticePage.moreView();//发送ajax请求
                }else{
                    return;
                }
            }
        })
    },
    //页面初始化
    init:function(){
        this.impNoticeView();
        // ImpNoticePage.bindEvent();
        /*this.impScroll = new IScroll(".scroll-wrapper",{
            mouseWheel: true,
            scrollbars:true,
            click:true//设置不让点击事件失效
        });*/
    }
}

$(function () {
    ImpNoticePage.init();
    // ImpNoticePage.impNoticeViewSuccess(ImpNoticePageData);
});
