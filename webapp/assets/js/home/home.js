// 广告banner模拟数据
var homeBannerData = {
    "Success": true,
    "Message": "",
    "ErrCode": "",
    "Data": [
        {
            "ImgUrl": "./assets/images/home/home_03.png",
            "Target": "",
            "Link": "",
            "Alt": ""
        },
        {
            "ImgUrl": "./assets/images/home/home_03.png",
            "Target": "",
            "Link": "",
            "Alt": ""
        },
        {
            "ImgUrl": "./assets/images/home/home_03.png",
            "Target": "",
            "Link": "",
            "Alt": ""
        },
        {
            "ImgUrl": "./assets/images/home/home_03.png",
            "Target": "",
            "Link": "",
            "Alt": ""
        },
        {
            "ImgUrl": "./assets/images/home/home_03.png",
            "Target": "",
            "Link": "",
            "Alt": ""
        }
    ],
    "StartTime": "2016/12/13 13:27:16.819",
    "EndTime": "2016/12/13 13:27:16.819"
}
// 最新进度模拟数据
var data2 = {
    "success": true,
    "message": "",
    "error": "",
    "payload": {
        "result": [
            {
                "date": "2017-07-12",
                "overUnit": 2,
                "courseImg": "/assets/styles/images/course/vls1.jpg",
                "unitSize": 13,
                "name": "新时代交互英语 视听说第一级",
                "progress": 18,
                "id": 1,
                "category": 2
            }
        ], "message": "请求成功", "status": "200"
    }
};
// 我的口语伙伴模拟数据
var data4 = {
    "Success": true,
    "Message": "",
    "ErrCode": "",
    "Data": [
        {
            "id": "3a532a4f-fc5d-4775-b6f1-1e470c74e60f",
            "name": "Vicky",
            "img": "./assets/images/partner/partner1.png",
            "country": "加拿大",
            "countryImg": "./assets/images/country/country1.png",
            "num": "3"
        },
        {
            "id": "3a532a4f-fc5d-4775-b6f1-1e470c74e60f",
            "name": "Perter",
            "img": "./assets/images/partner/partner2.png",
            "country": "美国",
            "countryImg": "./assets/images/country/country2.png",
            "num": "3"
        }
    ],
    "StartTime": "2016/12/13 13:27:16.819",
    "EndTime": "2016/12/13 13:27:16.819"
};

//首页js
var home = {
    // 广告banner ajax成功回调
    bannerSuccess: function (data) {
        if (data.Success) {
            var imgs = '';
            _.each(data.Data, function (val, key) {
                imgs += '<div class="swiper-slide"><a href="javascript:void(0);"><img target="' + val.Target + '" alt="' + val.Alt + '" src="' + val.ImgUrl + '"></a></div>'
            })
            $('#homeBannerInfo').html(imgs);
            //banner轮播图
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: 'null',
                prevButton: 'null',
                paginationClickable: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false
            });
        }
    },
    // 最新进度ajax成功回调
    progressSuccess: function (data) {
        console.log(data);
        if (data.status === "200") {
            if (_.isEmpty(data.result)) {
                $('#homeProgressInfo').html('<p style="text-align:center">目前您没有在修课程~</p>');
                return;
            }
            var template = Handlebars.compile($("#homeProgressTpl").html());
            var renderHTML = template(data);
            $('#homeProgressInfo').html(renderHTML);
            $(".loading").hide();
        } else if (data.status === "514") {
            $('#homeProgressInfo').html('<p class="noCourse">~ *目前您没有在修课程* ~</p>');
            $(".loading").hide();
            return;
        }
    },
    // 我的口语伙伴ajax成功回调
    partnerSuccess: function (data) {
        $('.load').hide();
        if (_.isEmpty(data.Data)) {
            $('.my_partner .course_list_tongkao').html('<p style="text-align:center">目前您没有在修课程~</p>');
            return;
        }
        var template = Handlebars.compile($("#partnerTPLT").html());
        var renderHTML = template(data);
        $('.my_partner .course_list_tongkao').html(renderHTML);
    },
    //ajax请求失败回调
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert(JSON.stringify(XMLHttpRequest));
        //alert(textStatus);
        //alert(errorThrown);
        //$('.ajaxError').html(JSON.stringify(data));
    },
    init: function () {
        // $(".loading").show();
        // banner 图部分
        home.bannerSuccess(homeBannerData);
        // 最新进度
        common.post("/Course/getUserLastCourseInfo", null, home.progressSuccess, home.error);
    }
};

//执行初始化
$(function () {
    home.init();
});