let selectedPersonality = "friend";  // Default personality

// Update personality based on user selection
document.getElementById("personality").addEventListener("change", function () {
    selectedPersonality = this.value;
});

// Function to add emojis to the bot response
function addEmojis(text) {
    if (text.includes("कैसे हो")) {
        return text + " 😊";
    } else if (text.includes("ध्यान")) {
        return text + " ❤️";
    } else if (text.includes("हंसी")) {
        return text + " 😂";
    }
    return text;
}

// Voice Recognition functionality
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = false;

// Start voice recognition when the button is clicked
document.getElementById("voice-btn").addEventListener("click", function () {
    recognition.start();
    console.log("Voice recognition started...");
});

// Process voice input
recognition.onresult = function (event) {
    const userInput = event.results[0][0].transcript;
    document.getElementById("user-input").value = userInput;
    sendMessage(userInput);
};

// Send message and reply based on selected personality
function sendMessage(userInput) {
    const chatBox = document.getElementById("chat-box");

    if (userInput) {
        // User message
        const userMessage = document.createElement("div");
        userMessage.textContent = "आप: " + userInput;
        userMessage.style.color = "blue";
        chatBox.appendChild(userMessage);

        // Chatbot response based on selected personality
        let botMessage = document.createElement("div");

        if (selectedPersonality === "friend") {
            botMessage.textContent = "चैटबॉट (दोस्त): यार, तुम कैसे हो? चलो मस्ती करते हैं!";
            botMessage.style.color = "green";
        } else if (selectedPersonality === "girlfriend") {
            botMessage.textContent = "चैटबॉट (गर्लफ्रेंड): बाबू, तुम बहुत अच्छे हो, लव यू! 💖";
            botMessage.style.color = "pink";
        } else if (selectedPersonality === "shayar") {
            botMessage.textContent = "चैटबॉट (शायर): \nतेरी यादें तो दिल में बसी हैं, \nमेरे ख्वाबों में हमेशा तुझसे वसी हैं।";
            botMessage.style.color = "purple";
        } else if (selectedPersonality === "joker") {
            botMessage.textContent = "चैटबॉट (जोकर): एक आदमी डॉक्टर के पास गया और कहा, 'डॉक्टर साहब, मुझे भूलने की बीमारी हो गई है।' डॉक्टर ने पूछा, 'कब से?' आदमी बोला, 'कब से क्या?' 😂";
            botMessage.style.color = "orange";
        } else if (selectedPersonality === "teacher") {
            botMessage.textContent = "चैटबॉट (शिक्षक): चलिए, आज हम गणित का एक अच्छा सवाल सुलझाते हैं।";
            botMessage.style.color = "blue";
        } else if (selectedPersonality === "mother") {
            botMessage.textContent = "चैटबॉट (माँ): बेटा, तुम कैसे हो? खाना खाया तुमने? तुम्हारा ध्यान रखना मेरी जिम्मेदारी है।";
            botMessage.style.color = "red";
        }

        // Add emojis if needed
        botMessage.textContent = addEmojis(botMessage.textContent);

        chatBox.appendChild(botMessage);

        // Clear input field
        document.getElementById("user-input").value = "";

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Send message when 'Send' button is clicked
document.getElementById("send-btn").addEventListener("click", function () {
    const userInput = document.getElementById("user-input").value.trim();
    sendMessage(userInput);
});
