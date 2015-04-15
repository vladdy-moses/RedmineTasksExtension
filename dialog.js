var hash = window.location.hash;

//document.getElementById("test").innerHTML = hash;
document.title += ' ' + hash;

function restore_options() {
	var configKey = 'issues' + hash;
	var configData = {};
	configData[configKey] = undefined;
	
	chrome.storage.sync.get(configData, function(items) {
		if(typeof(items[configKey]) !== 'undefined') {
			document.getElementById("test").innerHTML = 'Есть данные по этой задаче.';
		} else {
			document.getElementById("test").innerHTML = 'По данной задаче данных нет.';
		}
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('testDataFill').addEventListener('click', testDataFill);