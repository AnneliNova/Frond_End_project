// const toggle = document.getElementById('myToggle');

// toggle.addEventListener('change', () => {
//     if (toggle.checked) {
//         window.location.href = 'theme.html';
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// if (window.location.href.includes('theme.html')) {
//     toggle.checked = true;
// }

function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}

<<<<<<< HEAD
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            try {
                return JSON.parse(decodeURIComponent(cookie.substring(nameEQ.length)));
            } catch(e) {
                return null;
            }
        }
    }
    return null;
}

let lessons = getCookie('lessons') || [];
let homework = getCookie('homework') || [];

const addLessonBtn = document.querySelector('.add-lesson-btn');
const addHomeworkBtn = document.querySelector('.add-homework-btn');
const lessonInput = document.querySelector('.add-lesson-container .name');
const chooseLesson = document.querySelector('.choose-lesson');
const homeworkInput = document.querySelector('.add-homework-container .name');
const scheduleDiv = document.querySelector('.shedule');
const toggleSwitch = document.querySelector('#myToggle');

const savedTheme = getCookie('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleSwitch) toggleSwitch.checked = true;
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        setCookie('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light', 365);
    });
}

if (addLessonBtn) {
    addLessonBtn.addEventListener('click', () => {
        const lessonName = lessonInput.value.trim();
        if (lessonName && lessonName !== 'Додати урок') {
            lessons.push(lessonName);
            setCookie('lessons', lessons, 365);
            
            const newOption = document.createElement('option');
            newOption.value = lessonName;
            newOption.textContent = lessonName;
            chooseLesson.appendChild(newOption);
            
            lessonInput.value = 'Додати урок';
            display();
        }
    });
}

if (addHomeworkBtn) {
    addHomeworkBtn.addEventListener('click', () => {
        const selectedLesson = chooseLesson.value;
        const homeworkText = homeworkInput.value.trim();
        
        if (selectedLesson !== 'example' && homeworkText && homeworkText !== 'Додати домашку') {
            homework.push({ lesson: selectedLesson, task: homeworkText });
            setCookie('homework', homework, 365);
            homeworkInput.value = 'Додати домашку';
            display();
        }
    });
}

function display() {
    scheduleDiv.innerHTML = '<h3>Розклад:</h3>';
    
    if (lessons.length > 0) {
        const lessonsTitle = document.createElement('h4');
        lessonsTitle.textContent = 'Уроки:';
        scheduleDiv.appendChild(lessonsTitle);
        
        lessons.forEach((lesson, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${lesson}`;
            p.style.cursor = 'pointer';
            p.addEventListener('click', () => {
                lessons.splice(index, 1);
                setCookie('lessons', lessons, 365);
                display();
            });
            scheduleDiv.appendChild(p);
        });
    }
    
    if (homework.length > 0) {
        const hwTitle = document.createElement('h4');
        hwTitle.textContent = 'Домашка:';
        hwTitle.style.marginTop = '15px';
        scheduleDiv.appendChild(hwTitle);
        
        homework.forEach((hw, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${hw.lesson}: ${hw.task}`;
            p.style.cursor = 'pointer';
            p.addEventListener('click', () => {
                homework.splice(index, 1);
                setCookie('homework', homework, 365);
                display();
            });
            scheduleDiv.appendChild(p);
        });
    }
}

window.addEventListener('load', display);
=======










const numTasks = 8;
const scheduleList = document.getElementById('schedule-list');
const storageKey = 'schedule_general'; 

const tasks = [];
for (let i = 1; i <= numTasks; i++) {
    tasks.push({ id: `task-${i}`, name: `Урок ${i} - Домашнє завдання` });
}

function loadTaskState(key, taskId) {
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    return state[taskId] === true;
}

function saveTaskState(key, taskId, isChecked) {
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    state[taskId] = isChecked;
    localStorage.setItem(key, JSON.stringify(state));
}

function renderSchedule() {
    scheduleList.innerHTML = '';
    
    tasks.forEach(task => {
        const isChecked = loadTaskState(storageKey, task.id);

        const itemHTML = `
            <div class="task-item">
                <input type="checkbox" id="${task.id}" class="task-checkbox" ${isChecked ? 'checked' : ''}>
                
                <span class="task-name">${task.name}</span>
                
                <label for="${task.id}" class="checkbox-label">★</label>
            </div>
        `;
        scheduleList.innerHTML += itemHTML;
    });

    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            saveTaskState(storageKey, e.target.id, e.target.checked);
        });
    });
}

renderSchedule();

>>>>>>> 917e5a5f7c4bb024f2dd0302ad1d57ccbb496d6a
