//公共js

//公共对象
var common = common || {};

var userInfo = {
    "StudentCode":"eolYkMQcs2QrH%2BUOyyhv6R2xgANtBI5cVTgKcQJwNs0%3D",
    "UniversityStuNo":"101011010998",
    "RecruitBatchID":121,
    "UniversityCode":"99999",
    "LcenterCode":"00001",
    "LevelID":43,
    "SpecialityID":53,
    "UserID":2104,
    "LoginName":"laoli123",
    "RealName":"测试用户",
    "Email":"laoli123@open.com.cn",
    "QQ":"",
    "Sex":"01",
    "MobilePhone":"13910663949",
    "OpenStudentCardNo":"999990000558",
    "isloginLearningBar":0
}


//清除登录缓存
common.clearLoginCookie = function(){
    /*Cookies.remove('userName');
    Cookies.remove('passWord');
    Cookies.remove('studentcode');
    Cookies.remove('userInfo');*/
};

//不刷页面修改url参数
common.changeURLPar = function(destiny, par, par_value) {
    var pattern = par + '=([^&]*)';
    var replaceText = par + '=' + par_value;
    if (destiny.match(pattern)) {
        var tmp = '/\\' + par + '=[^&]*/';
        tmp = destiny.replace(eval(tmp), replaceText);
        return (tmp);
    } else {
        if (destiny.match('[\?]')) {
            return destiny + '&' + replaceText;
        } else {
            return destiny + '?' + replaceText;
        }
    }
    return destiny + '\n' + par + '\n' + par_value;
}

//封装跳转
/*common.href = function (url, param, studentCodeIsHave) {
    if (!_.isEmpty(param)) {
        _.each(param, function (val, key) {
            if (url.indexOf('?') >= 0) {
                if (val.length == 1) {
                    if (val[0] == 'partnerId') {
                        url = url + "&partnerId=" + JSON.parse(Cookies.get('userInfo')).StudentCode;
                    } else {
                        url = url + "&" + val[0] + "=" + common.GetParameter(val[0]);
                    }
                } else {
                    url = url + "&" + val[0] + "=" + val[1];
                }
                //if (val == 'sysNum') {
                //    url = url + "&sysNum=8172422beeb84b25afba9b333e0328e2";
                //} else if (val == 'partnerId') {
                //    url = url + "&partnerId=" + JSON.parse(Cookies.get('userInfo')).StudentCode;
                //} else if (type == 'number') {
                //    url = url + "&iMessageID=" + val;
                //}  else {
                //    url = url + "&" + val + "=" + common.GetParameter(val);
                //}
            } else {
                if (val.length == 1) {
                    if (val[0] == 'partnerId') {
                        url = url + "?partnerId=" + JSON.parse(Cookies.get('userInfo')).StudentCode;
                    }
                    url = url + "?" + val[0] + "=" + common.GetParameter(val[0]);
                } else {
                    url = url + "?" + val[0] + "=" + val[1];
                }
                //if (val == 'sysNum') {
                //    url = url + "?sysNum=8172422beeb84b25afba9b333e0328e2";
                //} else if (val == 'partnerId') {
                //    url = url + "?partnerId=" + JSON.parse(Cookies.get('userInfo')).StudentCode;
                //} else if (type == 'number') {
                //    url = url + "?" + val[0] + "=" + val[1];
                //} else {
                //    url = url + "?" + val + "=" + common.GetParameter(val);
                //}
            }
        })
    }
    if(url.indexOf('bust')<0){
        if (url.indexOf('?') >= 0)
            url = url + "&bust=" + (new Date()).getTime();
        else
            url = url + "?bust=" + (new Date()).getTime();
    }
    //var userinfo = Cookie.get('userInfo');
    if (studentCodeIsHave == 1) {
        if (url.indexOf('StudentCode') < 0) {
            if (url.indexOf('?') >= 0)
                url = url + "&StudentCode=" + common.GetParameter('StudentCode');
            else
                url = url + "?StudentCode=" + common.GetParameter('StudentCode');
        }
    }
    location.href = url;
};*/

//检查cookie是否登录
/*common.checkLoginCookie = function() {
    if(_.isEmpty(Cookies.get('userInfo'))){
        location.href = '/Login/index/';
    }
};*/

//url 随机数
common.fixWXhref = function() {
    // $('a').each(function(){
    //     var url = $(this).attr('href');
    //     if(url.indexOf('bust')<0){
    //         if (url.indexOf('?') >= 0)
    //             url = url + "&bust=" + (new Date()).getTime();
    //         else
    //             url = url + "?bust=" + (new Date()).getTime();
    //         $(this).attr('href',url);
    //     }
    // });
};

