let workTimeDuration = 5,
	breakTimeDuration = 1;

function workOnATask() {
	console.log('Start working!');
	setTimeout(() => {
		console.log('Stop working!');

		setTimeout(workOnATask, breakTimeDuration * 1000);
	}, workTimeDuration * 1000);
}

function query(selector) {
	return document.querySelector(selector);
}

document
	.getElementById('times-form')
	.addEventListener('submit', (event) => {
		event.preventDefault();

		workTimeDuration = parseInt(query('#work-duration').value, 10);
		breakTimeDuration = parseInt(query('#break-duration').value, 10);

		workOnATask();
	});
