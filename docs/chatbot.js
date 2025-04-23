// Chatbot functionality for B.D. International Public School

// Knowledge base for common questions
const knowledgeBase = {
    "school hours": "Our school hours are from 8:00 AM to 2:30 PM, Monday through Saturday.",
    "timings": "Our school operates from 8:00 AM to 2:30 PM, Monday through Saturday.",
    "timing": "Our school operates from 8:00 AM to 2:30 PM, Monday through Saturday.",
    "admission": "To seek admission, please visit our Admissions page or fill out the enrollment form. The application period starts on July 1st and ends on August 31st each year.",
    "fee structure": "Our fee structure varies by grade level. Please contact our admissions office for detailed information about fees.",
    "fees": "Our fee structure varies by grade level. Please contact our admissions office for detailed information about fees.",
    "curriculum": "We follow a comprehensive curriculum designed to meet the needs of all students, from early childhood to higher secondary levels.",
    "faculty": "Our school has highly qualified faculty members specializing in various subjects. You can view all faculty members on our Faculty page.",
    "teachers": "Our school has highly qualified teachers specializing in various subjects. You can view all faculty members on our Faculty page.",
    "contact": "You can reach us at info@bdischool.com or call us at +91-XXX-XXX-XXXX.",
    "location": "B.D. International Public School is located in Madhubani, Bihar.",
    "address": "B.D. International Public School is located in Madhubani, Bihar.",
    "facilities": "Our facilities include modern classrooms, science laboratories, computer labs, a library, sports grounds, and an auditorium.",
    "sports": "We offer various sports including cricket, football, basketball, badminton, and athletics.",
    "activities": "We offer various extracurricular activities including sports, music, dance, art, and debate clubs.",
    "uniform": "Students are required to wear the prescribed school uniform. Details can be obtained from the school office.",
    "transport": "We provide transportation services for students. Routes and fees can be discussed with our administrative office.",
    "bus": "We provide school bus transportation services. Routes and fees can be discussed with our administrative office.",
    "holidays": "Please refer to our academic calendar for the list of holidays throughout the year.",
    "exams": "Examinations are conducted quarterly, with final exams at the end of the academic year.",
    "results": "Examination results are shared with parents during parent-teacher meetings and are also available through our student portal.",
    "principal": "Dr. Jane Smith is our school's Director. You can read her message on our Faculties page.",
    "director": "Dr. Jane Smith is our school's Director. You can read her message on our Faculties page."
};

// List of suggested questions to ask
const suggestedQuestions = [
    "What are the school hours?",
    "How can I apply for admission?",
    "What facilities does the school have?",
    "Who are the faculty members?",
    "Is school bus service available?"
];

// Create chatbot HTML structure
function createChatbot() {
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-button">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chatbot-box">
                <div class="chatbot-header">
                    <span>B.D. International School Assistant</span>
                    <span class="chatbot-close">×</span>
                </div>
                <div class="chatbot-messages">
                    <!-- Messages will appear here -->
                </div>
                <div class="chatbot-input-area">
                    <input type="text" id="chatbot-input" placeholder="Type your question...">
                    <button class="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// Initialize the chatbot
function initChatbot() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotBox = document.querySelector('.chatbot-box');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('#chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        chatbotBox.style.display = chatbotBox.style.display === 'flex' ? 'none' : 'flex';
        
        // If opening the chatbot for the first time, show welcome message
        if (chatbotBox.style.display === 'flex' && chatbotMessages.children.length === 0) {
            displayBotMessage("Hello! Welcome to B.D. International Public School. How can I help you today?");
            
            // Display suggested questions
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'chatbot-options';
            
            suggestedQuestions.forEach(question => {
                const option = document.createElement('div');
                option.className = 'chatbot-option';
                option.textContent = question;
                option.addEventListener('click', () => {
                    handleUserInput(question);
                });
                optionsContainer.appendChild(option);
            });
            
            chatbotMessages.appendChild(optionsContainer);
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotBox.style.display = 'none';
    });
    
    // Send message on button click
    chatbotSend.addEventListener('click', () => {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            handleUserInput(userInput);
        }
    });
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userInput = chatbotInput.value.trim();
            if (userInput) {
                handleUserInput(userInput);
            }
        }
    });
}

// Handle user input
function handleUserInput(userInput) {
    displayUserMessage(userInput);
    
    const chatbotInput = document.querySelector('#chatbot-input');
    chatbotInput.value = '';
    
    // Process the user input and generate a response
    setTimeout(() => {
        const response = generateResponse(userInput);
        displayBotMessage(response);
    }, 500); // Add a small delay for natural feel
}

// Display user message in chat
function displayUserMessage(message) {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message user-message';
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Display bot message in chat
function displayBotMessage(message) {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message bot-message';
    messageElement.innerHTML = message;
    chatbotMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate a response based on user input
function generateResponse(userInput) {
    const input = userInput.toLowerCase();
    
    // Check if the input contains any keywords from our knowledge base
    for (const keyword in knowledgeBase) {
        if (input.includes(keyword)) {
            return knowledgeBase[keyword];
        }
    }
    
    // If no matching keywords found, offer WhatsApp redirection
    return "I'm sorry, I don't have the answer to that question yet. Would you like to connect with our staff on WhatsApp for more information? <br><br><a href='https://wa.me/917858965695?text=Hello, I have a question about " + encodeURIComponent(userInput) + "' target='_blank' class='whatsapp-btn'><i class='fab fa-whatsapp'></i> Connect on WhatsApp</a>";
}

// Load the chatbot when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    createChatbot();
    initChatbot();
});
