/**
 * Created by kevin on 2017/07/11.
 * 情景回顾
 */
var sectionContent;
var currentReviewItem = undefined;
var reviewAudioObject = undefined; // 音频播放对象
var reviewAudioPlaybackRate = 1;
var showReviewScript = 0;

function studyIncidents(studyContent) {
    sectionContent = $.parseJSON(studyContent.data);
    var mp3Recourse = sectionContent.resourceItems[sectionContent.resourceid].url
    var divs = '<div class="unit-box">' +
        '<div class="unit-box-bottom pos-relative ">' +
        '<div class="culture pos-absolute" id="cultureButton">SHOW</div>'+
        '<ul class="course-audio-speed-background">' +
        '<li data-rate="0.75"></li><li data-rate="0.85"></li>' +
        '<li data-rate="1"class="course-audio-speed-block"></li>' +
        '<li data-rate="1.15"></li><li data-rate="1.25"></li></ul>' +
        '<div class="keywordsMissing pos-absolute" id="showTextButton">TEXT</div>'+
        '</div>' +
        '<div class="review">'+
        '<div class="reviewFrame"><div id="reviewList"class="reviewContainer"></div></div>'+
        '<div class="reviewScript" id="reviewItemText"></div>'+
        '</div>'+

        '</div>' +
        '<audio id="reviewAudio" src="' + mp3Recourse + '">Your browser does not support the audio element.</audio>';
    
    $("#section").html(divs);

     createElement();
}

function createElement() {
    // 阅读题干的功能
    var direction = sectionContent.directions[0];
    $(".direction-info p").html(direction.content);
    var sentenceListObject = $("#reviewList");
    $.each(sectionContent.items, function (idx, obj) {
        sentenceListObject.append(createReviewElement(idx + 1, obj.startTime, obj.endTime, sectionContent.resourceItems[obj.normalImage].url, sectionContent.resourceItems[obj.focusImage].url, obj.content));
    });

    $("#reviewAudio").on("timeupdate", audioPlayTimeUpdate);

    // 显示文化背景
    $("#cultureButton").click(function () {
        // var culture = "<div class=\"course-cultureNotes\">" + sectionContent.note + "</div>";
        swal('Cultural',sectionContent.note);
    });

    // 显示文本的事件
    $("#showTextButton").click(function () {
        $("#reviewItemText").toggle(); // 可以尝试 toggle
        // $(this).toggleClass("");
    });

    // 调速度的事件 音频播放对象
    reviewAudioObject = $("#reviewAudio")[0];
    $(".course-audio-speed-background li").click(function () {
        reviewAudioPlaybackRate = $(this).attr("data-rate");
        reviewAudioObject.playbackRate = reviewAudioPlaybackRate;
        $(this).siblings().removeClass("course-audio-speed-block");
        $(this).addClass("course-audio-speed-block");
    });
}

/**
 * 动态创建img标签
 * @param id
 * @param startTime
 * @param endTime
 * @param normalImage
 * @param focusImage
 * @param text
 * @returns {*|jQuery|HTMLElement}
 */

function createReviewElement(id, startTime, endTime, normalImage, focusImage, text) {
    var template = '<img class="reviewItem" id="reviewItem_' + id + '" src = "' + normalImage + '" />';
    var reviewObject = $(template)
    reviewObject.data("startTime", startTime);
    reviewObject.data("endTime", endTime);
    reviewObject.data("normalImage", normalImage);
    reviewObject.data("focusImage", focusImage);
    reviewObject.data("text", text);

    // 图片点击事件
    reviewObject.click(function () {
        currentReviewItem = $(this);
        $("#reviewItemText").html(currentReviewItem.data("text"));
        reviewAudioObject.currentTime = currentReviewItem.data("startTime");
        reviewAudioObject.play();
        reviewAudioObject.playbackRate = reviewAudioPlaybackRate;
    });

    return reviewObject;
}

function audioPlayTimeUpdate() {
    if (reviewAudioObject.currentTime >= currentReviewItem.data("endTime")) {
        currentReviewItem.attr("src", currentReviewItem.data("focusImage"));
        reviewAudioObject.pause();
    }
}

