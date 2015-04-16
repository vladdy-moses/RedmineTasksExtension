var hash = window.location.hash;
var configKey = 'issues' + hash;

//document.getElementById("test").innerHTML = hash;
document.title += ' ' + hash;

function testDataFill() {
	var configData = {};
	var issueConfig = {};
	
	//issueConfig.times
	issueConfig.interval = [];
	issueConfig.interval[0] = {};
	issueConfig.interval[0].name = 'Страдал фигнёй';
	issueConfig.interval[0].time = 1600;
	issueConfig.interval[1] = {};
	issueConfig.interval[1].name = 'Сведение БД';
	issueConfig.interval[1].time = 3600;
	
	configData[configKey] = issueConfig;
	
	chrome.storage.sync.set(configData, function() {
		alert('Данные записаны. Страницы будет перезагружена.');
		window.location.href += hash.substring(1);
		window.location.reload();
	});
}

function taskLoadData(taskInfo) {
	var intervalTable = '<table border="1">';
	for(i = 0; i < taskInfo.interval.length; i++) {
		intervalTable += '<tr><td>' + (1+i) + '</td><td>' + taskInfo.interval[i].name + '</td><td>' + taskInfo.interval[i].time + '</td></tr>';
	}
	intervalTable += '</table>';
	document.getElementById("test").innerHTML += intervalTable;
}

function restoreOptions() {
	var configData = {};
	configData[configKey] = false;
	
	chrome.storage.sync.get(configData, function(items) {
		console.log(items);
		if(items[configKey] !== false) {
			document.getElementById("test").innerHTML = 'Есть данные по этой задаче.';
			taskLoadData(items[configKey]);
		} else {
			document.getElementById("test").innerHTML = 'По данной задаче данных нет.';
		}
	});
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('testDataFill').addEventListener('click', testDataFill);