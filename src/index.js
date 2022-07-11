document.getElementById('formTask').addEventListener('submit', saveTask);  // eslint-disable-line

function saveTask(e) {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const task = {
    title,
    description,
  };

  if (localStorage.getItem('tasks') === null) {
    const tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  document.getElementById('formTask').reset();
  e.preventDefault();
  getTasks();  // eslint-disable-line
}

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const tasksView = document.getElementById('tasks');

  tasksView.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {  // eslint-disable-line
    const { title } = tasks[i];
    const { description } = tasks[i];

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body"><p>${title} - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${title}')">
        Delete</a></div>
        </div>`;
  }
}

function deleteTask(title) {  // eslint-disable-line
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  for (let i = 0; i < tasks.length; i++) { // eslint-disable-line
    if (tasks[i].title == title) {  // eslint-disable-line
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}
getTasks();