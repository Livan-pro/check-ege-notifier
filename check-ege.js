var ver = "1.0.2";
var checkTimer, frame, lastTable;

function init() {
	var html = '<div id="notificationControl" style="position:absolute;background-color:white;border:1px solid #bebfc1;left:20px;top:20px;padding:10px"><button style="margin:5px" id="notify-button" onclick="switchNotifications();">Включить уведомления</button><br><button style="margin:5px" onclick="changeNotify();">Проверить уведомление</button><br><button style="margin:5px" onclick="updatePage();">Обновить</button><br><span style="margin:5px">Уведомления: <span id="notification-status" style="color:red">выключены</span></span><br><span style="margin:5px">Последнее обновление страницы: <span id="lastUpdate">не обновлялась</span></span><br><span style="margin:5px">Версия скрипта: '+ver+'</span></div>';
	document.body.innerHTML = html+'<iframe id="mainframe" src="http://check.ege.edu.ru/exams" style="display:block;width:100%;height:100%;border:0px"></iframe>';
	document.body.style.marginLeft = "0px";
	document.body.style.marginRight = "0px";
	document.body.style.marginTop = "0px";
	document.body.style.marginBottom = "0px";
	document.body.style.height = "100%";
	document.body.parentElement.style.height = "100%";
	frame = document.getElementById("mainframe");
	frame.onload = onFrameLoad;
	if(window.localStorage.notify === undefined)
		window.localStorage.notify = "false";
	if(window.localStorage.notify == "true")
		enableNotifications();
}

function switchNotifications() {
	if(window.localStorage.notify != "true")
		tryEnableNotifications();
	else
		disableNotifications()
}

function tryEnableNotifications() {
	Notification.requestPermission(function(result) {
		if(result == "granted")
			enableNotifications();
	});
}

function enableNotifications() {
	window.localStorage.notify = "true";
	checkTimer = setInterval(updatePage, 60000);
	
	var el = document.getElementById("notification-status");
	el.style.color = "green";
	el.innerHTML = 'включены';
	
	document.getElementById("notify-button").innerHTML = "Выключить уведомления";
}

function disableNotifications() {
	window.localStorage.notify = "false";
	clearInterval(checkTimer);
	
	var el = document.getElementById("notification-status");
	el.style.color = "red";
	el.innerHTML = 'выключены';
	
	document.getElementById("notify-button").innerHTML = "Включить уведомления";
}

function updatePage() {
	frame.src = frame.src;
}

function onFrameLoad() {
	var now = new Date();
	document.getElementById("lastUpdate").innerHTML = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	frame.style.height = frame.contentWindow.document.body.scrollHeight + 'px';
	if(window.localStorage.notify == "true") {
		if(lastTable != frame.contentDocument.getElementById("table-container").innerHTML)
			changeNotify();
	}
	lastTable = frame.contentDocument.getElementById("table-container").innerHTML;
}

function changeNotify() {
	new Notification("Результаты ЕГЭ изменены", {
		tag : "ege",
		body : "На сайте check.ege.edu.ru обновились результаты экзаменов",
		icon : "data:image/gif;base64,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"
	});
}

init();
