document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');

    
    let tasks = JSON.parse(localStorage.getItem('savedTasks')) || [];

    
    renderTasks();

  
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        
        if (taskText === "") {
            alert("Please enter a task first!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveAndRefresh();
        taskInput.value = ""; 
    });

    function renderTasks() {
        taskList.innerHTML = ""; 
        let total = tasks.length;
        let completed = 0;

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.style.margin = "12px 0";
            li.style.padding = "10px";
            li.style.background = "#fdfdfd";
            li.style.border = "1px solid #e0e0e0";
            li.style.borderRadius = "6px";
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            if (task.completed) {
                completed++;
            }

            li.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span style="${task.completed ? 'text-decoration: line-through; color: gray;' : ''}">${task.text}</span>
                </div>
                <button class="delete-task" style="color: red; background: none; border: none; cursor: pointer; font-weight: bold;">X</button>
            `;

            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveAndRefresh();
            });

            li.querySelector('.delete-task').addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveAndRefresh();
            });

            taskList.appendChild(li);
        });

        if (totalTasksSpan) totalTasksSpan.textContent = total;
        if (completedTasksSpan) completedTasksSpan.textContent = completed;
    }

    function saveAndRefresh() {
        localStorage.setItem('savedTasks', JSON.stringify(tasks));
        renderTasks();
    }
});
