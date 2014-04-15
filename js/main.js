var currentKoku = 0;
var currentDay = 0;
var currentMonth = 0;

$(function(){
function clock() {
var myDay = new Array("日","月","火","水","木","金","土");
var now  = new Date();
var year = now.getFullYear(); // 年
var month = now.getMonth()+1; // 月
var date = now.getDate(); // 日
var day = now.getDay();
var hour = now.getHours(); // 時
var min  = now.getMinutes(); // 分
var sec  = now.getSeconds(); // 秒
var big_sec = Math.floor(now.getTime() / 1000); // 1970年1月1日午前0時からの経過時間（秒数）
var e_hour = 175;    // 1属時 175秒
var e_koku = e_hour * 6; // 1刻	6属時	※6時間ごとにひとまとまり
var e_day = e_koku * 4;  // 1日	24属時	※24時間 4刻で1日
var e_syuu = e_day * 8;  // 1周	8日（6属日＋2極日）	※1週間は8日
var e_month = e_syuu * 4;    // 1月	32日	※4週間32日で1ヶ月
var e_year = e_month * 12;   // 1年	12月	※384日で1年

var realTime = year + '年' + month + '月' + date + '日' + '（' + myDay[day] + '曜日）'  + hour + '時' + min + '分' + sec + '秒'; // Version.2


// ezclockから移植
var ratioRealToGame = (1440 / 70);
var curTime = new Date();
var arr = DstDetect();
var isDST = 1;
if(curTime >= arr[0] && curTime <= arr[1]){isDST = 0;}
var localTime = curTime.getTime();
var d = (curTime.getTimezoneOffset() + (isDST * 60));
var localOffest = (curTime.getTimezoneOffset() + (isDST * 60)) * 60000;
var utc = localTime + localOffest;
var offset = 9;
var japan = utc + (3600000 * offset);
var jpTime = new Date(japan);
var Epoch = new Date(2010,6,12,1,0,0,0);
var curMillis = jpTime.getTime();
var epochMillis = Epoch.getTime();
var diffInMillis = (curMillis - epochMillis);
var diffInSeconds = ((diffInMillis / 1000) - 90000);
var delta = (diffInSeconds * ratioRealToGame);
var gameSecond = (delta % 60) | 0; delta -= gameSecond; delta /= 60.0;
var gameMinute = (delta % 60) | 0; delta -= gameMinute; delta /= 60.0;
var gameHour = (delta % 24) | 0; delta -= gameHour; delta /= 24.0;
var gameDay = (delta % 32) | 0; delta -= gameDay; delta /= 32.0;
var gameMonth = (delta % 12) | 0; delta -= gameMonth; delta /= 12.0;
var gameYear = delta | 0;
var gameKoku = Math.floor(gameHour / 6 + 1);
gameDay++;
gameMonth++;
var elementalAttribute = { "Wind": 1,
                           "Lightning": 2,
                           "Fire": 3,
                           "Earth": 4,
                           "Ice": 5,
                           "Water": 6,
                           "Star": 100,
                           "Spirit": 101
                         };
var ElementalAttributeName = { 1: "風",
                               2: "雷",
                               3: "火",
                               4: "土",
                               5: "氷",
                               6: "水",
                               100: "星",
                               101: "霊"
                             };
var medium = "medium";
var hot = "hot";
var extraHot = "extraHot";
var atma_arry = [];
for(i=1;i < 13;i++){
    atma_arry[i] = 0;
}

// 数値が1桁の場合、頭に0を付けて2桁で表示する指定
if(hour < 10) { hour = "0" + hour; }
if(min < 10) { min = "0" + min; }
if(sec < 10) { sec = "0" + sec; }

var gameTime = gameYear + '年' + gameMonth + '月' + gameDay + '日' + gameHour + '時' + gameMinute + '分';

function hourToKokuElement(hour){
    // 時間を属性IDに変換する。刻は1-6
    hour = hour % 24;
    if (0 <= hour && hour <= 3){return elementalAttribute.Ice;}
    if (4 <= hour && hour <= 7){return elementalAttribute.Water;}
    if (8 <= hour && hour <= 11){return elementalAttribute.Wind;}
    if (12 <= hour && hour <= 15){return elementalAttribute.Lightning;}
    if (16 <= hour && hour <= 19){return elementalAttribute.Fire;}
    if (20 <= hour && hour <= 23){return elementalAttribute.Earth;}
    return 0;
}

function dayToDayElement(day){
    // 日付を属性IDに変換する。
    var r = day % 8
    if (r == 1){return elementalAttribute.Wind}
    if (r == 2){return elementalAttribute.Lightning}
    if (r == 3){return elementalAttribute.Fire}
    if (r == 4){return elementalAttribute.Earth}
    if (r == 5){return elementalAttribute.Ice}
    if (r == 6){return elementalAttribute.Water}
    if (r == 7){return elementalAttribute.Star}
    if (r == 0){return elementalAttribute.Spirit}
    return 0;
}

function monthToMonthElement(month){
    // 月を属性IDに変換する。
    if (month == 1){return elementalAttribute.Ice}
    if (month == 2){return elementalAttribute.Ice}
    if (month == 3){return elementalAttribute.Water}
    if (month == 4){return elementalAttribute.Water}
    if (month == 5){return elementalAttribute.Wind}
    if (month == 6){return elementalAttribute.Wind}
    if (month == 7){return elementalAttribute.Lightning}
    if (month == 8){return elementalAttribute.Lightning}
    if (month == 9){return elementalAttribute.Fire}
    if (month == 10){return elementalAttribute.Fire}
    if (month == 11){return elementalAttribute.Earth}
    if (month == 12){return elementalAttribute.Earth}
    return 0;
}

function update_atma_arry(hour, day, month){
    var e = 0;
    e = hourToKokuElement(hour);
    _update_atma(e);
    e = dayToDayElement(day);
    _update_atma(e);
//    e = monthToMonthElement(month);
//    _update_atma(e);
}

function _update_atma(e){
    if (e == elementalAttribute.Ice){
        atma_arry[1] ++;
        atma_arry[2] ++;
    }
    if (e == elementalAttribute.Water){
        atma_arry[3] ++;
        atma_arry[4] ++;
    }
    if (e == elementalAttribute.Wind){
        atma_arry[5] ++;
        atma_arry[6] ++;
    }
    if (e == elementalAttribute.Lightning){
        atma_arry[7] ++;
        atma_arry[8] ++;
    }
    if (e == elementalAttribute.Fire){
        atma_arry[9] ++;
        atma_arry[10] ++;
    }
    if (e == elementalAttribute.Earth){
        atma_arry[11] ++;
        atma_arry[12] ++;
    }
    if (e == elementalAttribute.Star){
        // 星属性は火風雷
        atma_arry[5] ++;
        atma_arry[6] ++;
        atma_arry[7] ++;
        atma_arry[8] ++;
        atma_arry[9] ++;
        atma_arry[10] ++;
    }
    if (e == elementalAttribute.Spirit){
        // 霊属性は水土氷
        atma_arry[1] ++;
        atma_arry[2] ++;
        atma_arry[3] ++;
        atma_arry[4] ++;
        atma_arry[11] ++;
        atma_arry[12] ++;
    }
}

function get_deco_css_class_name(priority){
    if (currentKoku != gameKoku){return "anime_atma_change"} // 切り替えアニメーション
    if (currentDay != gameDay){return "anime_atma_change"} // 切り替えアニメーション
    if (currentMonth != gameMonth){return "anime_atma_change"} // 切り替えアニメーション
    if (priority == 0){return ""}
    if (priority == 1){return medium}
    if (priority == 2){return hot}
    if (3 <= priority && priority <= 5){return extraHot}
    return ""
}

function get_atma_drop_percent(priority){
    if (priority == 0){return 1}
    return 5 * priority
}

function convertGameKokuToLastSecoundText(gameKoku, gameHour, gameMinute, gameSecond){
    // 刻を残り『xx分xx秒』に変更する
    game_last_sec = gameKoku * 6 * 3600;
    game_last_sec = game_last_sec - gameHour * 3600 - gameMinute * 60 - gameSecond;

    // 実時間に変換
    last_sec = Math.floor(game_last_sec * 175 / 3600);
    real_min = Math.floor(last_sec / 60);
    real_sec = last_sec % 60;
    if (real_min > 0){
        if (real_sec <= 9){
            real_sec = "0" + real_sec
        }
        return Math.floor(last_sec / 60) + "分" + real_sec + "秒";
    } else {
        return real_sec + "秒";
    }
}


$("#realTime").html(realTime.toLocaleString());
$("#gameTime").html(gameTime.toLocaleString()); // ezcから移植

// 時間
$("#hour").html(gameHour.toLocaleString());

// 刻
$("#koku").html(gameKoku.toLocaleString());
$("#koku_name").html((ElementalAttributeName[hourToKokuElement(gameHour)] + "の刻").toLocaleString());

// 日
$("#day").html(gameDay.toLocaleString());
$("#day_name").html((ElementalAttributeName[dayToDayElement(gameDay)] + "属日").toLocaleString());

// 月
$("#month").html(gameMonth.toLocaleString());
$("#month_name").html((ElementalAttributeName[monthToMonthElement(gameMonth)] + "属月 旧暦"+ gameMonth + "月").toLocaleString());

// 次の刻まであとxxx
$("#last_minute").html(convertGameKokuToLastSecoundText(gameKoku, gameHour, gameMinute, gameSecond).toLocaleString());



// image
$("#image_koku_element").attr('src', "./image/elemental/" + hourToKokuElement(gameHour) + ".png");
$("#image_day_element").attr('src', "./image/elemental/" + dayToDayElement(gameDay) + ".png");
$("#image_month_element").attr('src', "./image/elemental/" + monthToMonthElement(gameMonth) + ".png");

update_atma_arry(gameHour, gameDay, gameMonth);

// アートマの場所更新
$("#m1").attr('class', get_deco_css_class_name(atma_arry[1]));
$("#m2").attr('class', get_deco_css_class_name(atma_arry[2]));
$("#m3").attr('class', get_deco_css_class_name(atma_arry[3]));
$("#m4").attr('class', get_deco_css_class_name(atma_arry[4]));
$("#m5").attr('class', get_deco_css_class_name(atma_arry[5]));
$("#m6").attr('class', get_deco_css_class_name(atma_arry[6]));
$("#m7").attr('class', get_deco_css_class_name(atma_arry[7]));
$("#m8").attr('class', get_deco_css_class_name(atma_arry[8]));
$("#m9").attr('class', get_deco_css_class_name(atma_arry[9]));
$("#m10").attr('class', get_deco_css_class_name(atma_arry[10]));
$("#m11").attr('class', get_deco_css_class_name(atma_arry[11]));
$("#m12").attr('class', get_deco_css_class_name(atma_arry[12]));

// アートマのドロップ率
$("#drop1").html(get_atma_drop_percent(atma_arry[1]));
$("#drop2").html(get_atma_drop_percent(atma_arry[2]));
$("#drop3").html(get_atma_drop_percent(atma_arry[3]));
$("#drop4").html(get_atma_drop_percent(atma_arry[4]));
$("#drop5").html(get_atma_drop_percent(atma_arry[5]));
$("#drop6").html(get_atma_drop_percent(atma_arry[6]));
$("#drop7").html(get_atma_drop_percent(atma_arry[7]));
$("#drop8").html(get_atma_drop_percent(atma_arry[8]));
$("#drop9").html(get_atma_drop_percent(atma_arry[9]));
$("#drop10").html(get_atma_drop_percent(atma_arry[10]));
$("#drop11").html(get_atma_drop_percent(atma_arry[11]));
$("#drop12").html(get_atma_drop_percent(atma_arry[12]));

//alert(atma_arry[3]);
currentKoku = gameKoku;
currentDay = gameDay;
currentMonth = gameMonth;

setTimeout(function(){clock()},1000); // 1000ミリ秒ごとに処理を実効
}
$(document).ready(clock);
});