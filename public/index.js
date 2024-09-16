const socket = io();

const clientsTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value === "") {
    alert("Enter Message: ...");
  }
  sendMessage();
});

function sendMessage() {
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTIme: new Date(),
  };
  console.log("data", data);
  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

socket.on("clients-total", (data) => {
  console.log(data);
  clientsTotal.innerText = `Clients Total ${data}`;
});

socket.on("chat-message", (data) => {
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
  const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
          <p class="message">
            ${data.message}
            <span>${data.name} ⚪ ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
    `;

  messageContainer.innerHTML += element;
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}
