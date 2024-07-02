
# Challenge 5 - Third-Party APIs Challenge: Task Board

## Description

- Web Page Task Board
- When page opens, task cards saved into localStorage previously are placed in the column when page was opened last.
- Using the "Add Task" button at the top of the HTML page which opens a form when clicked.
- When a new task cards is created, it is placed in the "to-do" status column.
- The cards are given a yellow background if the task due date is the current date. If the task due date has passed, it is given a red background.
- All task cards can be dragged to a different status columns, "to-do", "in-progress" or "done".
- If the card is yellow or red, and dropped into the "done" column, the card background is changed to white.
- The user can also delete a task by clicking the "delete" button within the task.
- When a task card has a status change or is deleted, the localStorage is updated.

### Tasks completed
- Implemented JQuery UI "draggable" capability to task cards and made status columns "droppable".
- Each task is color cordinated depending on date it is due.
- Created a hidden modal to HTML page that opens when the user event is triggered by clicking the "Add Task" button.
- Tasks save to localStorage and will stay in place when reloaded. If a task is deleted, local storage will be updated.


# Live Web Page

To run this project, navigate to: [Task Board]( https://natale565.github.io/third-party-API-task-board/)



# Screen Shots of web page

![task board 1](/third-party-API-task-board/assets/Images/Screenshot%202024-07-01%20at%206.23.06 PM.png)
![task board 2](/third-party-API-task-board/assets/Images/Screenshot%202024-07-01%20at%206.23.13 PM.png)
![task board 3](/third-party-API-task-board/assets/Images/Screenshot%202024-07-01%20at%206.24.08 PM.png)

## Built With
- HTML
- JQuery
- Bootstrap
- JavaScript
- CSS
