// 预约课程详情页
var CourseDescPage = {
    // 可预约页面初始化ajax数据请求
    courseDescView: function (id) {
        common.post("/subscribeClass/findSubscribeById", {Integer:'int',id:id},this.courseDescSuccess,this.courseDescError)
    },
    //成功回调
    courseDescSuccess:function (data) {
        console.log(data);
        var descTemplate = Handlebars.compile($("#descList-template").html());
        var renderHTML = data;
        $('#descList').html(descTemplate(renderHTML));
    },
    //失败回调
    courseDescError:function (err) {
        alert(err);
    },
    //事件绑定
    bindEvent:function (id) {
        $('#war').on('tap',function () {
            common.post("/subscribeClass/cancleSubscribe", {Integer:'int',subscribeClassId:id},function (data) {
                swal("",data,"success").then(function () {
                    window.location.href="./subCourse.html";
                });
            },function (err) {
                swal("",err,"error");
            });
            return false;
        })
    },
    //页面初始化
    init:function(id){
        this.courseDescView(id);
        this.bindEvent(id);
    }
}

$(function () {
    // var obj=common.getUrlParams().id;
    var subId=common.getUrlParams('id');
    console.log(subId);
    CourseDescPage.init(subId);
});

/*$(function(){
 var id=window.location.search.split("=")[1];
 //        预约详情ajax请求
 var courseDescPage = {
 courseDescView: function () {
 common.post("/subscribeClass/findSubscribeById", {Integer:'int',id:16}, function (data) {
 console.log(data);
 var descTemplate = Handlebars.compile($("#descList-template").html());
 var renderHTML = data;
 $('#descList').html(descTemplate(renderHTML));
 })
 }
 };
 courseDescPage.courseDescView();
 /!*$("#war").click(function(){
 layer.alert('您已成功预约此课程',function(){
 window.location.href="../AboutTheclass/index.html";
 })
 })*!/
 });*/