//Финальное задание

const wsUrl = "wss://echo.websocket.org/";

//Ищем все необходимые компоненты
//Кнопки
const btnChatStart = document.querySelector(".j-btn-chat");
const btnCloseChat = document.querySelector(".j-btn-close-chat");
const btnSend = document.querySelector(".j-btn-send");
const btnGeo = document.querySelector(".j-btn-geo");

//Поле ввода текста сообщения
let textMessage = document.querySelector(".j-text-message");

//Поле чата
let chat = document.querySelector(".j-chat-container");

//Перменная websocket
let websocket;

//функция добавления в чат сообщения от клиента-серверу
function writeMessageFromClient(message) {
    let div = document.createElement("div");
    div.classList.add("client-message");
    let span = document.createElement("span");
    span.classList.add("content-message");
    span.innerHTML = message;
    div.appendChild(span);    
    chat.appendChild(div);
};

//функция добавления в чат сообщения от сервера-клиенту
function writeMessageFromServer(message) {
    let div = document.createElement("div");
    div.classList.add("server-message");
    let span = document.createElement("span");
    span.classList.add("content-message");
    span.innerHTML = message;
    if (!(span.textContent === "Гео-локация")) {
        div.appendChild(span);    
        chat.appendChild(div);
    }    
};

//Обработчик нажатия кнопки "Закрыть чат", равносильно "Закрыть соединение"
btnCloseChat.addEventListener("click", () => {
    websocket.close();
    websocket = null;
});

//Обработчик кнопки "Отправить сообщение"
btnSend.addEventListener("click", () => {
    if (textMessage.value) {
        writeMessageFromClient(textMessage.value);
        websocket.send(textMessage.value);
        textMessage.value = "";
    }
});

//Обработчик, реализующий отправку сообщения нажатием клавиши ENTER
textMessage.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        if (textMessage.value) {
            writeMessageFromClient(textMessage.value);
            websocket.send(textMessage.value);
            textMessage.value = "";
        }
    }
});

//Кнопка открытия чата и установки соединения
btnChatStart.addEventListener("click", () => {
    websocket = new WebSocket(wsUrl);

    websocket.onerror = function(event) { document.querySelector(".j-connect-status").innerHTML = `Status: Error ${event.data}` };

    websocket.onmessage = function(event) { writeMessageFromServer(event.data) };

    websocket.onclose = function(event) {
        document.querySelector(".j-connect-status").innerHTML = `Status: Error ${event.data}`;
        console.log("DISCONNECTED");
    };

    websocket.onopen = function(event) {
        document.querySelector(".j-connect-status").innerHTML = `Status: CONNECTED`;
        console.log("CONNECTED");
    };
});

//Геолокация
//Функция обработки удачного получения местоположения
function success(position) {
    let message = null;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    message = `<a href="https://openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Гео-локация</a>`;
    writeMessageFromClient(message);
    websocket.send(message);
}

//Функция обработка ошибки определения местоположения
function error() {
    console.log("Нет разрешения на получение местоположения");
    websocket.send('<span style="color:red">Геолокация недоступна</span>');
}

//Запрос на получение геопозиции с проверкой поддержки браузером данной функции по клику на кнопку "Геолокация"
btnGeo.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error)
    } else {
        writeMessageFromClient("Геолокация не поддерживается браузером");
    }
});