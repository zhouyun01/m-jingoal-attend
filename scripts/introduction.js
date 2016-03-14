$(function() {

    var winWidth = $(window).width();
    var li_width = winWidth * (0.7);
    var left_lb = right_lb = winWidth * (0.15);
    $(".slide-box>ul>li").css("width", li_width);
    // $(".slide-box .li_first").css("margin-left", left_lb);

    // 11是人脸考勤机
    // 12是指纹考勤机
    var url_token = Request.token;
    if (url_token == "11") {
        $(".intro").find("p").html("真地人脸指纹考勤机");
        $(".slide-box>.Face_attend").show();
        $(".slide-box>.Finger_attend").hide();
        var li_num = $(".Face_attend > li").length;
        // $(".product-list").css("width", li_num * li_width + left_lb);
        $(".product-list").css({
            width: li_num * li_width + left_lb + right_lb + 'px',
            paddingLeft: left_lb + 'px',
            paddingRight: right_lb + 'px',
        });

        $('.slide-box').on("scroll", function() {
            var leftBox = $(this).scrollLeft();
            if (leftBox < (0.5 * li_width + left_lb)) {
                setProductInfo(11, 'WIFI、TCP/IP、U盘');
                setProductInfo(20, 'JMB706');
            } else {
                setProductInfo(11, 'TCP/IP、U盘');
                setProductInfo(20, 'JMB708');
            }
        });

        ActionRecord.loadProduct('打开了“选购人脸考勤机页面”');
    }
    if (url_token == "12") {
        $(".intro").find("p").html("真地指纹考勤机");
        $(".slide-box>.Finger_attend").show();
        $(".slide-box>.Face_attend").hide();

        var li_num = $(".Finger_attend>li").length;
        $(".product-list").css({
            width: li_num * li_width + left_lb + right_lb + 'px',
            paddingLeft: left_lb + 'px',
            paddingRight: right_lb + 'px',
        });

        $('.slide-box').on("scroll", function() {
            var leftBox = $(this).scrollLeft();
            if (leftBox < (1.5 * li_width + left_lb)) {
                $(".intro").find("p").html("真地指纹考勤机");

                init_para(finger_para_datas);

                if (leftBox < (0.5 * li_width + left_lb)) {
                    setProductInfo(17, 'WIFI、TCP/IP、U盘、USB通讯');
                    setProductInfo(29, 'JMB106');
                } else {
                    setProductInfo(17, 'TCP/IP、U盘、USB通讯');
                    setProductInfo(29, 'JMB108');
                }
            } else {
                $(".intro").find("p").html("浩顺指纹考勤机");

                init_para(finger2_para_datas);
            }
        });

        ActionRecord.loadProduct('打开了“选购指纹考勤机页面”');
    }

    $('.color_list').on('click', 'li', function(e) {
        $(this).addClass('active').siblings('li').removeClass('active')
            .end().parents('.product_layout').find('.product_img img')
            .eq($(this).index()).show().siblings('img').hide();
    });

    $('.Face_attend').on('click', '.sel_btn', function(e) {
        var $imgObj = $(this).parents('.product_layout').find('.product_img img:visible');
        var key = $imgObj.data('key');
        var model = $imgObj.data('model');
        var networkModel = $(this).parents('.product_layout').find('.model').html();
        var imgSrc = $imgObj.attr('src');
        var imgIndex = $imgObj.data('img-index');
        var i = $imgObj.index() + 1;
        var pInfo = 'Face: ZD|' + key + '|' +
            $(this).parents('.product_layout').find('.color_list li.active .color_text').html() +
            '|' + networkModel;
        ActionRecord.clickProduct(pInfo);
        window.location.href = 'intention.html?key=' + key + '&model=' + model + '&src=' + imgSrc;
        e.stopPropagation();
    });

    function setProductInfo(i, c) {
        $(".para_table tbody tr").eq(i).children('td').eq(1).html(c);
    }

    if (url_token == "11") {
        var face_para_datas = [{
            title: "显示屏",
            content: "4.3英寸电容触摸屏</br>（分辨率 480*272）"
        }, {
            title: "CPU",
            content: "ARM9内核，主频400MHz"
        }, {
            title: "RAM",
            content: "128MB"
        }, {
            title: "ROM",
            content: "128MB"
        }, {
            title: "验证方式",
            content: "人脸、指纹"
        }, {
            title: "验证速度",
            content: "<1秒（指纹、人脸）"
        }, {
            title: "拒真率（FAR）",
            content: "<0.1%（指纹）</br><1%（人脸） "
        }, {
            title: "认假率（FRR）",
            content: "<0.00001%（指纹）</br><0.001%（人脸）"
        }, {
            title: "人脸存储 ",
            content: "500人"
        }, {
            title: "指纹存储 ",
            content: "5000枚"
        }, {
            title: "记录容量 ",
            content: "100,000条"
        }, {
            title: "通讯方式 ",
            content: "WIFI、TCP/IP、U盘"
        }, {
            title: "语言显示 ",
            content: "中（简、繁）、英"
        }, {
            title: "其他功能 ",
            content: "1.记录查询 2.离线打卡 3.指纹智能学习 更新 4.语音提示 5.U盘升级固件"
        }, {
            title: "后台软件 ",
            content: "今目标系统平台"
        }, {
            title: "电流/电压 ",
            content: "DC 9V / 2A"
        }, {
            title: "工作环境",
            content: "温度：0℃~+45℃</br>湿度(RH)：20%~ 80% 不凝结"
        }, {
            title: "产品尺寸 ",
            content: "190×190×42 mm"
        }, {
            title: "产品重量",
            content: "470g"
        }, {
            title: "包装清单 ",
            content: "考勤机×1、电源适配器×1（线长1.2m） 、说明书×1、固定背板×1、螺丝包×1、 三包凭证×1、皮尺×1（1.4m）"
        }, {
            title: "人脸/指纹兼容型号",
            content: "JMB706"
        }];
        init_para(face_para_datas);
    } else if (url_token == "12") {
        var finger_para_datas = [{
            title: '显示屏',
            content: '3.5英寸彩屏（320*240）'
        }, {
            title: "CPU",
            content: "MIPS内核，运行频率0～300MHz"
        }, {
            title: '系统',
            content: 'Linux'
        }, {
            title: "RAM",
            content: "64MB"
        }, {
            title: "ROM",
            content: "128MB"
        }, {
            title: "考勤速度",
            content: "<1秒"
        }, {
            title: "识别角度",
            content: "全角度识别"
        }, {
            title: "拒真率（FAR）",
            content: "≤0.1%"
        }, {
            title: "认假率（FRR）",
            content: "≤0.00001%"
        }, {
            title: "记录查询功能 ",
            content: "支持（员工通过认证后可查询自己的记录）"
        }, {
            title: "指纹智能学习更新",
            content: "支持"
        }, {
            title: "工作方式 ",
            content: "脱机比对/联机注册"
        }, {
            title: "指纹识别模式",
            content: "1:1、1:N"
        }, {
            title: "认证方式",
            content: "指纹"
        }, {
            title: "指纹存储容量",
            content: "3000枚"
        }, {
            title: "记录容量",
            content: "100,000条"
        }, {
            title: "感应卡",
            content: "无"
        }, {
            title: "通讯方式",
            content: "WIFI、TCP/IP、U盘、USB通讯"
        }, {
            title: "U盘上传/下载数据",
            content: "不支持，U盘只支持升级固件"
        }, {
            title: "语言显示",
            content: "中（简、繁）、英"
        }, {
            title: "姓名显示",
            content: "支持"
        }, {
            title: "语音提示",
            content: "有"
        }, {
            title: '自检功能',
            content: '支持'
        }, {
            title: '通讯协议',
            content: '支持WS和WSS，兼容今目标平台考勤设备通讯接口协议规范'
        }, {
            title: '工作电压/电流',
            content: 'DC 12V/1A'
        }, {
            title: '工作环境',
            content: '温度：0℃~+45℃</br>湿度(RH)：20%~80%'
        }, {
            title: '产品尺寸',
            content: '190*140*45mm'
        }, {
            title: '产品重量',
            content: '400g'
        }, {
            title: '包装清单',
            content: '考勤机*1、电源适配器*1（电源线长度1.2m）、说明书*1、固定背板*1、螺丝包*1、三包凭证*1'
        }, {
            title: "是否兼容其他型号指纹信息",
            content: "JMB106"
        }];
        var finger2_para_datas = [{
            title: '显示屏',
            content: '2.4英寸彩屏（320×240）'
        }, {
            title: 'CPU',
            content: 'ARM9 240MHZ'
        }, {
            title: 'RAM',
            content: '16MB'
        }, {
            title: 'ROM',
            content: '8MB'
        }, {
            title: '验证方式',
            content: '指纹'
        }, {
            title: '验证速度',
            content: '<1秒'
        }, {
            title: '拒真率（FRR）',
            content: '≤1%'
        }, {
            title: '认假率（FAR）',
            content: '≤0.0001%'
        }, {
            title: '指纹容量',
            content: '1000枚'
        }, {
            title: '记录容量',
            content: '16万条'
        }, {
            title: '通讯方式',
            content: 'TCP/IP ；USB通讯；U盘；'
        }, {
            title: '支持语言',
            content: '中（简）、英'
        }, {
            title: '其他功能',
            content: '1. 记录查询 2. 离线打卡 3. 指纹智能学习更新 4. 语音提示 5. U盘升级固件'
        }, {
            title: '后台软件',
            content: '今目标系统平台'
        }, {
            title: '工作电流/电压',
            content: 'DC 5V/1A'
        }, {
            title: '工作环境',
            content: '温度：0℃~+45℃</br>湿度(RH)：20%~80% 不凝结'
        }, {
            title: '外观尺寸',
            content: '180×130×33 mm'
        }, {
            title: '产品重量',
            content: '260g'
        }, {
            title: '装箱清单',
            content: '考勤机×1，电源适配器×1（电源线长度1.2m），说明书×1，合格证×1，保修卡×1，USB通讯线×1，安装螺丝包×1'
        }, {
            title: "是否兼容其他型号指纹信息",
            content: "否"
        }];
        init_para(finger_para_datas);
    }

    function init_para(para) {
        $(".para_table").html("");
        $.each(para, function(key, item) {
            var title = item.title;
            var content = item.content;
            var sAddHtml = '<tr><td>' + title + '</td><td>' + content + '</td></tr>';
            $(".para_table").append(sAddHtml);
        });
    }
});

var ActionRecord = {
    time: getTime(true),
    loadProduct: function(type) {
        // 打开考勤机页面
        listenLog({
            actionTag: 'load_product',
            time: this.time,
            action: type,
            system: navigator.userAgent,
            referrer: getCookie('referrer')
        });
    },
    clickProduct: function(info) {
        // 选择的产品信息
        listenLog({
            actionTag: 'click_product',
            time: this.time,
            productInfo: info
        });
    }
}
