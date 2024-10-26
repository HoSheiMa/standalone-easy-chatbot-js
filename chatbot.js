// Created By Qandil
// for more helping calling me at https://wa.me/201207425745

const doChatBotStandAloneStyles = () => {
    // Create a style tag
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    styleTag.innerHTML = `
    .chatbot-primary-btn {
        position: fixed;
        z-index: 999;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 0 10px #00000030, 0 0 10px #ffffff;
        transition: 0.3s;
        background: #ffffff;
    }
    .chatbot-primary-btn:hover {
        box-shadow: 0 0 0px #00000030, 0 0 0px #ffffff;
        opacity: 0.7
    }
    .chatbox {
        border-radius: 12px;
        background: #ffffff;
        position: fixed;
        z-index: 999;
        bottom: 100px;
        right: 20px;
        width: 400px;
        height: 600px;
        max-width: 400px;
        max-height: 600px;
        padding: 20px 0 ;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        overflow-y: hidden;
        display: none;
        box-shadow: 0 0 30px #00000015, 0 0 10px #ffffff;
    }
    @media (max-width: 576px) {
        .chatbox {
            width: 90%;
        }
    }
    .message-container-left {
        display: flex;
        justify-content: flex-start;
        padding: 0px 8px;
    }
    .message-container-right {
        display: flex;
        justify-content: flex-end;
        padding: 0px 8px;
    }
    .message {
      margin-top: 10px;
      padding: 10px;
      width: 60%;
    }
    .bot-message {
      background-color: #f0f0f0;
      border-radius: 12px 12px 12px 0px
    }
    .user-message {
      background-color: #cb4b6b50;
      border-radius: 12px 12px 0px 12px
    }
    .options {
      margin-top: 15px;
    }
    .option-btn {
      margin: 5px;
      padding: 8px 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .option-btn:hover {
      background-color: #0056b3;
    }
    .message-box {
        overflow-y: scroll;
        width: 100%;
        height: 90%;
        max-height: 90%;
        padding: 0 0 20px 0;
    }
    .option-btn {
        height: 50px;
        width: 30%;
        background-color: #0d0d0f;
        border-radius: 12px;
        padding: 14px;
        transition: .3s;
        color: #fff;
    }
    d-inline-block {
        display:inline-block;
    }
    .fade-in {
        opacity: 0;
        transition: opacity 0.5s ease; /* Smooth opacity transition */
    }

    /* Fully visible state */
    .visible {
        opacity: 1;
    }
    /* Add custom CSS if needed */
`;
    document.head.appendChild(styleTag);
};

function playSound() {
    try {
        const sound = new Audio("/assets/sounds/notif.wav");
        sound.play();
    } catch (error) {}
}

const toggleChatBox = () => {
    document.querySelector(".chatbox").classList.toggle("d-inline-block");
    setTimeout(() => {
        document.querySelector(".chatbox").classList.toggle("visible");
    }, 10);
};
function renderMessage(content, isBot = true, delay = false) {
    const chatbox = document.getElementById("message-box");
    const container = document.createElement("div");
    container.className = isBot
        ? "message-container-left"
        : "message-container-right";
    const message = document.createElement("div");
    message.className = `message ${
        isBot ? "bot-message fade-in" : "user-message fade-in"
    }`;
    message.textContent = content;
    container.appendChild(message);
    if (delay) {
        setTimeout(() => {
            chatbox.appendChild(container);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            playSound();
            setTimeout(() => {
                message.classList.add("visible");
            }, 10); // Small delay to allow initial render
        }, delay);
    } else {
        chatbox.appendChild(container);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        setTimeout(() => {
            message.classList.add("visible");
        }, 10); // Small delay to allow initial render
    }
}
let options = {
    default: [
        { label: "Option 1", goto: "step-2" },
        { label: "Option 2", onclick: () => console.log("clicked me") },
        { label: "Option 3", onclick: () => console.log("clicked me") },
    ],
    "step-2": [
        { label: "Opt1 stp2", message: "Option 2 step 2 message" },
        { label: "Opt2 stp2", message: "Option 2 step 2 message" },
        { label: "Back", goto: "default" },
    ],
};
function renderOptions(optionsId = "default") {
    const optionsBox = document.querySelector("#options-box");
    const availableOptions = options[optionsId];
    optionsBox.innerHTML = "";
    availableOptions.forEach((option) => {
        const option1 = document.createElement("button");
        option1.className = "option-btn";
        option1.textContent = option.label;
        option1.onclick = () => {
            renderMessage(option.label, false);
            if (option.onclick) option.onclick();
            if (option.goto) renderOptions(option.goto);
            if (option.message) renderMessage(option.message, true, 600);
        };
        optionsBox.appendChild(option1);
    });
}

const chatBotInit = () => {
    doChatBotStandAloneStyles();
    // Create button element
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggle-button";
    toggleButton.className = "chatbot-primary-btn";
    toggleButton.onclick = toggleChatBox;
    // Create image element and set attributes
    const img = document.createElement("img");
    img.width = 40;
    img.height = 40;
    img.src = "https://img.icons8.com/pulsar-gradient/96/filled-sent.png";
    img.alt = "filled-sent";

    // render chatbox and options buttons
    const chatbox = document.createElement("div");
    chatbox.className = "chatbox fade-in";
    chatbox.id = "chatbox";

    const messageBox = document.createElement("div");
    messageBox.className = "message-box";
    messageBox.id = "message-box";
    chatbox.appendChild(messageBox);

    const optionsBox = document.createElement("div");
    optionsBox.className = "options-box";
    optionsBox.id = "options-box";
    chatbox.appendChild(optionsBox);

    // Append image to button
    toggleButton.appendChild(img);
    // Append button to the body
    document.body.appendChild(toggleButton);
    document.body.appendChild(chatbox);
    renderMessage("Hello! How can I help you today?");
    renderMessage("Please select an option below:");
    renderOptions();
};

chatBotInit();
