let todos = [];
let showCompleted = true;

const newTodoInput = document.getElementById('newTodo');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todos');
const emptyMessage = document.getElementById('emptyMessage');
const todoListContainer = document.getElementById('todoList');
const toggleCompletedButton = document.getElementById('toggleCompleted');

function renderTodos() {
    if (todos.length === 0) {
        emptyMessage.style.display = 'block';
        todoListContainer.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        todoListContainer.style.display = 'block';
        
        todoList.innerHTML = '';
        const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);
        
        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));
            
            const span = document.createElement('span');
            span.textContent = todo.text;
            span.style.textDecoration = todo.completed ? 'line-through' : 'none';
            
            li.appendChild(checkbox);
            li.appendChild(span);
            todoList.appendChild(li);
        });
        
        toggleCompletedButton.style.display = todos.some(todo => todo.completed) ? 'block' : 'none';
    }
}

function addTodo() {
    const text = newTodoInput.value.trim();
    if (text !== '') {
        todos.push({ text, completed: false });
        newTodoInput.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function toggleCompletedTasks() {
    showCompleted = !showCompleted;
    toggleCompletedButton.textContent = showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks';
    renderTodos();
}

addTodoButton.addEventListener('click', addTodo);
toggleCompletedButton.addEventListener('click', toggleCompletedTasks);

renderTodos();