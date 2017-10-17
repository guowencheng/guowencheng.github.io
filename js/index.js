$(function () {
    if ($(".filling_Info")) {
        perINfo.init();
    } 
    if ($(".MHI")) {
        MHInsurance.init();
    }      
});
// 投保和被保人信息
var perINfo = {
    clickEvens: function () {
        // 下载电子档案表格按钮
        $(".load_form").on("click",function () {
            $(this).find(".check_dot").toggleClass("check_load");
        });
        // 选择证件类型的 箭头特效
        $(".select_icon").on("click",function () {
            $(this).next(".form_Rlabel").toggleClass("trans90");            
            return false;
        });
        $(".select_icon").on("blur",function () {
            $(this).next(".form_Rlabel").toggleClass("trans90");
        });
        // 页面跳转
        $(".button_sub").on("click",function(){
            window.location.href = "./MHInsurance.html"
        })          
    },
    init: function () {
        this.clickEvens();
    }
};
// 百万医疗保险页面
var MHInsurance = {
    swiper: function () {
        // 中间 tab
        var swiperSlide = $("#tabs-container .swiper-slide");
        var tabsSwiper = new Swiper('#tabs-container', {
            speed: 500,
            onSlideChangeStart: function () {
                var activeIndex = tabsSwiper.activeIndex;
                $(".MHI_tabs .active").removeClass('active');
                $(".MHI_tabs span").eq(activeIndex).addClass('active');
                // 动态设置高度
                var hg = swiperSlide.eq(activeIndex).find(".item").height();
                swiperSlide.height(hg);
            }
        })
        $(".MHI_tabs span").on('touchstart mousedown', function (e) {
            e.preventDefault()
            var index = $(this).index();
            $(".MHI_tabs .active").removeClass('active');
            $(this).addClass('active');
            // 动态设置高度
            var hg = swiperSlide.eq(index).find(".item").height();
            swiperSlide.height(hg);


            tabsSwiper.slideTo(index);
            //alert(hg);
        })
        $(".MHI_tabs span").click(function (e) {
            e.preventDefault()
        });
        // 立即投保按钮功能
        $(".submitNow").on("click",function () {
            tabsSwiper.slideTo(1);
            return false;
        });
    },
    init: function () {
        this.swiper();
    }
}