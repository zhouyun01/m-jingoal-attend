$(document).ready(function() {
    var num_val = 1;
    var tele_num;
    var origin = getCookie('origin');
    var product_datas = {
        "zdrl1": {
            title: "真地人脸指纹考勤机",
            networkModel: "WIFI+网线型",
            content: "4.3英寸电容触摸屏（480*272）",
            value: "指纹容量：5000枚</br>人脸容量：500人",
            price: "749",
            color: "白色"
        },
        "zdrl2": {
            title: "真地人脸指纹考勤机",
            networkModel: "WIFI+网线型",
            content: "4.3英寸电容触摸屏（480*272）",
            value: "指纹容量：5000枚&nbsp;&nbsp;&nbsp;人脸容量：500人",
            price: "749",
            color: "黑灰色"
        },
        "zdrl3": {
            title: "真地人脸指纹考勤机",
            networkModel: "网线型",
            content: "4.3英寸电容触摸屏（480*272）",
            value: "指纹容量：5000枚&nbsp;&nbsp;&nbsp;人脸容量：500人",
            price: "649",
            color: "白色"
        },
        "zdrl4": {
            title: "真地人脸指纹考勤机",
            networkModel: "网线型",
            content: "4.3英寸电容触摸屏（480*272）",
            value: "指纹容量：5000枚&nbsp;&nbsp;&nbsp;人脸容量：500人",
            price: "649",
            color: "黑灰色"
        },
        "zdzw1": {
            title: "真地指纹考勤机",
            networkModel: "WIFI+网线型",
            content: "3.5英寸彩屏（320*240）",
            value: "指纹容量3000枚",
            price: "549",
            color: "银白色"
        },
        "zdzw2": {
            title: "真地指纹考勤机",
            networkModel: "网线型",
            content: "3.5英寸彩屏（320*240）",
            value: "指纹容量3000枚",
            price: "449",
            color: "银白色"
        },
        "hszw1": {
            title: "浩顺指纹考勤机",
            networkModel: "网线型",
            content: "2.4英寸彩屏（320*240）",
            value: "指纹容量1000枚",
            price: "399",
            color: "白色"
        },
        "hszw2": {
            title: "浩顺指纹考勤机",
            networkModel: "网线型",
            content: "2.4英寸彩屏（320*240）",
            value: "指纹容量1000枚",
            price: "399",
            color: "黑灰色"
        }
    }
    var key = Request.key;
    var model = Request.model;
    var img_src = Request.src;
    var title = product_datas[model].title;
    var networkModel = product_datas[model].networkModel;
    var content = product_datas[model].content;
    var value = product_datas[model].value;
    var price = product_datas[model].price;
    var color = product_datas[model].color;
    var activity = Request.activity;
    $(".intent_cont dd").find("p").eq(0).html(title);
    if (networkModel) {
        $(".intent_cont dd").find("p").eq(1).html(networkModel);
    } else {
        $(".intent_cont dd").find("p").eq(1).hide();
    }
    $(".intent_cont dd").find("p").eq(2).html(content);
    $(".intent_cont dd").find("p").eq(3).html(value);
    $(".intent_cont dd").find("p").eq(4).find(".pri").html(price);
    $(".img_src").attr("src", "");
    $(".img_src").attr("src", img_src);
    var one_pic = price * 1
    $(".pri_cont").html(one_pic);

    if (activity && activity === 'renew') {
        htmlStr = '<div class="desc-layout" id="active_rule">'
            + '<h3>”换新季“活动规则：</h3>'
            + '<ol class="num-list">'
            + '<li>参加活动的考勤机型号为JMB708型WIFI版智能考勤机、JMB706型网线版智能考勤机、JMB106型网线版智能考勤机和JMB108型WIFI版智能考勤机（其他机型不参加）；</li>'
            + '<li>用户收到新考勤机后，请于30日内（以邮寄时间为准）将旧考勤机寄送到：广州市番禺区钟村镇高沙工业区力丰工业园 真地公司 张战国 收 18922158082；</li>'
            + '<li>请在包装盒内用纸写上1）订单号2）联系人3）联系电话4）寄送台数，用户需自行承担邮寄费用，到付将被仓库拒收；</li>'
            + '<li>本活动不限制购买数量，每台旧考勤机（不限品牌和型号）在换购一台新考勤机时可抵扣150元；</li>'
            + '<li>活动只限于企业自用，不得转售，如发现今目标将有权终止服务并保留进一步追究法律责任的权利 ；</li>'
            + '<li>活动时间截止至2016年4月20日；</li>'
            + '<li>本次活动的最终解释权归今目标所有。</li>'
            + '</ol>'
            + '</div>';
        $('#intent_wra').append(htmlStr);
    }

    //数量的加减
    var num_val = parseInt($("#num_val").val());
    if (num_val == 1) {
        $("#reduce").find("span").addClass("opaci");
        $(".num_top").show().css("left", "0px");
    };

    $("#add").click(function() {
        var num_val = parseInt($("#num_val").val());
        if (num_val >= 999) {
            $("#add").find("span").addClass("opaci");
            $(".num_top").show().css("left", "62px");
            return;
        }
        if (num_val > 1) {
            $("#reduce").find("span").removeClass("opaci");
            $(".num_top").hide();
        };
        num_val += 1;
        var all_pic = num_val * price;
        $("#num_val").val(num_val);
        $(".pri_cont").html(all_pic);
        if (num_val > 1) {
            $("#reduce").find("span").removeClass("opaci");
            $(".num_top").hide();
        }
    });

    $("#reduce").click(function() {
        var num_val = parseInt($("#num_val").val());
        if (num_val <= 1) {
            $("#reduce").find("span").addClass("opaci");
            $(".num_top").show().css("left", "0px");
            return;
        }
        if ($('#add').find("span").hasClass("opaci")) {
            $("#add").find("span").removeClass("opaci");
            $(".num_top").hide();
        }
        num_val -= 1;
        var all_pic = num_val * price;
        $("#num_val").val(num_val);
        $(".pri_cont").html(all_pic);
        if (num_val == 1) {
            $("#reduce").find("span").addClass("opaci");
            $(".num_top").show().css("left", "0px");
        };
    })

    $('.num #num_val').on('input', function() {
        var num_val = parseInt(this.value);
        if (isNaN(num_val)) return;
        $('.num #num_val').val(num_val);

        if (num_val == 0) {
            $('.num #num_val').val("1");
            var all_pic = 1 * price;
            $(".pri_cont").html(all_pic);
        }
        if (num_val >= 1) {
            var all_pic = num_val * price;
            $(".pri_cont").html(all_pic);
            $("#reduce").find("span").removeClass("opaci");
            $(".num_top").hide();
        }
        if (num_val < 999) {
            var all_pic = num_val * price;
            $(".pri_cont").html(all_pic);
            $("#add").find("span").removeClass("opaci");
            $(".num_top").hide();
        }
        if (num_val >= 999) {
            $('.num #num_val').val("999");
            var all_pic = num_val * price;
            $(".pri_cont").html('999');
            var all_pic = 999 * price;
            $(".pri_cont").html(all_pic);
            $("#add").find("span").addClass("opaci");
            $(".num_top").show().css("left", "62px");
        }
    }).on('focusout', function() {
        var num_val = parseInt(this.value);
        if (isNaN(num_val) || num_val == '') {
            $('.num #num_val').val(1);
            var all_pic = 1 * price;
            $(".pri_cont").html(all_pic);
        }
    });

    // 手机号    按钮
    var teleNum = $("#tele").val();
    if (teleNum != "") {
        $(".load .load_btn").removeClass('disable');
    } else {
        $(".load .load_btn").addClass('disable');
    }
    $("#tele").on('focusout input focusin', function() {
        if (this.value != "") {
            $(".load .load_btn").removeClass('disable');
        } else {
            $(".load .load_btn").addClass('disable');
        }
        if (this.value > 11) {
            var tele = this.value.substring(0, 11)
            $("#tele").val(tele);
        }
    });

    $(".load_btn").click(function() {
        var $this = $(this);
        var tele_num = $("#tele").val();
        if (tele_num == "") {
            return false;
        }
        if ((tele_num != "") && !/^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/i.test(tele_num)) {
            showinfo("请输入正确的手机号码", "（只支持中国大陆地区）");
            return false;
        }
        if ($(this).html() != '提交') {
            return false;
        }

        $this.html('提交中...');

        $.ajax({
            type: "GET",
            url: "http://crm.jingoal.cn:8080/crm/attendanceOrderMng/wanaBuy.open",
            data: {
                "itemType": key,
                "unitPayment": price * $("#num_val").val(),
                "quantity": $("#num_val").val(),
                "contact": tele_num,
                "origin": origin,
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            timeout: 3000,
            success: function(data) {
                if (data.status == 202) {
                    showinfo('提交失败，请稍后尝试');
                } else if (data.status == 200) {
                    clearCookie('origin');
                    showSuccessDialog();
                    ActionRecord.clickSubmit(title + '|' + key + '|' + color + '|' + networkModel);
                }
                $this.html('提交');
            },
            error: function(xhr, err) {
                showinfo('网络异常，请稍后尝试');
                $this.html('提交');
            }
        });
    });

    var showinfo = function($msg, $msg1, $time) {
        if (!$msg)
            return;
        if (!window.infoWinInited) {
            window.infoWinInited = true;
            $('html body').append('<div class="J_pop_welcome_box">' +
                '<div class="pop_welcome_con fix_wel_con">' +
                '<div class="inner_content"><p></p><p></p></div>' +
                '</div>' +
                '<div class="pop_welcome_bg J_pop_welcome_bg fix_wel">&nbsp;</div>' +
                '</div>');
        } else {
            $('.J_pop_welcome_box').show();
        }
        $('.J_pop_welcome_box .inner_content').find("p").eq(0).empty().html($msg);
        $('.J_pop_welcome_box .inner_content').find("p").eq(1).empty().html($msg1);
        var top_width = $('.pop_welcome_con').width();
        $(".pop_welcome_bg").css("width", top_width);
        $(".fix_wel_con").css("margin-left", -(top_width / 2));
        $(".fix_wel").css("margin-left", -(top_width / 2));
        if (!$time)
            $time = 2000;
        setTimeout(function() {
            $('.J_pop_welcome_box').fadeOut("slow");
        }, $time);
        return;
    };

    $('.sure_btn, .close').on('touchstart', function(e) {
        $('.alt_dialog').hide();
        e.stopPropagation();
        e.preventDefault();
    });

    $('body').on('touchmove', '.alt_dialog', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    ActionRecord.loadSubmit();
});

function showSuccessDialog() {
    $('.alt_dialog').show();
}

var ActionRecord = {
    time: getTime(true),
    loadSubmit: function() {
        // 打开购买意向页面记录
        listenLog({
            actionTag: 'load_submit',
            time: this.time,
            action: '打开“提交购买意向页面”',
            system: navigator.userAgent,
            referrer: getCookie('referrer')
        });
    },
    clickSubmit: function(info) {
        // 提交意向记录
        listenLog({
            actionTag: 'click_submit',
            time: this.time,
            action: '点击了提交按钮',
            productInfo: info
        });
    },
    clickTele: function () {
        // 点击客服电话记录
        listenLog({
            actionTag: 'click_tele',
            time: this.time,
            action: '点击客服电话'
        });
    }
}
