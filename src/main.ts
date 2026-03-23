// Интерфейс Todo
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Находим все DOM-элементы
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addButton = document.getElementById('addButton') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

// Создаем массив todos
let todos: Todo[] = [];

// Счетчик для генерации ID
let nextId: number = 1;

// Функция для отрисовки массива в списке
function render(): void {
    // Очищаем список
    taskList.innerHTML = '';
    
    // Проходим по всем todo и создаем элементы списка
    todos.forEach(todo => {
        // Создаем элемент списка
        const li = document.createElement('li');
        
        // Создаем контейнер для чекбокса и текста
        const taskContainer = document.createElement('div');
        taskContainer.style.display = 'flex';
        taskContainer.style.alignItems = 'center';
        taskContainer.style.gap = '10px';
        taskContainer.style.flex = '1';
        
        // Создаем чекбокс
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleComplete(todo.id));
        
        // Создаем текст задачи
        const taskText = document.createElement('span');
        taskText.textContent = todo.text;
        if (todo.completed) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#888';
        }
        
        // Создаем кнопку удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));
        
        // Собираем элементы
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        li.appendChild(taskContainer);
        li.appendChild(deleteButton);
        
        taskList.appendChild(li);
    });
}

// Функция для добавления нового дела
function addTodo(): void {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Пожалуйста, введите задачу!');
        return;
    }
    
    // Создаем новый todo
    const newTodo: Todo = {
        id: nextId++,
        text: taskText,
        completed: false
    };
    
    // Добавляем в массив
    todos.push(newTodo);
    
    // Перерисовываем список
    render();
    
    // Очищаем поле ввода и фокусируемся
    taskInput.value = '';
    taskInput.focus();
}

// Функция для удаления дела
function deleteTodo(id: number): void {
    // Фильтруем массив, оставляя все элементы, кроме того, который нужно удалить
    todos = todos.filter(todo => todo.id !== id);
    
    // Перерисовываем список
    render();
}

// Функция для переключения статуса completed
function toggleComplete(id: number): void {
    // Находим todo по id и меняем его статус
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        render();
    }
}

// Навешиваем обработчик на кнопку "Добавить"
addButton.addEventListener('click', addTodo);

// Добавляем возможность добавлять задачу по нажатию Enter
taskInput.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Для демонстрации добавим несколько тестовых задач (опционально)
// Раскомментируйте, если хотите увидеть пример
/*
const testTodos: Todo[] = [
    { id: nextId++, text: 'Изучить TypeScript', completed: true },
    { id: nextId++, text: 'Создать проект с Vite', completed: false },
    { id: nextId++, text: 'Реализовать Todo-лист', completed: false }
];
todos.push(...testTodos);
render();
*/