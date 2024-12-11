 import axios from 'axios'

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
      try {
        const response = await axios.post(
            'https://aatulya-bharat.onrender.com/api/chat',
            { userMessage: message , context : 'projectId'},
            { headers: { 'Content-Type': 'application/json' } }
        );
          console.log(response.data);

        //   const data = await response.json();
          const botMessage = this.createChatBotMessage(response.data.botResponse);

          this.setState((prev) => ({
              ...prev,
              messages: [...prev.messages, botMessage],
          }));
      } catch (error) {
          const botMessage = this.createChatBotMessage(
              "Oops, something went wrong. Please try again!"
          );
          this.setState((prev) => ({
              ...prev,
              messages: [...prev.messages, botMessage],
          }));
      }
  };
}

export default ActionProvider;
