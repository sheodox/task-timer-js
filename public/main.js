let workTimeDuration = 5,
	breakTimeDuration = 1;

function workOnATask() {
	setMessage('Start working!');
	showProgressForDuration(workTimeDuration);

	setTimeout(() => {
		setMessage('Stop working!');

		showProgressForDuration(breakTimeDuration);
		setTimeout(workOnATask, breakTimeDuration);
	}, workTimeDuration);
}

let updateInterval;
function showProgressForDuration(duration) {
	const startTime = Date.now(),
		bar = query('#status-progress');

	bar.max = duration;
	clearInterval(updateInterval);

	updateInterval = setInterval(() => {
		bar.value = Date.now() - startTime;
	}, 20);
}

/**
 * Shortcut for document.querySelector
 * @param selector - css selector
 * @returns {HTMLElement}
 */
function query(selector) {
	return document.querySelector(selector);
}

function setMessage(message) {
	query('#status').textContent = message;
}

document
	.getElementById('times-form')
	.addEventListener('submit', (event) => {
		event.preventDefault();

		workTimeDuration = parseInt(query('#work-duration').value, 10) * 1000;
		breakTimeDuration = parseInt(query('#break-duration').value, 10) * 1000;

		workOnATask();
	});
