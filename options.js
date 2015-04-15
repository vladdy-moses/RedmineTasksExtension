function saveOptions() {
	var redmineBase = document.getElementById('redmineBase').value;
	var redmineProject = document.getElementById('redmineProject').value;
	var userApiKey = document.getElementById('userApiKey').value;
	var userQuery = document.getElementById('userQuery').value;
	
	chrome.storage.sync.set({
		redmineBase: redmineBase,
		redmineProject: redmineProject,
		userApiKey: userApiKey,
		userQuery: userQuery
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Данные успешно сохранены.';
		status.style.display = 'block';
		setTimeout(function() {
			status.style.display = 'none';
		}, 1500);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		redmineBase: 'http://redmine.ais.local/',
		redmineProject: 'hm-web',
		userApiKey: '',
		userQuery: '97'
	}, function(items) {
		document.getElementById('redmineBase').value = items.redmineBase;
		document.getElementById('redmineProject').value = items.redmineProject;
		document.getElementById('userApiKey').value = items.userApiKey;
		document.getElementById('userQuery').value = items.userQuery;
	});
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);