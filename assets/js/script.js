// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let currentId = nextId;
  nextId += 1;
  localStorage.setItem('nextId', JSON.stringify(nextId));
  return currentId;
}

// Grab references to the important DOM elements.
const taskFormEl = $(`#taskForm`);
const taskTitleInputEl = $(`#taskTitle`);
const taskDueDateInputEl = $(`#taskDueDate`);
const taskDescriptionInputEl = $('#taskDescription');
const todoListEl = $('#todo-cards');
const inProgressListEl = $('#in-progress-cards');
const doneListEl = $('#done-cards');

function readTasksFromStorage() {
  return taskList;
}

// ? Accepts an array of projects, stringifys them, and saves them in localStorage.
function saveTasksToStorage(tasks) {
  taskList = tasks;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card task-card my-3 draggable')
    .attr('data-task-id', task.id);

  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(`Due: ${task.dueDate}`);

  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger btn-sm delete-task')
    .text('Delete')
    .attr('data-task-id', task.id)
    .on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  todoListEl.empty();
  inProgressListEl.empty();
  doneListEl.empty();

  tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    if (task.status === 'to-do') {
      todoListEl.append(taskCard);
    } else if (task.status === 'in-progress') {
      inProgressListEl.append(taskCard);
    } else if (task.status === 'done') {
      doneListEl.append(taskCard);
    }
  });

  // Make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
  
    helper: function (e) {
     
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });


  // Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event) {

  event.preventDefault();

  // Reads user input from the form
  const title = taskTitleInputEl.val();
  const description = taskDescriptionInputEl.val();
  const dueDate = taskDueDateInputEl.val();

  // Pulls the tasks from localStorage and pushes the new task to the array
  const tasks = readTasksFromStorage();

  const newTask = {
    id: generateTaskId(),
    title,
    description,
    dueDate: dayjs(dueDate).format('MM/DD/YYYY'), // Fixed date format
    status: 'to-do',
  };

  tasks.push(newTask);

  // Save the updated project array to localStorage
  saveTasksToStorage(tasks);

  // Hide the modal after adding task
  $('#formModal').modal('hide');

  // Append the new task card to the 'To Do' lane

  const taskCard = createTaskCard(newTask);
  todoListEl.append(taskCard);
  $('.draggable').draggable({
    revert: 'invalid',
    zIndex: 100,
    helper: 'clone',
    snap: '.lane',
    snapMode: 'inner',
    snapTolerance: 30,
  });

  // Clear the form inputs
  taskFormEl[0].reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).attr('data-task-id');
  let tasks = readTasksFromStorage();

  // Filter out the task to be deleted
  tasks = tasks.filter((task) => task.id != taskId);
  saveTasksToStorage(tasks);
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.attr('data-task-id');
  const newStatus = $(this).attr('id').replace('-cards', '');

  const tasks = readTasksFromStorage();
  const taskIndex = tasks.findIndex((task) => task.id == taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    saveTasksToStorage(tasks);
    renderTaskList();

    
  }
}

renderTaskList();

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  taskFormEl.on('submit', handleAddTask);
});
