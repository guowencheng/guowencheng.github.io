/**
 * public tools file
 * @type {{}}
 */
//公共对象
var common = {};
var Handlebars = Handlebars || {};
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

//清除登录缓存
common.clearLoginCookie = function(){
    Cookies.remove('userName');
    Cookies.remove('passWord');
    Cookies.remove('sessionId');
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

/**
 * ajax封装
 */
common.ajax = function (url, data, type, successCallback, errorCallback) {
    // api 接口访问地址
    var baseURL = "http://17382hi539.iask.in:18838/app";
    //默认参数
    var defaults = {
        type: 'get',
        dataType: 'json',
        async: true,
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        context: $('body'),
        timeout: 60000,
        success: function () { },
        error: function () { }
    };
    // 传入参数
    var options = {
        url: url,
        type: type,
        data: data,
        success: function (data) {
            if(data.success) {
                if ($.type(successCallback) === "function") {
                    successCallback(data.payload);
                }
            } else  {
                window.history.go(-1);
            }
        },
        error: function (xhr, type) {
            swal({
                title: "NOT  FOUND",
                text: "OMG！页面走丢了，我帮你去找找啊……",
                timer: 2000
            }).then(function () {
                window.location.href = "/webapp/login.html";
            }, function () {
                window.location.href = "/webapp/login.html";
            });
            // if ($.type(errorCallback) === "function") {
            //     errorCallback(xhr,type);
            // }
        }
    };
    //与传入参数合并
    var settings = $.extend({}, defaults, options);
    //开始执行ajax
    settings.url = (baseURL || '') + settings.url;  // 拼接baseUrl
    $.ajax(settings);                                // 执行
};
/**
 * ajax - post 请求
 */
common.post = function(url, data,successCallback, errorCallback) {
    common.ajax(url, data,"post", successCallback, errorCallback);
}
/**
 * ajax - get 请求
 */
common.get = function(url, data, successCallback, errorCallback) {
    common.ajax(url, data, "get",successCallback, errorCallback);
}


/**
 * 获取地址栏参数
 * @param {[type]} name [description]
 */
common.getUrlParams = function(name) {
    var searchStr= window.location.search.substr(1);
    var searchArr = searchStr.split("&");
    var tempObj = {};
    searchArr.forEach(function (item,index) {
        var tempArr = item.split("=");
        tempObj[tempArr[0]] = tempArr[1];
    })
    if(name && tempObj[name]){
        return tempObj[name];
    }
    return tempObj;
}
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
};
/**
 * 比较大小
 */
Handlebars.registerHelper("Equal", function (v1, v2, options) {
    if (v1 == v2) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});
/**
 * 是否大于
 */
Handlebars.registerHelper("greaterThan", function (v1, v2, options) {
    var v1 = parseInt(v1);
    var v2 = parseInt(v2);
    if (v1 < v2) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});

/**
 * index +1
 */
Handlebars.registerHelper("addOne",function(index){
    index = parseInt(index);
    //返回+1之后的结果
    return index+1;
});

/**
 * 转换选项
 */
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

/**
 * input 替换 <textentry></textentry>
 */
Handlebars.registerHelper("tfInput", function (str, name) {
   var newStr = str.replace(/<textentry><\/textentry>/g,'<input type="text" name="'+name+'" value="">');
    return newStr;
});

/**
 * 属性判断
 */
Handlebars.registerHelper("hasAttr",function(attr,options){
    if (attr) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});

/**
 * 生日替换
 */
Handlebars.registerHelper("birthInput", function (value) {
    var str = value.toString().replace(/(\d{4})(\d{2})(\d{2})+/mg, '$1-$2-$3');
    return str;
});

/**
 * 日期精简
 */
Handlebars.registerHelper("dateSimple", function (value) {
    var str = value.toString().replace(/(\d{4}).(\d{2}).(\d{2}).+/mg, '$1/$2/$3');
    return str;
});


/**
 * 时间戳转换
 */
Handlebars.registerHelper("localTime",function(nS){
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\/|年|月/g, "-").replace(/日/g, " ").replace(/:\d{1,2}$/,' ');
});

//rem屏幕适配
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {

            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    /*DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
})(document, window);

/**
 * Zepto 的 slide 插件
 */

;(function ($) {
    /**
     * 控制开关
     */
    $.mySlideFlag = true; //
    /**
     * 下拉功能实现
     */
    $.fn.slideDown = function (duration,callback) {
        // 获取元素原来的位置信息
        var position = this.css('position');
        // 如果元素是 display:none 让元素显示,
        this.show();
        // 显示之后瞬间隐藏
        this.css({
            position: 'absolute',
            visibility: 'hidden'
        });
        // 获取元素的自然高度
        var height = this.height();
        // 重新设定元素的相关属性
        this.css({
            position: position,
            visibility: 'visible',
            overflow: 'hidden',
            height: 0
        });
        // 启动下拉动画
        var that = this;
        var timer = setTimeout(function() {
            that.animate({
                height: height
            }, duration , function () {
                $.mySlideFlag = true;
                clearTimeout(timer);
                callback && callback();
            });
        }, 0);

    };
    /**
     * 上拉功能
     */
    $.fn.slideUp = function (duration,callback) {
        // 获取元素的自然高度
        var heightEle = this.height();
        // 重新设定元素的相关属性
        this.css({
            overflow: 'hidden',
            height: heightEle
        });
        // 设置上拉动画
        var that = this;
        var timer = setTimeout(function() {
            that.animate({
                height: 0,
            }, duration,function(){
                that.height(heightEle);
                that.hide();
                $.mySlideFlag = true;
                clearTimeout(timer);
                callback && callback();
            });
        }, 0);
    };
    /**
     * 循环触发器
     */
    $.fn.slideToggle = function (duration,callback) {
        var displayAttr = this.css('display');
        var height = this.height();
        if ($.mySlideFlag && displayAttr === "none") {
            $.mySlideFlag = false;
            this.slideDown(duration,callback);
        } else if ($.mySlideFlag && height && height !== '0') {
            $.mySlideFlag = false;
            this.slideUp(duration,callback);
        } else {
            return ;
        }
    };
})(Zepto);


/**
 * myScore 部分的私有 api start
 */
var questionType = {
    listeningScore: "听力得分",
    vocabularyScore: "词汇得分",
    grammarScore: "语法得分",
    spellingScore: "拼写得分",
    speakingScore: "口语得分",
    pronunciationScore  : "发音得分",
    phrasesScore: "短语得分",
    correctionScore: "矫正得分",
    readingComprehensionScore  : "阅读得分",
    writingScore: "写作得分",
    translationScore: "翻译得分",
    clozeScore: "完形填空",
    vocabularyStructureScore: "词汇与结构",
    wordsPhrasesScore : "单词与短语",
    wordsScore: "单词得分",
    discourseExerciseScore: "完形填空",

    cycleindex: "测试次数",
    testStatusName: "测试状态",
    time: "测试日期",
};
common.getNewScore = function (data) {
    var tempArr = [];
    for(var key in questionType){
        var tempObj = {};
        if(data[key]){
            tempObj["type"] = questionType[key];
            tempObj["value"] = data[key];
            tempArr.push(tempObj);
        }
    }
    return tempArr;
};

/**
 * myScore 部分的私有 api end
 */

