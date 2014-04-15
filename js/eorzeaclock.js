// ▼ ------------------------- ▼ eorzeatime - エオルゼア時間（月/日/時/分）
// ▼ ------------------------- ▼ eorzeatime2 - エオルゼア時間（月/日/時/分/秒）
// ▼ ------------------------- ▼ eorzeatime3 - エオルゼア時間（月属性/日属性/時属性）

function EorzeaTime(){
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
 gameDay++;
 gameMonth++;
  if(gameMinute < 10){gameMinute = '0' + gameMinute;}
  if(gameSecond < 10){gameSecond = '0' + gameSecond;}
  if(0 <= gameHour && gameHour <= 3){gameHour = '<span class="eorzeatime3_ice">' + gameHour + '<span class="eorzeatime3_txt">時 （氷の刻）</span></span>';}
  if(4 <= gameHour && gameHour <= 7){gameHour = '<span class="eorzeatime3_water">' + gameHour + '<span class="eorzeatime3_txt">時 （水の刻）</span></span>';}
  if(8 <= gameHour && gameHour <= 11){gameHour = '<span class="eorzeatime3_wind">' + gameHour + '<span class="eorzeatime3_txt">時 （風の刻）</span></span>';}
  if(12 <= gameHour && gameHour <= 15){gameHour = '<span class="eorzeatime3_lightning">' + gameHour + '<span class="eorzeatime3_txt">時 （雷の刻）</span></span>';}
  if(16 <= gameHour && gameHour <= 19){gameHour = '<span class="eorzeatime3_fire">' + gameHour + '<span class="eorzeatime3_txt">時 （火の刻）</span></span>';}
  if(20 <= gameHour && gameHour <= 23){gameHour = '<span class="eorzeatime3_earth">' + gameHour + '<span class="eorzeatime3_txt">時 （土の刻）</span></span>';}
  if(gameDay == 1 || gameDay == 9 || gameDay == 17 || gameDay == 25){gameDay = '<span class="eorzeatime3_wind">' + gameDay + '日<span class="eorzeatime3_txt"> （風属日）</span></span>';}
  if(gameDay == 2 || gameDay == 10 || gameDay == 18 || gameDay == 26){gameDay = '<span class="eorzeatime3_lightning">' + gameDay + '日<span class="eorzeatime3_txt"> （雷属日）</span></span>';}
  if(gameDay == 3 || gameDay == 11 || gameDay == 19 || gameDay == 27){gameDay = '<span class="eorzeatime3_fire">' + gameDay + '日<span class="eorzeatime3_txt"> （火属日）</span></span>';}
  if(gameDay == 4 || gameDay == 12 || gameDay == 20 || gameDay == 28){gameDay = '<span class="eorzeatime3_earth">' + gameDay + '日<span class="eorzeatime3_txt"> （土属日）</span></span>';}
  if(gameDay == 5 || gameDay == 13 || gameDay == 21 || gameDay == 29){gameDay = '<span class="eorzeatime3_ice">' + gameDay + '日<span class="eorzeatime3_txt"> （氷属日）</span></span>';}
  if(gameDay == 6 || gameDay == 14 || gameDay == 22 || gameDay == 30){gameDay = '<span class="eorzeatime3_water">' + gameDay + '日<span class="eorzeatime3_txt"> （水属日）</span></span>';}
  if(gameDay == 7 || gameDay == 15 || gameDay == 23 || gameDay == 31){gameDay = '<span class="eorzeatime3_astral">' + gameDay + '日<span class="eorzeatime3_txt"> （星極日）</span></span>';}
  if(gameDay == 8 || gameDay == 16 || gameDay == 24 || gameDay == 32){gameDay = '<span class="eorzeatime3_unbral">' + gameDay + '日<span class="eorzeatime3_txt"> （霊極日）</span></span>';}
  if(gameMonth == 1){gameMonth = '<span class="eorzeatime3_ice">星1月<span class="eorzeatime3_txt"> （氷／旧暦1月）</span></span>';}
  if(gameMonth == 2){gameMonth = '<span class="eorzeatime3_ice">霊1月<span class="eorzeatime3_txt"> （氷／旧暦2月）</span></span>';}
  if(gameMonth == 3){gameMonth = '<span class="eorzeatime3_water">星2月<span class="eorzeatime3_txt"> （水／旧暦3月）</span></span>';}
  if(gameMonth == 4){gameMonth = '<span class="eorzeatime3_water">霊2月<span class="eorzeatime3_txt"> （水／旧暦4月）</span></span>';}
  if(gameMonth == 5){gameMonth = '<span class="eorzeatime3_wind">星3月<span class="eorzeatime3_txt"> （風／旧暦5月）</span></span>';}
  if(gameMonth == 6){gameMonth = '<span class="eorzeatime3_wind">霊3月<span class="eorzeatime3_txt"> （風／旧暦6月）</span></span>';}
  if(gameMonth == 7){gameMonth = '<span class="eorzeatime3_lightning">星4月<span class="eorzeatime3_txt"> （雷／旧暦7月）</span></span>';}
  if(gameMonth == 8){gameMonth = '<span class="eorzeatime3_lightning">霊4月<span class="eorzeatime3_txt"> （雷／旧暦8月）</span></span>';}
  if(gameMonth == 9){gameMonth = '<span class="eorzeatime3_fire">星5月<span class="eorzeatime3_txt"> （火／旧暦9月）</span></span>';}
  if(gameMonth == 10){gameMonth = '<span class="eorzeatime3_fire">霊5月<span class="eorzeatime3_txt"> （火／旧暦10月）</span></span>';}
  if(gameMonth == 11){gameMonth = '<span class="eorzeatime3_earth">星6月<span class="eorzeatime3_txt"> （土／旧暦11月）</span></span>';}
  if(gameMonth == 12){gameMonth = '<span class="eorzeatime3_earth">霊6月<span class="eorzeatime3_txt"> （土／旧暦12月）</span></span>';}
 gameYear = gameYear + '年 '
 var displayEorzeaTime1,displayEorzeaTime2,displayEorzeaTime3;
 displayEorzeaTime1 = gameMonth + gameDay + ' ' + gameHour + ':' + gameMinute;
 displayEorzeaTime2 = gameYear + gameMonth + gameDay + ' ' + gameHour + ':' + gameMinute + ':' + gameSecond;
 displayEorzeaTime3 = gameMonth + gameDay + gameHour;
return '<span id="eorzeatime">' + displayEorzeaTime1 + '</span><div id="eorzeaclock2"><span id="eorzeatime2">' + displayEorzeaTime2 + '</span><span id="eorzeatime3">' + displayEorzeaTime3 + '</span>';
}
function TimezoneDetect(){
 var dtDate = new Date('1/1/' + (new Date()).getUTCFullYear());
 var intOffset = 10000;
 var intMonth;
 var intHoursUtc;
 var intHours;
 var intDaysMultiplyBy;
  for(intMonth = 0; intMonth < 12; intMonth++){
  dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);
   if(intOffset > (dtDate.getTimezoneOffset() * (-1))){intOffset = (dtDate.getTimezoneOffset() * (-1));}
  }
