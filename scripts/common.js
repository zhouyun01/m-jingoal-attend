// 截取url字符串
function UrlSearch() {
    var name, value;
    var str = location.href;
    var num = str.indexOf("?");
    str = str.substr(num + 1);

    // var arr = str.split("&");
    var arr = str.replace(/\?/g, '&').split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}

var Request = new UrlSearch();

//getGuid
var guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var getGuid = function() {
    var guidStr = '';
    if (getCookie('guid') == '' || getCookie('guid').lenght == 0) {
        guidStr = guid();
        setCookie('guid', guidStr);
        return guidStr;
    } else {
        return getCookie('guid');
    }
}

//监听数据埋点
var listenLog = function(obj) {
    var msgLog = {
        time: getTime(),
        cid: "",
        uid: Request.uid || "",
        productTag: "attendbuy",
        actionTag: "",
        puse: "web_js",
        ip: "",
        targetTag: {
            guid: getGuid()
        }
    }
    if (obj) {
        for (var param in obj) {
            "actionTag" == param ? msgLog[param] = obj[param] : msgLog.targetTag[param] = obj[param];
        }
    }
    var msgLogStr = JSON.stringify(msgLog);
    // console.log(msgLogStr);

    img = new Image;
    /\.jingoal\.com$/.test(location.hostname) ? img.src = "https://jincai.jingoal.com/agent/log/logsend?topic=web.action&msg=" + msgLogStr : img.src = "http://192.168.19.3:8080/agent/log/logsend?topic=web.action&msg=" + msgLogStr;
    img.onerror = function() {};
    img.onload = function() {};
}

function getTime(isFormat) {
    var d = new Date();
    var dStr = d.toString();
    var dYear = d.getFullYear().toString();
    var dMonth = (d.getMonth() + 1).toString();
    var dDay = d.getDate().toString();
    var dHours = d.getHours().toString();
    var dMinutes = d.getMinutes().toString();
    var dSeconds = d.getSeconds().toString();
    var dMilliseconds = d.getMilliseconds().toString();
    var dZone = clientTimeZone();
    var dFullTime, formatTime;

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    dMonth = checkTime(dMonth).toString();
    dDay = checkTime(dDay).toString();
    dHours = checkTime(dHours).toString();
    dMinutes = checkTime(dMinutes).toString();

    if (isFormat) {
        formatTime = dYear + '-' + dMonth + '-' + dDay + ' ' + dHours + ':' + dMinutes;
        return formatTime;
    }

    dSeconds = checkTime(dSeconds).toString();
    dFullTime = dYear + dMonth + dDay + dHours + dMinutes + dSeconds + dMilliseconds + dZone;

    return dFullTime;
}

// 获取当地时区
function clientTimeZone() {
    var munites = new Date().getTimezoneOffset();
    var hour = parseInt(munites / 60);
    var munite = munites % 60;
    var prefix = "-";

    if (hour < 0 || munite < 0) {
        prefix = "%2B"; // "+"号转义成"%2B"
        hour = -hour;
        if (munite < 0) {
            munite = -munite;
        }
    }

    hour = hour + "";
    munite = munite + "";

    if (hour.length == 1) {
        hour = "0" + hour;
    }

    if (munite.length == 1) {
        munite = "0" + munite;
    }

    return prefix + hour + munite;
}

function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}

//设置cookie
function setCookie(name, value) {
    document.cookie = name + "=" + value + "; ";
}

//清除cookie
function clearCookie(name) {
    setCookie(name, "");
}
