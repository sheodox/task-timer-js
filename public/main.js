let workTimeDuration = 5,
    breakTimeDuration = 1,
    currentToDo = 0,
    toDoArr = [];

query('#to-do-form')
    .addEventListener('submit', (event) => {
        event.preventDefault();

        const todoInput = query('#to-do');

        if (todoInput.value) {
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

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function workOnATask() {
    setToDo(toDoArr[currentToDo++]);
    setMessage('Start working!');
    showProgressForDuration(workTimeDuration);

    await wait(workTimeDuration);
}

async function workOnBreak() {
    ringAlarm();
    setMessage('Stop working!');
    setToDo('Enjoy your break');

    showProgressForDuration(breakTimeDuration);
    await wait(breakTimeDuration);
}

function endTimer() {
    ringAlarm();
    const mainElements = document.querySelectorAll('main *');

    mainElements.forEach((element) => {
        element.style.display='none';
    });
    //<iframe width="1903" height="775" src="https://www.youtube.com/embed/1Bix44C1EzY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    const iframe = document.createElement("iframe");
    const reload = document.createElement('button');
    const main = query('main');
    main.appendChild(iframe);
    main.appendChild(reload);
    iframe.setAttribute('allow', 'autoplay');
    iframe.src="https://www.youtube.com/embed/1Bix44C1EzY";
    iframe.style.width='1280px';
    iframe.style.height='720px';
    reload.textContent='Reload';
    reload.addEventListener("click", () => {
        location.reload();
    })
}

async function doWork() {
    await workOnATask();

    if (currentToDo < toDoArr.length) {
        await workOnBreak();
        doWork();
    }
    else {
        endTimer();
    }
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

        doWork();
    });
