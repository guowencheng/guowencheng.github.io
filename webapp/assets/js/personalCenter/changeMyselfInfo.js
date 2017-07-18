//修改个人信息js
//模拟数据
var PerCenData = {
    "message": "请求成功",
    "status": "200",
    "result": {
        "birthday": 20170623,
        "classs": "1301班",
        "countNoRead": true,
        "department": "信息工程学院",
        "email": "56565656@qq.com",
        "face": "upicawahead20170606062006166.gif",
        "introduce": "hjdsfdsjfsdfjkdsf东风浩荡圣诞节圣诞节疯狂的开发历史",
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

var ChangeInfoPage = {
    // 页面初始化ajax数据请求
    changeInfoView: function () {
        common.post("/userInfo/selectUserInfo",null,this.changeInfoViewSuccess,this.changeInfoViewError);
    },
    //成功回调
    changeInfoViewSuccess:function (data) {
        console.log(data);
        if (data.status === '200') {
            var userInfoTemplate = Handlebars.compile($("#userInfo-template").html());
            var userData = data.result;
            $('.main_content').html(userInfoTemplate(userData));
            ChangeInfoPage.bindEvent(userData);
        };
    },
    //失败回调
    changeInfoViewError:function (err) {
        alert(err);
    },
    //绑定事件
    bindEvent:function (userData) {
        // console.log(userData.birthday);
        var that=this;
        //编辑出生日期
        $('.birthdate a').tap(function () {
            var flag = $(this).attr('flag');
            var birthday = userData.birthday;// 未修改前的数据
            // var _birthday = birthday.toString().replace(/(\d{4})(\d{2})(\d{2})/mg, '$1-$2-$3');
            // console.log(birthday);
            var new_birthday = $('.birthdate input').val();//获取输入框的值
            // var save_birthday = $('.birthdate input').val().replace(/(\d{4}).(\d{2}).(\d{2}).+/mg, '$1$2$3');//传给后台的值
            var show_birthday = $('.birthdate input').val().replace(/(\d{4})(\d{2})(\d{2})+/mg, '$1-$2-$3');//显示的值
            // var regBirthday = /^((19|20)[0-9]{2}).((02.(0[1-9]|1[0-9]|2[0-8]))|((0[13578]|1[02]).(0[1-9]|[12][0-9]|3[01]))|((0[469]|11).(0[1-9]|[12][0-9]|30)))$/;
            // console.log(new_birthday);
                var regBirthday = /^((19|20)[0-9]{2})((02-(0[1-9]|1[0-9]|2[0-8]))|((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30)))$/;
            if(flag == 1){
                $(this).attr('flag', 0).addClass('save');
                // $('.birthdate input').addClass('edit').attr('disabled',false);
                $('.birthdate input').addClass('edit').removeAttr('disabled');
                $('.birthdate input').val(userData.birthday);
            } else {
                if (new_birthday == birthday) {
                    $(this).attr('flag', 1).removeClass('save');
                    $('.birthdate input').removeClass('edit').attr('disabled', 'disabled').val(show_birthday);
                    return;
                } else if (new_birthday != "" && !regBirthday.test(new_birthday)) {
                    // alert('出生日期位数不正确，应为八位数数字！');
                    swal("","请填写正确八位数字出生日期！","warning");
                    $('.birthdate input').val(birthday);
                    return;
                }else{
                    $('.birthdate input').val(show_birthday);
                    $('.birthdate input').removeClass('edit').attr('disabled', 'disabled');
                    $(this).attr('flag', 1).removeClass('save');
                    that.saveDate(new_birthday,"","","");//调用保存方法
                    that.changeInfoView();//刷新页面
                }
            }
            return false;
        })
        //编辑电话号码
        $('.moblie a').tap(function () {
            var flag = $(this).attr('flag');
            var moblie = userData.moblie;// 未修改前的数据
            var new_moblie = $('.moblie input').val();
            var regMoblie = /^1[3|4|5|7|8][0-9]{9}$/;
            if(flag == 1){
                $(this).attr('flag', 0).addClass('save');
                $('.moblie input').addClass('edit').removeAttr('disabled');
            } else {
                if (new_moblie == moblie) {
                    $(this).attr('flag', 1).removeClass('save');
                    $('.moblie input').removeClass('edit').attr('disabled', 'disabled');
                    return;
                } else if (new_moblie != "" && !regMoblie.test(new_moblie)) {
                    swal("","请填写正确的手机号码！","warning");
                    $('.moblie input').val(moblie);
                    return;
                }else{
                    $('.moblie input').val(new_moblie);
                    $('.moblie input').removeClass('edit').attr('disabled', 'disabled');
                    $(this).attr('flag', 1).removeClass('save');
                    that.saveDate("",new_moblie,"","");//调用保存方法
                    that.changeInfoView();//刷新页面
                }
            }
            return false;
        })
        //编辑邮箱
        $('.email a').tap(function () {
            var flag = $(this).attr('flag');
            var email = userData.email;// 未修改前的数据
            var new_email = $('.email input').val();
            var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if(flag == 1){
                $(this).attr('flag', 0).addClass('save');
                // $('.email input').addClass('edit').attr('disabled',false);
                $('.email input').addClass('edit').removeAttr('disabled');
            } else {
                if (new_email == email) {
                    $(this).attr('flag', 1).removeClass('save');
                    $('.email input').removeClass('edit').attr('disabled', 'disabled');
                    return;
                } else if (new_email != "" && !regEmail.test(new_email)) {
                    // alert('格式不正确！');
                    swal("","请填写正确的邮箱地址！","warning");
                    $('.email input').val(email);
                    return;
                }else{
                    $('.email input').val(new_email);
                    $('.email input').removeClass('edit').attr('disabled', 'disabled');
                    $(this).attr('flag', 1).removeClass('save');
                    that.saveDate("","",new_email,"");//调用保存方法
                    that.changeInfoView();//刷新页面
                }
            }
            return false;
        })
        //编辑个人介绍
        $('.personalIntroduc a').tap(function () {
            var flag = $(this).attr('flag');
            var introduce = userData.introduce;// 未修改前的数据
            if (flag == 1) {
                $(this).attr('flag', 0).addClass('save');
                swal({
                    input: 'textarea',
                    // showCancelButton: true,
                    inputValue:introduce,
                }).then(function(result) {
                    if(result == introduce){
                        $('.personalIntroduc a').attr('flag', 1).removeClass('save');
                        return;
                    }else{
                        var new_introduce = result;
                        $('.personalIntroduc input').val(result);
                        $('.personalIntroduc a').attr('flag', 1).removeClass('save');
                        that.saveDate("","","",new_introduce);//调用保存方法
                        that.changeInfoView();//刷新页面
                    }
                })
            }
            return false;
        })
    },
    //修改后数据提交请求
    saveDate:function (new_birthday,new_moblie,new_email,new_introduce) {
        common.post("/userInfo/updateUserInfo",{"birthday":new_birthday,"moblie":new_moblie,"email":new_email,"introduce":new_introduce},function (data) {
            if(data.status === '200'){
                swal("","您已修改成功！","success");
            }
        },function (err) {
            swal("",err,"error");
        })
        /*一版本
        var birthdate = $('.birthdate input').val() || "";
        var moblie = $('.moblie input').val() || "";
        var email = $('.email input').val() || "";
        var introduce = $('.personalIntroduc input').val() || "";
        common.post("/userInfo/updateUserInfo",{"birthday":birthdate,"moblie":moblie,"email":email,"introduce":introduce},function (data) {
            if(data.status === '200'){
                // alert(data.message);
                swal("",data.message,"success");
            }
        },function (err) {
            // alert(err);
            swal("",err,"error");
        })*/
    },
    //页面初始化
    init:function(){
        this.changeInfoView();
    }
}

$(function () {
    ChangeInfoPage.init();
    // ChangeInfoPage.changeInfoViewSuccess(PerCenData);
});

