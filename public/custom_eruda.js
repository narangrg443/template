(function(){
  

let consoleVisible = true; // Track whether the console box is visible

// Function to toggle the console box visibility
const toggleConsole = () => {
  consoleVisible = !consoleVisible;
  messageContainer.style.display = consoleVisible ? 'flex' : 'none';
  messageContainer.style.flexDirection='column';
  messageContainer.style.borderRadius='10px';
};

const clearConsole=()=>{
  messageContainer.innerHTML='<b>ConsoleNG-v1.0.0</b>';
}


// Function to append a message to the console box
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
  parentDiv.style.marginBottom = '2px'; // Add margin between messages

  // Create a span for the message type
  const messageTypeSpan = document.createElement('span');
  
  messageTypeSpan.textContent = type === 'CONSOLE_MSG' ? 'LOG: ' : 'ERROR: ';
// messageTypeSpan.style.color = color;
  parentDiv.appendChild(messageTypeSpan);

  // Create a span for the message content
  const messageContentSpan = document.createElement('span');
  messageContentSpan.textContent = message;
   messageContentSpan.style.color = color;
   parentDiv.appendChild(messageContentSpan);

  messageContainer.appendChild(parentDiv);
    messageContainer.style.borderRadius='10px';
    

//class for modification in class
consoleContainer.classList.add('consoleContainer');
messageContainer.classList.add('messageContainer');
toggleButton.classList.add('toggleButton');
messageTypeSpan.classList.add('messageTypeSpan');
messageContentSpan.classList.add('messageContentSpan');
parentDiv.classList.add('parentDiv');

};

// Create a button for toggling the console box
const toggleButton = document.createElement('button');
toggleButton.style.position='absolute';

toggleButton.textContent = 'L';
toggleButton.style.padding = '5px';
toggleButton.style.cursor = 'pointer';
toggleButton.style.backgroundColor = 'gray';
toggleButton.style.color = 'white';
toggleButton.addEventListener('click', toggleConsole);
toggleButton.style.display='absolute';
toggleButton.style.bottom='2px';
toggleButton.style.width="20px";

//clear button
const clearBtn = document.createElement('button');
clearBtn.style.position='absolute';
clearBtn.textContent = 'C';
clearBtn.style.padding = '5px';
clearBtn.style.cursor = 'pointer';
clearBtn.style.backgroundColor = 'gray';
clearBtn.style.color = 'white';
clearBtn.addEventListener('click', clearConsole);
clearBtn.style.display='absolute';
clearBtn.style.bottom='2px';
clearBtn.style.left='30px'
clearBtn.style.width="20px";

document.body.appendChild(clearBtn);

// Create the initial message container
const messageContainer = document.createElement('div');
messageContainer.style.position='absolute';
messageContainer.style.minWidth = '90%';
messageContainer.style.minHeight = '50%';

messageContainer.style.overflowY = 'auto';
// messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
messageContainer.style.color = 'white';
messageContainer.style.padding = '10px';
messageContainer.id = 'message-container';





// Create a div container for the console box and button
const consoleContainer = document.createElement('div');
consoleContainer.style.display = 'flex';
consoleContainer.style.flexDirection = 'column';
consoleContainer.appendChild(messageContainer);
consoleContainer.appendChild(toggleButton);

// Append the console container to the body
document.body.appendChild(consoleContainer);



// Override console.log to append messages to the console box
// const originalConsoleLog = console.log;
// console.log = (...args) => {
//   const logMessage = "'"+args.map(String).join(' ')+"'";
//   appendMessage(logMessage, 'CONSOLE_MSG');
//   originalConsoleLog.apply(console, args);
// };
const originalConsoleLog = console.log;
console.log = (...args) => {
  const logMessage = args.map(arg => typeof arg === 'string' ? `"${arg}"` : arg).join(' ');
  appendMessage(logMessage, 'CONSOLE_MSG');
  originalConsoleLog.apply(console, args);
};





// Handle errors and append to the console box
window.addEventListener('error', (e) => {
  const errorMessage = `Error in ${e.filename} at line ${e.lineno}: ${e.message}`;
  appendMessage(errorMessage, 'CONSOLE_ERR');
});




// elements structure
/*
<body>
 <div id='consoleContainer'>
  <div id='messageContainer'>
   <div id='parentDiv'>
    <span id='messageTypeSpan'>LOG:</span>
    <span id='messageContentSpan'></span>
   <div>
  </div>
  <button id='toggleButton'>L</button>
 </div>
 




*/

})()