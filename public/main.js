let workTimeDuration = 5,
	breakTimeDuration = 1,
	currentToDo = 0,
 	toDoArr = [];

query('#to-do-form')
	.addEventListener('submit', (event) => {
		event.preventDefault();

		const todoInput = query('#to-do');

		if (todoInput.value){
			toDoArr.push(todoInput.value);
			updatePreview();
			todoInput.value = '';
		}
	});

query('#clear-button')
	.addEventListener('click', (event) => {
		event.preventDefault();

		toDoArr = [];
		updatePreview();
	});

function updatePreview() {
	query('#todo-list-preview').textContent = `Your to-do's: ${toDoArr.join(', ')}`;
}

function workOnATask() {

	setToDo(toDoArr[currentToDo++]);
	setMessage('Start working!');
	showProgressForDuration(workTimeDuration);

	setTimeout(() => {
		if (currentToDo === toDoArr.length){
			setToDo("Nothing");
			setMessage("Congratulations! You have finished your to-do's!");
			return;
		}
		ringAlarm();
		setMessage('Stop working!');
		setToDo('Enjoy your break');

		showProgressForDuration(breakTimeDuration);
		setTimeout(() => {
			ringAlarm();
			workOnATask();
		}, breakTimeDuration);
	}, workTimeDuration);

}

function ringAlarm() {
	query('#alert-tone').play();
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

function setToDo(message) {
	query('#currentToDo').textContent = `Current To-Do: ${message}`;
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
		currentToDo = 0;
		workOnATask();
	});
