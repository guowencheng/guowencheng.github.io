//登录页js
var login = {
    //登录
    loginIn: function () {
        var that = this;
        var usernameEle = $('#username');
        var passwordEle = $('#password');
        var loginSubMit = $('.login-submit');
        if (!_.isEmpty(Cookies.get('userName')) || !_.isEmpty(Cookies.get('passWord'))) {
            usernameEle.val(Cookies.get('userName') || null);
            passwordEle.val(Cookies.get('passWord') || null);
        }
        // 为登陆按钮绑定点击登录事件
        loginSubMit.on("click", function () {
            that.subMitLogin(usernameEle, passwordEle, loginSubMit);
        });
        //回车登录
        $("body").keydown(function (event) {
            if (event.keyCode == 13) that.subMitLogin(usernameEle, passwordEle, loginSubMit);
        });
    },
    // 登录执行函数
    subMitLogin: function (usernameEle, passwordEle, loginSubMit) {
        if (!usernameEle.val() || !passwordEle.val()) {
            swal("","请输入用户名或密码","warning");
            return;
        }
        var that = this;
        var username = usernameEle.val();
        var password = passwordEle.val();
        common.clearLoginCookie();
        Cookies.set('userName', username);
        // Cookies.set('passWord', password);
        var data = {
            userName: username,
            passWord: password
        }
        loginSubMit.text('登录中...');
        common.post("/userLogin/login", data, that.loginSucess,that.loginError);
    },
    //成功回调
    loginSucess: function (data) {
        if(data.status === '200') {
            $('.login-submit').text('登 录');
            window.location.href = "/webapp/index.html";
        } else {
            $('.login-submit').text('登 录');
            swal("",data.message,"warning");
        }
    },
    //失败回调
    loginError: function (data) {
        $('.login-submit').text('登 录');
    },
    //初始化方法
    init: function () {
        this.loginIn();
    }
};

$(function () {
    //执行初始化
    login.init();
});




