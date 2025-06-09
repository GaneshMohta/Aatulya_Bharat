import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
    botName:"Aatulya Planner Bot",
    initialMessages: [
        createChatBotMessage(
        "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
      {
        delay: 500,
        widget: "overview",
      }
    ),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },


};
export default config;
