// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('task-list');
  const totalEl = document.getElementById('total');
  const completedEl = document.getElementById('completed');
  
  list.innerHTML = '';
  let completedCount = 0;

  tasks.forEach((task, index) => {
    if (task.done) completedCount++;

    const li = document.createElement('li');
    li.innerHTML = `
      <span style="${task.done ? 'text-decoration:line-through' : ''}">${task.text}</span>
      <button onclick="markDone(${index})">Done</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    list.appendChild(li);
  });

  if (totalEl) totalEl.textContent = 'Total Tasks: ' + tasks.length;
  if (completedEl) completedEl.textContent = 'Completed Tasks: ' + completedCount;
}

function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  input.value = '';
}

function markDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Run on page load
renderTasks();
