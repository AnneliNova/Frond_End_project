function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}

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
const dynamicListDiv = document.getElementById('dynamic-list');
const staticScheduleList = document.getElementById('static-schedule-list');
const toggleSwitch = document.querySelector('#myToggle');
const storageKey = 'schedule_general';

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

function loadTaskState(key, taskId) {
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    return state[taskId] === true;
}

function saveTaskState(key, taskId, isChecked) {
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    state[taskId] = isChecked;
    localStorage.setItem(key, JSON.stringify(state));
}

function display() {
    dynamicListDiv.innerHTML = ''; 
    
    if (lessons.length > 0) {
        const lessonsTitle = document.createElement('h4');
        lessonsTitle.textContent = 'Уроки:';
        dynamicListDiv.appendChild(lessonsTitle);
        
        lessons.forEach((lesson, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${lesson}`;
            p.addEventListener('click', () => {
                const lessonName = lessons[index];
                homework = homework.filter(h => h.lesson !== lessonName);
                setCookie('homework', homework, 365);
                
                lessons.splice(index, 1);
                setCookie('lessons', lessons, 365);
                display();
            });
            dynamicListDiv.appendChild(p);
        });
    }
    
    if (homework.length > 0) {
        const hwTitle = document.createElement('h4');
        hwTitle.textContent = 'Домашка:';
        hwTitle.style.marginTop = '15px';
        dynamicListDiv.appendChild(hwTitle);
        
        homework.forEach((hw, index) => {
            const lessonIndex = lessons.indexOf(hw.lesson);
            if (lessonIndex !== -1) {
                const isCompleted = loadTaskState(storageKey, `task-${lessonIndex + 1}`);
                if (isCompleted) return;
            }

            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${hw.lesson}: ${hw.task}`;
            p.addEventListener('click', () => {
                homework.splice(index, 1);
                setCookie('homework', homework, 365);
                display();
            });
            dynamicListDiv.appendChild(p);
        });
    }
}

window.addEventListener('load', display);

const numTasks = 8;
const tasks = [];
for (let i = 1; i <= numTasks; i++) {
    tasks.push({ id: `task-${i}`, name: `Урок ${i} - Домашнє завдання` });
}

function renderSchedule() {
    staticScheduleList.innerHTML = '';
    
    tasks.forEach(task => {
        const isChecked = loadTaskState(storageKey, task.id);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('task-item');
        if (isChecked) {
            itemDiv.classList.add('completed');
        }

        itemDiv.innerHTML = `
            <span class="task-name">${task.name}</span>
            <div class="checkbox-wrapper">
                <input type="checkbox" id="${task.id}" class="task-checkbox" ${isChecked ? 'checked' : ''}>
                <label for="${task.id}" class="star-label">★</label>
            </div>
        `;
        staticScheduleList.appendChild(itemDiv);
    });

    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskId = e.target.id;
            const isChecked = e.target.checked;
            saveTaskState(storageKey, taskId, isChecked);
            
            const taskItem = e.target.closest('.task-item');
            if (taskItem) {
                if (isChecked) {
                    taskItem.classList.add('completed');
                } else {
                    taskItem.classList.remove('completed');
                }
            }
            display();
        });
    });
}

renderSchedule();