return intOffset;
}
function DstDetect(){
 var dtDstDetect = new Date();
 var dtDstStart = '';
 var dtDstEnd = '';
 var dtDstStartHold = '';
 var intYearDayCount = 732;
 var intHourOfYear = 1;
 var intDayOfYear;
 var intOffset = TimezoneDetect();
 dtDstDetect = new Date()
 dtDstDetect.setUTCFullYear(dtDstDetect.getUTCFullYear() - 1);
 dtDstDetect.setUTCHours(0,0,0,0);
  for(intDayOfYear = 1; intDayOfYear <= intYearDayCount; intDayOfYear++){
  dtDstDetect.setUTCDate(dtDstDetect.getUTCDate() + 1);
   if((dtDstDetect.getTimezoneOffset() * (-1)) != intOffset && dtDstStartHold == ''){dtDstStartHold = new Date(dtDstDetect);}
   if((dtDstDetect.getTimezoneOffset() * (-1)) == intOffset && dtDstStartHold != ''){
   dtDstStart = new Date(dtDstStartHold);
   dtDstEnd = new Date(dtDstDetect);
   dtDstStartHold = '';
   dtDstStart.setUTCHours(dtDstStart.getUTCHours() - 48);
   dtDstEnd.setUTCHours(dtDstEnd.getUTCHours() - 48);
    for(intHourOfYear = 1; intHourOfYear <= 48; intHourOfYear++){
    dtDstStart.setUTCHours(dtDstStart.getUTCHours() + 1);
     if((dtDstStart.getTimezoneOffset() * (-1)) != intOffset){break;}
    }
    for(intHourOfYear = 1; intHourOfYear <= 48; intHourOfYear++){
    dtDstEnd.setUTCHours(dtDstEnd.getUTCHours() + 1);
     if((dtDstEnd.getTimezoneOffset() * (-1)) != (intOffset + 60)){break;}
    }
    if((new Date()).getTime() >= dtDstStart.getTime() && (new Date()).getTime() <= dtDstEnd.getTime()){return new Array(dtDstStart,dtDstEnd);}
   }
  }
return new Array(dtDstStart,dtDstEnd);
}

