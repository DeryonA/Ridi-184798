const formTask = document.getElementById('formTask');
const listTask = document.getElementById('listTask');
const countTask = document.getElementById('countTask');

let countCompletedTask = 0;

const tasks = [
    { name: 'Implementar tela de listagem de tarefas', tag: 'frontend', created: '21/08/2024', done: false},
    { name: 'Criar endpoint para cadastro de tarefas', tag: 'backend', created: '21/08/2024', done: false},
    { name: 'Implementar protótipo da listagem de tarefas', tag: 'ux', created: '21/08/2024', done: true},
];

function updateTaskCount() {
    countTask.textContent = `${countCompletedTask} tarefa${countCompletedTask !== 1 ? 's' : ''} concluída${countCompletedTask !== 1 ? 's' : ''}`;
}

function createElementTask(task, index) {
    const li = document.createElement('li');
    li.className = 'task';

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const text = document.createElement('p');
    text.textContent = task.name;
    if (task.done) text.classList.add('concluido_texto');

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = task.tag;

    const date = document.createElement('span');
    date.textContent = `Criado em: ${task.created}`;

    taskInfo.appendChild(text);
    taskInfo.appendChild(tag);
    taskInfo.appendChild(date);

    const button = document.createElement('button');
    if (task.done) {
        button.innerHTML = '✓';
        button.className = 'concluida';
    } else {
        button.textContent = 'concluir';
        button.className = 'concluir';
        button.onclick = () => {
            task.done = true;
            countCompletedTask++;
            renderTask();
        };
    }

    li.appendChild(taskInfo);
    li.appendChild(button);

    return li;
}

function renderTask() {
    listTask.innerHTML = '';
    countCompletedTask = 0;

    tasks.forEach((task, i) => {
        if (task.done) countCompletedTask++;
        const elementTask = createElementTask(task, i);
        listTask.appendChild(elementTask);
    });

    updateTaskCount();
}

formTask.addEventListener('submit', (d) => {
    d.preventDefault();

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!name) return;

    const newTask = {
        name,
        tag: description || 'geral',
        created: new Date().toLocaleDateString('pt-BR'),
        done: false,
    };

    tasks.push(newTask);
    renderTask();

    formTask.reset();
});

renderTask();