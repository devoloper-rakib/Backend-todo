'use strict';

console.log('working ....');

// Point: All the variables
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');
let todos = [];

input.focus();

// Point: Todos - Fetch todos from the backend on page load

async function fetchTodos() {
	try {
		const res = await fetch('http://localhost:5000/api/v1/todo');
		const data = await res.json();
		todos = data.message || [];
		console.log(data);
		renderTodos();
	} catch (err) {
		console.log(err);
	}
}

fetchTodos();

// Point: All the event listeners
form.addEventListener('submit', (e) => {
	e.preventDefault();
	addTodo();
	renderTodos();
});

function addTodo() {
	const todoText = input.value.trim();
	if (todoText) {
		const todo = {
			title: todoText,
			completed: false,
		};

		fetch('http://localhost:5000/api/v1/todo/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		})
			.then((res) => res.json())
			.then((data) => {
				todos.push(data.todo);
				input.value = '';
				fetchTodos();
			})
			.catch((err) => console.log(err));
	}
}

// Point: Add todo to the UI
function addTodoElement(todo) {
	const todoElement = document.createElement('li');
	todoElement.innerHTML = `
    <span class="todo-text">${todo.title}</span>
    <div class="todo-options">
      <button class="complete-button">
        <i class="fas fa-check-circle"></i>
      </button>
      <button class="edit-button">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
	todoElement.classList.add('todo-item');
	if (todo.completed) {
		todoElement.classList.add('completed');
	}

	const todoText = todoElement.querySelector('.todo-text');
	todoText.addEventListener('click', () => {
		toggleTodoCompletion(todo._id);
	});

	const completeButton = todoElement.querySelector('.complete-button');
	completeButton.addEventListener('click', (e) => {
		e.stopPropagation();
		toggleTodoCompletion(todo._id);
	});

	const editButton = todoElement.querySelector('.edit-button');
	editButton.addEventListener('click', (e) => {
		e.stopPropagation();
		handleEdit(todoElement, todo._id);
	});

	const deleteButton = todoElement.querySelector('.delete-button');
	deleteButton.addEventListener('click', (e) => {
		e.stopPropagation();
		deleteTodoElement(todo._id);
	});

	todoElement.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		deleteTodoElement(todo._id);
	});

	todosUl.appendChild(todoElement);
}

function handleEdit(todoElement, todoId) {
	const todoText = todoElement.querySelector('.todo-text');
	const currentText = todoText.textContent;
	const newText = prompt('Enter new text:', currentText);

	if (newText !== null) {
		const updatedTodo = todos.find((todo) => todo._id === todoId);
		updatedTodo.text = newText;

		fetch(`http://localhost:5000/api/v1/todo/${todoId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: newText }),
		})
			.then((res) => res.json())
			.then((data) => {
				fetchTodos();
			})
			.catch((err) => console.log(err));
	}
}

function toggleTodoCompletion(todoId) {
	const todo = todos.find((todo) => todo._id === todoId);
	todo.completed = !todo.completed;

	fetch(`http://localhost:5000/api/v1/todo/${todoId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ completed: todo.completed }),
	})
		.then((res) => res.json())
		.then((data) => {
			renderTodos();
			updateLocalStorage();
		})
		.catch((err) => console.log(err));
}

function deleteTodoElement(todoId) {
	todos = todos.filter((todo) => todo._id !== todoId);

	fetch(`http://localhost:5000/api/v1/todo/${todoId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			renderTodos();
			updateLocalStorage();
		})
		.catch((err) => console.log(err));
}

function renderTodos() {
	todosUl.innerHTML = '';
	todos.forEach((todo) => addTodoElement(todo));
}

function updateLocalStorage() {
	localStorage.setItem('todos', JSON.stringify(todos));
}
