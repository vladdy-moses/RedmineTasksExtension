var localConfig;

function getTasks() {
	document.getElementById("tasksWrapper").innerHTML = "Подождите, идёт загрузка информации из редмайна.";

	var xmlhttp = new XMLHttpRequest();
	var url = localConfig.redmineBase + 'projects/' + localConfig.redmineProject + '/issues.json?query_id=' + localConfig.userQuery + '&key=' + localConfig.userApiKey;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			printTasks(myArr);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function printTasks(tasksArray) {
	var out = '<table>';
	var i;
	for(i = 0; i < tasksArray.issues.length; i++) {
		out += '<tr data-id="' + tasksArray.issues[i].id + '">';
		out += '<td class="taskId">' + tasksArray.issues[i].id + '</td>';
		out += '<td class="taskSubject">' + tasksArray.issues[i].subject + '</td>';
		out += '<td class="taskStatus">' + tasksArray.issues[i].status.name + '</td>';
		out += '<td class="taskPriority">' + tasksArray.issues[i].priority.name + '</td>';
		out += '</tr>';
	}
	out += '</table>';
	document.getElementById("tasksWrapper").innerHTML = out;
	
	var rows = document.getElementById("tasksWrapper").getElementsByTagName('tr');
	for(i = 0; i < rows.length; i++) {
		rows[i].addEventListener("click", taskRowClick);
	};
	
	console.log(rows);
}

function taskRowClick() {
	var windowProperties = {
		url: chrome.extension.getURL("taskDetails.html#" + this.dataset.id),
		width: 500,
		height: 400,
		type: 'popup',
		focused: true
	};
	
	chrome.windows.create(windowProperties);
}

function restoreOptions() {
	chrome.storage.sync.get({
		redmineBase: 'http://redmine.ais.local/',
		redmineProject: 'hm-web',
		userApiKey: '',
		userQuery: '97'
	}, function(items) {
		localConfig = items;
		getTasks();
	});
}
document.addEventListener('DOMContentLoaded', restoreOptions);