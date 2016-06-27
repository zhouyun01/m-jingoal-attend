$(function() {
    $('#slides_schedule').slidesjs({
        width: 354,
        height: 232,
        navigation: false,
        titleArr: ['班次调整灵活，可随时变更安排', '支持多种类型排班，可按周自动循环'],
        play: {
            effect: 'fade'
        }
    });
    $('#slides_finger').slidesjs({
        width: 354,
        height: 272,
        navigation: false,
        titleArr: ['中控指纹考勤机', '真地指纹考勤机', '浩顺指纹考勤机'],
        play: {
            effect: 'fade'
        }
    });
    $('#slides_finger').on('click', 'img', function(e) {
        ActionRecord.clickFinger();
        window.location.href = 'introduction.html?token=12';
        e.stopPropagation();
    });

    $('#js-playVideo').on('click', function() {
        if (!$('.alt_dialog')[0]) {
            var htmlStr = '<div class="alt_dialog">' + '<div class="dialog_layout">' + '<div class="close">' + '<img src="dist/assets/images/close.png">' + '</div>' + '<div class="video_content" id="playvideo">' + '</div></div></div>';
            $('body').append(htmlStr);
            setPlayerSize();
            $('.alt_dialog').show();
        } else {
            $('.alt_dialog').show();
        }
        showYouku('playvideo', 'XMTMxNzcyMzA1Ng==');
        ActionRecord.clickVideo();
    });

    $('body').on('click', '.alt_dialog .close', function(e) {
        $('.alt_dialog').hide();
        $("#playvideo").empty().hide();
        e.stopPropagation();
    });

    $('body').on('touchmove', '.alt_dialog', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // 动画对象
    var $al = $('#animation1_layout'),
        $a2l = $('#animation2_layout'),
        $ci = $al.find('.cloud_img'),
        $ail = $al.find('.attend_img_list'),
        $cover = $al.find('.cover');
    var imgA1 = new ImgAnimation($ci),
        imgA2 = new ImgAnimation($ail),
        imgA3 = new ImgAnimation2($a2l);
    var wh = $(window).height();
    var m = 50,
        x1 = x2 = x3 = 0;

    $(window).on('scroll', function() {
        st = $(window).scrollTop();
        x1 = (imgA1.otop + m) - (wh + st);
        x2 = (imgA2.otop + m) - (wh + st);
        x3 = imgA3.otop - (wh + st);
        imgA1.animate(x1);
        imgA2.animate(x2);
        showLine();
        imgA3.animate(x3);
    });

    function showLine() {
        if ((imgA2.otop + m) <= (wh + st) && $ail.css('opacity') <= 1 && $ail.css('opacity') >= 0.9) {
            !$cover.hasClass('lineAnimate') && $cover.addClass('lineAnimate')
        } else if ((imgA1.otop + m) >= (wh + st)) {
            $cover.hasClass('lineAnimate') && $cover.removeClass('lineAnimate')
        }
        // if ($ail.css('opacity') <= 1 && $ail.css('opacity') >= 0.9) {
        //     $cover.addClass('lineAnimate');
        // } else if ($ci.css('opacity') >= 0 && $ci.css('opacity') <= 0.1) {
        //     $cover.removeClass('lineAnimate');
        // }
    }

    var origin = Request.origin;
    if (origin) {
        if (origin.indexOf('#') != -1) {
            // 微信中会携带“#”，这里做处理
            origin = origin.substr(0, origin.indexOf('#'));
        }
        setCookie('origin', origin);
    }
    setCookie('referrer', document.referrer || '');

    ActionRecord.loadIndex();
});

var setPlayerSize = function() {
    var winWidth = $(window).width(),
        winHeight = $(window).height();
    var scaleVideo = 524 / 860;
    if (winWidth <= winHeight) {
        $("#playvideo").css({
            width: winWidth,
            // marginLeft: - winWidth/2,
            height: winWidth * scaleVideo,
            // marginTop: - (winWidth*scaleVideo)/2
        })
    } else {
        $("#playvideo").css({
            width: winHeight / scaleVideo,
            // marginLeft: - (winHeight/scaleVideo)/2,
            height: winHeight,
            // marginTop: - winHeight/2
        })
    }
}

var showYouku = function(id, vid) {
    $("#" + id).empty().show();
    player = new YKU.Player(id, {
        styleid: '0',
        client_id: 'd41e9cb1541b2b1c',
        vid: vid,
        autoplay: true,
        show_related: false
    });
}

var getTop = function(El) {
    var top = 0;
    do {
        top += El.offsetTop;
    } while ((El = El.offsetParent).nodeName != 'BODY');
    return top;
};

function ImgAnimation(ele) {
    this.otop = getTop(ele[0]);
    this.h = ele.height();
    this.animate = function(x) {
        var val = 0;
        if (x < 0) {
            val = Math.abs(x) / this.h;
        }
        if (val > 1) {
            val = 1;
        }
        ele.css('opacity', val);
    }
}

function ImgAnimation2(ele) {
    this.otop = getTop(ele[0]);
    this.h = ele.height();
    this.animate = function(x) {
        x = Math.abs(x);
        var val = 1;
        if (x >= this.h) {
            val = 1;
        } else {
            val = this.h / x;
        }

        ele.find('img').css('-webkit-transform', 'scale(' + val + ', ' + val + ')');
        ele.find('img').css('transform', 'scale(' + val + ', ' + val + ')');
    }
}

var ActionRecord = {
    time: getTime(true),
    loadIndex: function() {
        // 打开购买意向页面记录
        listenLog({
            actionTag: 'load_index',
            time: this.time,
            action: '打开购买意向落地页',
            system: navigator.userAgent,
            referrer: getCookie('referrer')
        });
    },
    clickVideo: function() {
        // 观看视频记录
        listenLog({
            actionTag: 'click_video',
            time: this.time,
            action: '点击“观看考勤应用视频”'
        });
    },
    clickFace: function() {
        // 点击人脸考勤机记录
        listenLog({
            actionTag: 'click_face',
            time: this.time,
            action: '点击“选购人脸考勤机”'
        });
    },
    clickFinger: function() {
        // 点击指纹考勤机记录
        listenLog({
            actionTag: 'click_finger',
            time: this.time,
            action: '点击“选购指纹考勤机”'
        });
    },
    clickRenew: function() {
        // 点击以旧换新活动banner记录
        listenLog({
            actionTag: 'click_renew',
            time: this.time,
            action: '点击“以旧换新活动banner”'
        });
    }
}
