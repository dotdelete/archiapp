// Initial messages
let msgs = [
  { msg: "Hello World", user: "Alice", timePosted: new Date().toLocaleString() },
  { msg: "Blah Blah", user: "Bob", timePosted: new Date().toLocaleString() },
  { msg: "I love cats", user: "Charlie", timePosted: new Date().toLocaleString() }
];

// Updates message list
function update(messages) {
    let messageList = document.getElementById("message-list");
    messageList.innerHTML = "";

    messages.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${item.user}</strong>: ${item.msg} <br> <small>${item.timePosted}</small>`;
        li.classList.add("message-item");
        messageList.appendChild(li);
    });
}

// Send button
document.getElementById("send-button").addEventListener("click", function(event) {
    event.preventDefault();

    let inputField = document.getElementById("message-input");
    let userField = document.getElementById("user-input");
    let newMessage = inputField.value.trim();
    let userName = userField.value.trim() || "Anonymous";

    if (newMessage !== "") {
        msgs.push({ msg: newMessage, user: userName, timePosted: new Date().toLocaleString() });
        update(msgs);
        inputField.value = "";
    }
});

// Refresh button
document.getElementById("refresh-button").addEventListener("click", function() {
    update(msgs);
});

// Theme button
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Load initial messages
update(msgs);
