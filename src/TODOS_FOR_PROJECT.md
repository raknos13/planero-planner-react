# Todo's for the project

## TodoItem

[] Hide the edit and delete buttons by default and make them visible on hover
[] Use absolute positioning to overlay the buttons over the text when user hovers over the task
[] Ensure the task expands to take the entire width, when buttons are hidden

- Introduce Boards

Create a new Board component that will contain multiple lists.
Implement functionality to create new boards.

- Implement Lists:

Modify your existing TodoList component to become a List component.
Each List will contain multiple TodoItems.
Add functionality to create new lists within a board.

- Drag and Drop:

Implement drag and drop functionality to move tasks between lists and reorder tasks within a list.
You can use libraries like react-beautiful-dnd or react-dnd for this.

- Styling:

Style your components to look more like Trello. Consider using CSS modules or a styling library like styled-components.

- Data Management:

As your app grows more complex, consider using a state management library like Redux or Recoil, or use React's Context API for managing global state.

- Local Storage:

Implement local storage to persist the user's boards and tasks between sessions.

- Additional Features:

Add labels or tags to tasks.
Implement a simple user system (even if it's just choosing a username).
Add due dates to tasks.
