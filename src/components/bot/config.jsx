// import { createChatBotMessage } from 'react-chatbot-kit';

// const config = {
//     botName: "Wedding Planner Bot",
//     initialMessages: [createChatBotMessage("Hi! How can I assist with your wedding planning today?")],
//     customComponents: {},
//     customStyles: {
//         botMessageBox: {
//             backgroundColor: "#376B7E",
//         },
//         chatButton: {
//             backgroundColor: "#5ccc9d",
//         },
//     },
//     state: {},
//     widgets: [],
// };

// export default config;

import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
    botName: "Wedding Planner Bot",
    initialMessages: [
        createChatBotMessage("Hello! How can I assist you with your wedding planning today?"),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
    state: {},
};

export default config;
