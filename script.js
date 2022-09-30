const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTodo.addEventListener('click',filter);
document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(event) {
    event.preventDefault();

    if(!todoInput.value.trim()) return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoSpan = document.createElement('span');
    todoSpan.classList.add('todo-text');
    todoSpan.innerText = todoInput.value;
    todoDiv.appendChild(todoSpan);

    const todoSpan2 = document.createElement('span');
    todoSpan2.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoSpan2.innerHTML += '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(todoSpan2);

    todoList.appendChild(todoDiv);
    saveInLocalStorage(todoInput.value);
    todoInput.value = '';
}

function deleteCheck (event) {
    const item = event.target;

    if (item.classList[1] == 'fa-trash') {
        const todo = item.parentElement.parentElement;
        removeInLocalStorage(todo.innerText);
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    };

    if (item.classList[1] == 'fa-check') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
    };
}

function filter(event) {

    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all': todo.style.display = 'flex'; break;
            case 'completed': 
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                } break;
            case 'uncompleted': 
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                } break;
            default: todo.style.display = 'flex'; break;
        };
    });
};

function saveInLocalStorage(text) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(text);
    localStorage.setItem('todos',JSON.stringify(todos));
};

function removeInLocalStorage(text) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let index = todos.indexOf(text);
    const deletes = todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos));
};

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    todos.forEach(function(el) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const todoSpan = document.createElement('span');
        todoSpan.classList.add('todo-text');
        todoSpan.innerText = el;
        todoDiv.appendChild(todoSpan);
    
        const todoSpan2 = document.createElement('span');
        todoSpan2.innerHTML = '<i class="fa-solid fa-check"></i>';
        todoSpan2.innerHTML += '<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(todoSpan2);
    
        todoList.appendChild(todoDiv);
    });
};