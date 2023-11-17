(function() {
  let consoleVisible = true; // Track whether the console box is visible

  // Function to toggle the console box visibility
  const toggleConsole = () => {
    consoleVisible = !consoleVisible;
    messageContainer.style.display = consoleVisible ? 'flex' : 'none';
    messageContainer.style.flexDirection = 'column';
    messageContainer.style.borderRadius = '10px';
  };

  const clearConsole = () => {
    messageContainer.innerHTML = '<b>ConsoleNG-v1.0.0</b>';
  };

  const appendMessage = (message, type) => {
    let color;

    if (type === 'CONSOLE_MSG') {
      color = '#06ffdb';
    } else if (type === 'CONSOLE_ERR') {
      color = 'red';
    }

    // Create a parent div
    const parentDiv = document.createElement('div');

    parentDiv.style.padding = '2px';
    parentDiv.style.backgroundColor = 'black';
    parentDiv.style.fontSize = '12px';
    parentDiv.style.marginBottom = '2px';

    // Create a span for the message type
    const messageTypeSpan = document.createElement('span');
    messageTypeSpan.textContent = type === 'CONSOLE_MSG' ? 'LOG: ' : 'ERROR:';

    // Apply color using the CSS class
    messageTypeSpan.classList.add('messageTypeSpan');

    parentDiv.appendChild(messageTypeSpan);

    // Create a span for the message content
    const messageContentSpan = document.createElement('span');
    messageContentSpan.textContent = message;
    messageContentSpan.style.color = color;
    parentDiv.appendChild(messageContentSpan);

    messageContainer.appendChild(parentDiv);
    messageContainer.style.borderRadius = '10px';

    // Other class modifications
    consoleContainer.classList.add('consoleContainer');
    messageContainer.classList.add('messageContainer');
    toggleButton.classList.add('toggleButton');
    messageContentSpan.classList.add('messageContentSpan');
    parentDiv.classList.add('parentDiv');
  };

  const toggleButton = document.createElement('button');
  toggleButton.style.position = 'absolute';
  toggleButton.textContent = 'L';
  toggleButton.style.padding = '5px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.backgroundColor = 'gray';
  toggleButton.style.color = 'white';
  toggleButton.addEventListener('click', toggleConsole);
  toggleButton.style.display = 'absolute';
  toggleButton.style.bottom = '2px';
  toggleButton.style.width = '20px';

  const clearBtn = document.createElement('button');
  clearBtn.style.position = 'absolute';
  clearBtn.textContent = 'C';
  clearBtn.style.padding = '5px';
  clearBtn.style.cursor = 'pointer';
  clearBtn.style.backgroundColor = 'gray';
  clearBtn.style.color = 'white';
  clearBtn.addEventListener('click', clearConsole);
  clearBtn.style.display = 'absolute';
  clearBtn.style.bottom = '2px';
  clearBtn.style.left = '30px';
  clearBtn.style.width = '20px';

  document.body.appendChild(clearBtn);

  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'absolute';
  messageContainer.style.backgroundColor = 'black';
  messageContainer.style.minWidth = '90%';
  messageContainer.style.minHeight = '50%';
  messageContainer.style.overflowY = 'auto';
  messageContainer.style.color = 'white';
  messageContainer.style.padding = '10px';
  messageContainer.id = 'message-container';

  const consoleContainer = document.createElement('div');
  consoleContainer.style.display = 'flex';
  consoleContainer.style.flexDirection = 'column';

  consoleContainer.appendChild(messageContainer);
  consoleContainer.appendChild(toggleButton);

  const styles = `
    .messageContainer {
      background-color: black;
      max-height: 80%;
      overflow: auto;
    }

    .parentDiv {
      border-radius: 4px;
    }

    .messageTypeSpan {
      color: #f8992c;
      font: italic normal bold 12px/1.2 'Times New Roman', Times, serif;
    }

    .messageContentSpan {
      color: #06ffdb;
      font: italic normal 12px 'Times New Roman', Times, serif;
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleElement);

  document.body.appendChild(consoleContainer);

  const originalConsoleLog = console.log;
  console.log = (...args) => {
    const logMessage = args.map(arg => typeof arg === 'string' ? `"${arg}"` : arg).join(' ');

    // Get the file name from the Error stack trace
    const stack = new Error().stack.split('\n');
    const callerInfo = stack[2].trim().replace(/^at\s+/g, '');
    const fileName = callerInfo.substring(callerInfo.lastIndexOf('/') + 1);

    // Include file name in the message
    const messageWithFileName = `[${fileName}] ${logMessage}`;
    
    appendMessage(messageWithFileName, 'CONSOLE_MSG');
    originalConsoleLog.apply(console, args);
  };

  window.addEventListener('error', (e) => {
    const errorMessage = `Error in ${e.filename} at line ${e.lineno}: ${e.message}`;
    appendMessage(errorMessage, 'CONSOLE_ERR');
  });
})();
