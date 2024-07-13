document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    if (task) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> ${task} <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = '';
        updateDeleteAllButton();
        saveTasks();
    }
}
function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    updateDeleteAllButton();
    saveTasks();
}
function updateDeleteAllButton() {
    const taskList = document.getElementById('taskList');
    const deleteAllButton = document.getElementById('deleteAll');
    if (taskList.children.length > 1) {
        deleteAllButton.style.display = 'inline-block';
    } else {
        deleteAllButton.style.display = 'none';
    }
}
function deleteAllTasks() {
    if (confirm('Do you  completed the task? Are you sure to delete it?')) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        updateDeleteAllButton();
        saveTasks();
    }
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const task = li.innerText.replace('Delete', '').trim();
        const completed = li.querySelector('input').checked;
        tasks.push({ task, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(({ task, completed }) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" ${completed ? 'checked' : ''}> ${task} <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
    });
    updateDeleteAllButton();
}