// ▼ ------------------------- ▼ moontime - 月齢（前後/カウントダウン）

function MoonTime(){
 var curTime = new Date();
 var baseDate = new Date();
 baseDate.setUTCFullYear(2010); baseDate.setUTCMonth(6); baseDate.setUTCDate(12); baseDate.setUTCHours(16); baseDate.setUTCMinutes(0); baseDate.setUTCSeconds(0);
 var unistart = baseDate.getTime();
 var uninow = curTime.getTime();
 var diff = uninow - unistart;
 var intoNew = diff % 134400000;
 var currPhase,into;
  if(intoNew <= 16800000){currPhase = 0; into = 16800000 - intoNew;}
  if(intoNew > 16800000 && intoNew <= 33600000){currPhase = 1; into = 33600000 - intoNew;}
  if(intoNew > 33600000 && intoNew <= 50400000){currPhase = 2; into = 50400000 - intoNew;}
  if(intoNew > 50400000 && intoNew <= 67200000){currPhase = 3; into = 67200000 - intoNew;}
  if(intoNew > 67200000 && intoNew <= 84000000){currPhase = 4; into = 84000000 - intoNew;}
  if(intoNew > 84000000 && intoNew <= 100800000){currPhase = 5; into = 100800000 - intoNew;}
  if(intoNew > 100800000 && intoNew <= 117600000){currPhase = 6; into = 117600000 - intoNew;}
  if(intoNew > 117600000){currPhase = 7; into = 134400000 - intoNew;}
 var curHour = Math.floor(into / 3600000); into = into - (curHour * 3600000);
 var curMinute = Math.floor(into / 60000); into = into - (curMinute * 60000);
 var curSecond = Math.floor(into / 1000);
  if(curMinute < 10){curMinute = '0' + curMinute;}
  if(curSecond < 10){curSecond = '0' + curSecond;}
 var curTime = curHour + ':' + curMinute + ':' + curSecond;
 var displayMoonTime;
  if(currPhase == 0){displayMoonTime = '<span class="moontime_WaningCrescent moontime_txt moontime_prev">（二十六夜）</span><span class="moontime_NewMoon">' + curTime + ' （新月）</span><span class="moontime_WaxingCrescent moontime_txt moontime_next">（三日月）</span>';}
  if(currPhase == 1){displayMoonTime = '<span class="moontime_NewMoon moontime_txt moontime_prev">（新月）</span><span class="moontime_WaxingCrescent">' + curTime + ' （三日月）</span><span class="moontime_WaxingHalfMoon moontime_txt moontime_next">（上弦の月）</span>';}
  if(currPhase == 2){displayMoonTime = '<span class="moontime_WaxingCrescent moontime_txt moontime_prev">（三日月）</span><span class="moontime_WaxingHalfMoon">' + curTime + ' （上弦の月）</span><span class="moontime_WaxingGibbous moontime_txt moontime_next">（十三夜）</span>';}
  if(currPhase == 3){displayMoonTime = '<span class="moontime_WaxingHalfMoon moontime_txt moontime_prev">（上弦の月）</span><span class="moontime_WaxingGibbous">' + curTime + ' （十三夜）</span><span class="moontime_FullMoon moontime_txt moontime_next">（満月）</span>';}
  if(currPhase == 4){displayMoonTime = '<span class="moontime_WaxingGibbous moontime_txt moontime_prev">（十三夜）</span><span class="moontime_FullMoon">' + curTime + ' （満月）</span><span class="moontime_WaningGibbous moontime_txt moontime_next">（十六夜）</span>';}
  if(currPhase == 5){displayMoonTime = '<span class="moontime_FullMoon moontime_txt moontime_prev">（満月）</span><span class="moontime_WaningGibbous">' + curTime + ' （十六夜）</span><span class="moontime_WaningHalfMoon moontime_txt moontime_next">（下弦の月）</span>';}
  if(currPhase == 6){displayMoonTime = '<span class="moontime_WaningGibbous moontime_txt moontime_prev">（十六夜）</span><span class="moontime_WaningHalfMoon">' + curTime + ' （下弦の月）</span><span class="moontime_WaningCrescent moontime_txt moontime_next">（二十六夜）</span>';}
  if(currPhase == 7){displayMoonTime = '<span class="moontime_WaningHalfMoon moontime_txt moontime_prev">（下弦の月）</span><span class="moontime_WaningCrescent">' + curTime + ' （二十六夜）</span><span class="moontime_NewMoon moontime_txt moontime_next">（新月）</span>';}
return displayMoonTime;
}

