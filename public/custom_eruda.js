let consoleVisible = true; // Track whether the console box is visible

// Function to toggle the console box visibility
const toggleConsole = () => {
  consoleVisible = !consoleVisible;
  messageContainer.style.display = consoleVisible ? 'block' : 'none';
};

// Create a button for toggling the console box
const toggleButton = document.createElement('button');

toggleButton.textContent = 'Toggle';
toggleButton.style.padding = '5px';
toggleButton.style.cursor = 'pointer';
toggleButton.style.backgroundColor = 'gray';
toggleButton.style.color = 'white';
toggleButton.addEventListener('click', toggleConsole);

// Create the initial message container
const messageContainer = document.createElement('div');
messageContainer.style.width = '100%';
messageContainer.style.maxHeight = '50%';
messageContainer.style.overflowY = 'auto';
messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
messageContainer.style.color = 'white';
messageContainer.style.padding = '10px';
messageContainer.id = 'console-container';

// Create a div container for the console box and button
const consoleContainer = document.createElement('div');
consoleContainer.style.display = 'flex';
consoleContainer.style.flexDirection = 'row';
consoleContainer.appendChild(messageContainer);
consoleContainer.appendChild(toggleButton);

// Append the console container to the body
document.body.appendChild(consoleContainer);

// Function to append a message to the console box
const appendMessage = (message, type) => {
  let color;

  if (type === 'CONSOLE_MSG') {
    color = 'green';
  } else if (type === 'CONSOLE_ERR') {
    color = 'red';
  }

  // Create a parent div
  const parentDiv = document.createElement('div');
 

  parentDiv.style.width = '100%';
  parentDiv.style.padding = '2px';
  parentDiv.style.backgroundColor = 'black';
  parentDiv.style.fontSize = '12px';
  parentDiv.style.marginBottom = '5px'; // Add margin between messages

  // Create a span for the message type
  const messageTypeSpan = document.createElement('span');
  messageTypeSpan.textContent = type === 'CONSOLE_MSG' ? 'LOG: ' : 'ERROR: ';
  messageTypeSpan.style.color = color;
  parentDiv.appendChild(messageTypeSpan);

  // Create a span for the message content
  const messageContentSpan = document.createElement('span');
  messageContentSpan.textContent = message;
  messageContentSpan.style.color = color;
  parentDiv.appendChild(messageContentSpan);

  messageContainer.appendChild(parentDiv);
};

// Override console.log to append messages to the console box
const originalConsoleLog = console.log;
console.log = (...args) => {
  const logMessage = args.map(String).join(' ');
  appendMessage(logMessage, 'CONSOLE_MSG');
  originalConsoleLog.apply(console, args);
};

// Handle errors and append to the console box
window.addEventListener('error', (e) => {
  const errorMessage = `Error in ${e.filename} at line ${e.lineno}: ${e.message}`;
  appendMessage(errorMessage, 'CONSOLE_ERR');
});

// ... (rest of your HTML and scripts)
toggleButton.style.display='absolute';
toggleButton.style.bottom='2px';