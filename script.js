// Initial messages
let msgs = [
    { "msg": "Hello World" },
    { "msg": "Blah Blah" },
    { "msg": "I love cats" }
  ];
  
  function update(messages) {
      let messageList = document.getElementById("message-list");
      messageList.innerHTML = ""; // Clear the existing messages
  
      messages.forEach(item => {
          let li = document.createElement("li");
          li.textContent = item.msg;
          li.classList.add("message-item");
          messageList.appendChild(li);
      });
  }
  
  // Add event listener for the button
  document.getElementById("send-button").addEventListener("click", function(event) {
      event.preventDefault(); // Prevent form submission refresh
  
      let inputField = document.getElementById("message-input");
      let newMessage = inputField.value.trim(); // Get user input
  
      if (newMessage !== "") { // Only add if input is not empty
          msgs.push({ "msg": newMessage }); // Add to the array
          update(msgs); // Update the list
          inputField.value = ""; // Clear input field
      }
  });
  
  // Load initial messages
  update(msgs);
  