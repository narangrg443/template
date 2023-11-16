const appendMessage = (message, type) => {
  const messageContainer = document.createElement('div');
  let color;

  if (type === 'CONSOLE_MSG') {
    color = 'green';
  } else if (type === 'CONSOLE_ERR') {
    color = 'red';
  }

  messageContainer.textContent = "CONSOLE: "+message;
  messageContainer.style.color = color;
  document.body.appendChild(messageContainer);
};

const originalConsoleLog = console.log;
console.log = (...args) => {
  const logMessage = args.map(String).join(' ');
  appendMessage(logMessage, 'CONSOLE_MSG');
  originalConsoleLog.apply(console, args);
};

window.addEventListener('error', (e) => {
  const errorMessage = `Error in ${e.filename} at line ${e.lineno}: ${e.message}`;
  appendMessage(errorMessage, 'CONSOLE_ERR');
});
