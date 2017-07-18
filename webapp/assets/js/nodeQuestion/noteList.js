//笔记列表页js
//模拟数据（笔记列表）
var NoteListPageData = {
        "success": true,
        "message": "",
        "error": "",
        "payload": {
            "result": {//笔记信息
                "71": {//某一单元下所有笔记信息
                    "item": [
                        {
                            "createTime": 1293072805,
                            "name": "中国功夫b",
                            "location": "Unit 4-12",
                            "content": "dfa"
                        },
                        {
                            "createTime": 1293075805,//创建时间
                            "name": "中国功夫a",//笔记名称
                            "location": "Unit 4-12",//位置
                            "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。床前明月光，疑是地上霜。举头望明月，低头思故乡。"//内容
                        },
                        {
                            "createTime": 1293072999,
                            "name": "中国功夫b",
                            "location": "Unit 4-12",
                            "content": "dfa"
                        }
                    ],
                    "unit": "Unit4"//单元顺序
                },
                "72": {//某一单元下所有笔记信息
                    "item": [
                        {
                            "createTime": 1294072805,//创建时间
                            "name": "中国熊猫a",//笔记名称
                            "location": "Unit 5-12",//位置
                            "content": "dfad"//内容
                        },
                        {
                            "createTime": 1263072805,
                            "name": "中国熊猫b",
                            "location": "Unit 5-12",
                            "content": "dfa"
                        }
                    ],
                    "unit": "Unit5"//单元顺序
                }
            },
            "message": "请求成功",
            "status": "200"
        }
    };
//笔记列表页
var NodeListPage = {
    //页面初始化ajax数据请求
    nodeListView: function (id) {
        common.post("/studentNews/userNoteFindByCourse", {courseId:id,pageNum:1},this.nodeListViewSuccess,this.nodeListViewError)
    },
    //成功回调
    nodeListViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var nodeListTemplate = Handlebars.compile($("#nodeList-template").html());
            var renderHTML = data;
            // var brandLHtmlNull = $('#brand-list').html().trim() === '';
            $('#brand-list').html(nodeListTemplate(renderHTML));
            //调用下拉功能
            NodeListPage.dropDown();

            var nodeHtmlNull = $('#brand-list').html().trim() === '';
            if (nodeHtmlNull) {
                $('#brand-list').html('<p style="text-align:center">此门课程您没有笔记信息~</p>');
            }
        };
    },
    //失败回调
    nodeListViewError:function (err) {
        alert(err);
    },
    // 控制 li 的“全部展开”按钮的显示和隐藏
    allButton:function () {
       var liEleArr = $("#brand-model .node-cli #node-con");
        $.each(liEleArr,function (index, item) {
            var height = $(item).height();
            var faHeight = $(item).parent().height();
            if(height<=faHeight){
               $(item).closest(".content").next(".con-footer").hide();
            }
        });
    },
    //下拉功能
    dropDown:function () {
        $(".node-section").tap(function(){
            $(this).find(".brand-name").find("span:last-child").toggleClass("transform180");
            $(this).find(".brand-name").next().slideToggle("slow");
            $(this).siblings(".node-section").find(".brand-name").find("span:last-child").removeClass("transform180");
            $(this).siblings(".node-section").find(".brand-name").next().hide();
            NodeListPage.allButton();
            NodeListPage.conmore();
            return false;
        });
    },
    //全部展开
    conmore:function(){
        $(".con-footer").tap(function () {
            $(".node-cli").css("maxHeight","none");
            $("#brand-model").height("auto");
            return false;
        })
    },
    //页面初始化
    init:function(id){
        this.nodeListView(id);
    }
}

$(function () {
    var nodeID=common.getUrlParams('id');
    console.log(nodeID);
    NodeListPage.init(nodeID);

    // NodeListPage.nodeListViewSuccess(NoteListPageData.payload);
});



/*var nodeListPage = {
    //页面初始化ajax数据请求
    nodeListView: function () {
        common.post("/studentNews/userNoteFindByCourse", null,nodeListPage.nodeListViewSuccess,nodeListPage.nodeListViewError)
    },
    //成功回调
    nodeListViewSuccess:function (data) {
        console.log(data);
        // if (data.status === '200') {
            var nodeListTemplate = Handlebars.compile($("#nodeList-template").html());
            var renderHTML = data;
            $('#node-section').html(nodeListTemplate(renderHTML));
        // };
    },
    //失败回调
    nodeListViewError:function (err) {
        alert(err);
    },
    //页面初始化
    init:function(){
        nodeListPage.nodeListView();
    }
}

$(function () {
    var obj=common.getUrlParams('id');
    console.log(obj);
    nodeListPage.nodeListViewSuccess(noteListPageData.payload.result.aaa);
    // nodeListPage.init();
});*/