// ▼ ------------------------- ▼ earthtime - 地球時間

function EarthTime(){
 var curTime = new Date();
 var curMonth = curTime.getMonth() + 1;
 var curDay = curTime.getDate();
 var curHour = curTime.getHours();
 var curMinute = curTime.getMinutes();
 var curSecond = curTime.getSeconds();
  if(curMinute < 10){curMinute = '0' + curMinute;}
  if(curSecond < 10){curSecond = '0' + curSecond;}
return curMonth + '月'  + curDay + '日 ' + curHour + ':' + curMinute + ':' + curSecond + ' （地球）';
}

// ▼ ------------------------- ▼ levetime - リーヴ受注権（カウントダウン）

function LeveTime(){
 var curTime = new Date();
 var baseDate = new Date();
 baseDate.setUTCFullYear(2010); baseDate.setUTCMonth(6); baseDate.setUTCDate(12); baseDate.setUTCHours(0); baseDate.setUTCMinutes(0); baseDate.setUTCSeconds(0);
 var tUTC = curTime.getTime();
 var bUTC = baseDate.getTime();
  while (bUTC < tUTC){bUTC += (43200000); baseDate.setTime(bUTC);}
 var diff = bUTC - tUTC;
 var curHour = Math.floor(diff / (3600000)); diff -= (curHour * 3600000)
 var curMinute  = Math.floor(diff / (60000)); diff -= (curMinute * 60000)
 var curSecond  = Math.floor(diff / (1000));
  if(curMinute < 10){curMinute = '0' + curMinute;}
  if(curSecond < 10){curSecond = '0' + curSecond;}
return curHour + ':' + curMinute + ':' + curSecond + ' （リーヴ受注権）';
}

// ▼ ------------------------- ▼ AllClock - 表示

function EorzeaClock(){
 var eorzea = EorzeaTime();
 var moon = MoonTime();
 var earth = EarthTime();
 var leve = LeveTime();
document.getElementById('eorzeaclock').innerHTML = eorzea + '<span id="moontime">' + moon + '</span><span id="earthtime">' + earth + '</span><span id="levetime">' + leve + '</span></div>';
setTimeout('EorzeaClock()',1000);
}