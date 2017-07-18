//修改密码js
var ChangePassPage = {
    //绑定事件
    bindEvent:function () {
        var that=this;
        $('.confirm').click(function () {
            var oldPassword = $('.old_password').val();
            var newPassword = $('.new_password').val();
            var confirmPassword = $('.confirm_password').val();
            // console.log(typeof oldPassword)
            // console.log(oldPassword == "")
            // console.log(1)
            // if (_.isEmpty(confirmPassword) || _.isEmpty(newPassword) || _.isEmpty(oldPassword)) {
                // layer.msg('密码不能为空！');
            if ((confirmPassword == "")||(newPassword == "")||(oldPassword == "")) {
                swal("","密码不能为空！","warning");
                return;
            } else if (newPassword !== confirmPassword) {
                // layer.msg('两次输入密码不一致！');
                swal("","两次输入新密码不一致！","warning");
                return;
            } else if (newPassword == oldPassword){
                swal("","新密码未更改！","warning");
                return;
            } else {
                // parameter.OldPass = oldPassword;
                // parameter.NewPass = newPassword;
                that.savePass(oldPassword,newPassword);//调用保存方法
            }
        })

    },
    //保存修改的数据
    savePass:function (oldPassword,newPassword) {
        console.log(oldPassword);
        common.post("/userInfo/updatePassWord",{"oldPassword":oldPassword,"newPassword":newPassword},function (data) {
            if(data.status === '200'){
                // alert(data.message);
                swal("",data.message,"success").then(
                    function () {
                        window.location.href="../../login.html";
                    }
                );
            }
        },function (err) {
            // alert(err);
            swal("",err,"error");
        })
    },
    //页面初始化
    init:function(){
        this.bindEvent();
    }
}

$(function () {
    ChangePassPage.init();
});


