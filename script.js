document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTasksList();
        updateStats();
    }


    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.body.classList.toggle('dark-mode', storedTheme === 'dark');
    }

    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
        localStorage.setItem('theme', theme);
    });
});

let tasks = []; 

const saveTasks = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () =>{
    const taskInput = document.getElementById('taskInput')
    const task = taskInput.value.trim();

    const priorityInput = document.getElementById('priorityInput');
    const priority = priorityInput.value;

    const deadlineInput = document.getElementById('deadlineInput');
    const deadline = deadlineInput.value;

    if(task){
        tasks.push({ text: task, completed: false, priority:priority, deadline:deadline});
        taskInput.value = '';
        priorityInput.value = 'low';
        deadlineInput.value = '';
        updateTasksList();
        updateStats();
        saveTasks();
    }
    console.log(tasks);
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateStats();
    saveTasks();
};
const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) =>{
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const deadlineInput = document.getElementById('deadlineInput');
    taskInput.value = tasks[index].text;
    priorityInput.value = tasks[index].priority;
    deadlineInput.value = tasks[index].deadline;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () =>{
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress')
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks} `;

    if(tasks.length && completeTasks == totalTasks){
        blastConfetti();
    }
};

const updateTasksList = () =>{
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task,index) =>{
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed': ''}">
                    <input type="checkbox" class="checkbox" ${ task.completed ? "checked": "" }/>
                    <p><b>Task :</b> ${task.text} <br> <b>Priority : </b>${task.priority} <br> <b>Deadline :</b> ${task.deadline}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-pen-to-square" style="color: #008080" onclick="editTask(${index})"></i>
                    <i class="fa-solid fa-trash-can" style="color: red" onclick="deleteTask(${index})"></i>
                </div>
            </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
}

document.getElementById("newTask").addEventListener('click', function(e){
    e.preventDefault();
    addTask();
});

const blastConfetti = () =>{
    const count = 200,
    defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}