//ajax封装
common.call = function (url, data, type, successCallback, errorCallback, jsonData) {
    //默认参数
    var defaults = {
        type: 'get',
        dataType: 'json',
        // jsonp: 'callback',
        async: true,
        cache: false,
        // xhrFields: {
        //     withCredentials: true
        // },
        // crossDomain: true,
        title: 'defaultTitle',
        timeout: 20000,
        error: function () { },
        success: function () { }
    };
   
    //{传入参数
    var options = {
        url: url,
        type: type,
        data: data,
        //async: async,
        error: errorCallback,
        success: successCallback
    };
    //与传入参数合并
    var settings = $.extend({}, defaults, options);
    //判断是否是jsonp
    if (settings.dataType.toLowerCase() == "jsonp") {
        if (settings.url.indexOf('?') >= 0)
            settings.url = settings.url + "&callback=?";
        else
            settings.url = settings.url + "?callback=?";
    }
    if (settings.url.indexOf('?') >= 0)
        settings.url = settings.url + "&bust=" + (new Date()).getTime();
    else
        settings.url = settings.url + "?bust=" + (new Date()).getTime();

    //var request = $.ajax(options);
    if (!_.isEmpty(jsonData) && jsonData.Success!=undefined) {
        if (typeof settings.success === "function") {
            settings.success(jsonData);
        }
        return;
    }
    
    //开始执行ajax
    $.ajax({
        type: settings.type,
        dataType: settings.dataType,
        async: settings.async,
        // jsonp: settings.jsonp,
        cache: settings.cache,
        // xhrFields: settings.xhrFields,
        // crossDomain: settings.crossDomain,
        url: settings.url,
        data: settings.data,
        timeout: 60000,
        
        success: function (resp) { //成功
            if (typeof settings.success === "function") {
                settings.success(resp);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { //失败
            // bootbox.alert('error:'+textStatus+errorThrown);
            if (typeof settings.error === "function") settings.error(XMLHttpRequest, textStatus, errorThrown);
        }
    });
};

/**
 * 地址栏根据参数名获取值
 * @param {[type]} name [description]
 */
common.GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/**
 * 获取url需要传的参数
 */
common.GetParameter = function (name) {
    //var userInfo = JSON.parse(Cookies.get('userInfo'));
    var QueryStringParameter = encodeURIComponent(common.GetQueryString(name));
    if (!_.isEmpty(QueryStringParameter) && QueryStringParameter != 'null') {
        return QueryStringParameter;
    } else {
        var parameter = "";
        $.each(userInfo, function (key, val) {
            if (name == key) {
                parameter = val;
            }
        });
        return parameter;
    }
}

//注册一个翻译用的Helper，
Handlebars.registerHelper("tfDateTime", function (value) {
    var datetemp = formatDate(value, "yyyy-MM-dd HH:mm:ss");
    if (datetemp == null) {
        datetemp = "";
    }
    return datetemp;
});
//注册一个翻译用的Helper，
Handlebars.registerHelper("tfDate", function (value) {
    var datetemp = formatDate(value, "yyyy-MM-dd");
    if (datetemp == null) {
        datetemp = "";
    }
    return datetemp;
});

//转换选项编号
Handlebars.registerHelper("tfLetter", function (value) {
    switch (value) {
        case 0: return "A";
        case 1: return "B";
        case 2: return "C";
        case 3: return "D";
        case 4: return "E";
        case 5: return "F";
        case 6: return "G";
        case 7: return "H";
    }
});



function formatDate(date, format) {
    if (!date) return;
    if (!format) format = "yyyy-MM-dd";

    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/g, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }

    if (!date instanceof Date) return;
    if (date == "Invalid Date") return;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S":  this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Handlebars.registerHelper("Equal", function (v1, v2, options) {
    if (v1 == v2) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});



//登录跳转
common.init = function () {
    var flag = Cookies.get('userInfo');
    if (location.href.indexOf('/FreeLogin') > 0 || location.href.indexOf('/StudentCheck') > 0 || location.href.indexOf('/ChangePassword') > 0 || location.href.indexOf('/ForgetPassword') > 0 || location.href.indexOf('/UserRegister') > 0 || location.href.indexOf('/ThirdView') > 0) {
        return;
    };
    if (_.isEmpty(flag) && location.href.indexOf('/Login/index') < 0) {
       location.href = '/Login/index/';
   }
}
$(function(){
    common.fixWXhref();
});

//执行初始化
//common.init();