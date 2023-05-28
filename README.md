# Quiz Game

This is a quiz game implemented using React. The objective of the game is to arrange a set of numbers in ascending order. The game provides a set of input fields where the numbers can be dropped, and a set of options that can be dragged and dropped onto the input fields.
**You can play this game on this website** **[https://byte-learn.vercel.app/]('https://byte-learn.vercel.app/')**

## How It Works

### Initial Setup

When the game component (`Game`) is rendered, it initializes the game by calling the `initializeGame` function. The `initializeGame` function performs the following tasks:

1. Resets the input values to an empty array and generates a new set of options.
2. Disables the check button (`Check Answer`).
3. Adds drag events to the input fields.

### Generating Options

The `generateOptions` function generates a set of random numbers and stores them in the `options` state variable. This function is called during the game initialization to generate a new set of options.

### Drag and Drop

The game utilizes HTML5 drag and drop functionality for the drag and drop interactions. Each input field is made draggable, and each option is made a drop target. The following events and functions are involved in the drag and drop functionality:

- `handleDragStart`: This function is called when an option is dragged. It sets the dragged value as the data being transferred.
- `handleInputDragStart`: This function is called when an input field is dragged. It sets the dragged value as the data being transferred.
- `handleDragOver`: This function is called when an option is dragged over a valid drop target. It prevents the default behavior to allow dropping.
- `handleDrop`: This function is called when an option is dropped onto an input field. It retrieves the dragged value and assigns it to the target input field. The dropped option is then removed from the options container. If a previous input field contained the same value, it is cleared. The function also updates the input values state and enables/disables the check button based on the filled input fields.
- `addInputDragEvents`: This function adds drag events to each input field. It sets the `draggable` property to `true` and assigns the `ondragstart` event handler to `handleInputDragStart`.

### Checking the Answer

When the user clicks the check button, the `checkAnswer` function is called. It compares the input values with a sorted version of the values to determine if the numbers are arranged in ascending order. If the values match, a "Correct!" message is displayed, otherwise a "Wrong! Please try again." message is displayed. The user is then navigated to a result page with the corresponding message.

### Handling Input Changes

The `handleInputChange` function is called when the value of an input field changes. It updates the corresponding value in the `inputValues` state array.

## Dependencies

The game component relies on the following dependencies:

- `React`: The core library for building the user interface.
- `react-router-dom`: A library for handling navigation between pages in a React application.

Please make sure these dependencies are installed and properly configured in your project.

