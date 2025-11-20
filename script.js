const toggle = document.getElementById('myToggle');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        window.location.href = 'theme.html';
    } else {
        window.location.href = 'index.html';
    }
});

if (window.location.href.includes('theme.html')) {
    toggle.checked = true;
}











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

