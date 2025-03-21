// Initial messages
let msgs = [
  { message: "Hello World", user: "Alice", timePosted: new Date().toLocaleString() },
  { message: "Blah Blah", user: "Bob", timePosted: new Date().toLocaleString() },
  { message: "I love cats", user: "Charlie", timePosted: new Date().toLocaleString() }
];

  function removeTrailingSlash(url) {
    return url.replace(/\/+$/, ""); // Removes one or more trailing slashes
  }
  
  // Updates message list
  function update(messages) {
    let messageList = document.getElementById("message-list");
    messageList.innerHTML = "";
  
    messages.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `<strong>${item.user}</strong>: ${item.message} <br> <small>${item.timePosted}</small>`;
      li.classList.add("message-item");
      messageList.appendChild(li);
    });
  }
  
  // Fetch messages from the backend
  function fetchMessages() {
    let serviceUrl = removeTrailingSlash(document.getElementById("service-url").value);
  
    fetch(`${serviceUrl}/msg/getAll`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          update(data); // Update the UI with the fetched messages
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        update(msgs); // Fallback to local messages if fetch fails
      });
  }
  
  // Send button
  document.getElementById("send-button").addEventListener("click", function (event) {
    event.preventDefault();
  
    let inputField = document.getElementById("message-input");
    let userField = document.getElementById("user-input");
    let newMessage = inputField.value.trim();
    let userName = userField.value.trim() || "Anonymous";
  
    if (newMessage !== "") {
      let serviceUrl = removeTrailingSlash(document.getElementById("service-url").value);
      let fullMessage = `${userName}: ${newMessage}`;
  
      fetch(`${serviceUrl}/msg/post/${encodeURIComponent(fullMessage)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 1) {
            fetchMessages(); // Refresh the message list after posting
            inputField.value = ""; // Clear the input field
          } else {
            console.error("Error posting message:", data);
          }
        })
        .catch((error) => console.error("Error posting message:", error));
    }
  });
  
  // Refresh button
  document.getElementById("refresh-button").addEventListener("click", function () {
    fetchMessages();
  });
  
  // Theme button
  document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
  
  // Load initial messages on page load
  document.addEventListener("DOMContentLoaded", function () {
    fetchMessages(); // Fetch messages from the backend
  });
