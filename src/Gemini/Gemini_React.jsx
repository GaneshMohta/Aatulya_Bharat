import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Gemini_React() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // ⚠️ SECURITY WARNING: Do not hardcode API keys in production. Use import.meta.env.VITE_API_KEY
  const API_Key = "AIzaSyAppPBWZQ0Tdc8oa2TOSNfj3YvwJpyG2og";

  const genAI = new GoogleGenerativeAI(API_Key);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);

      // Store the current prompt locally before clearing state
      const prompt = inputValue;
      setInputValue('');

      // Update state to show the user's question immediately
      // We use 'prev' to ensure we don't lose previous history
      setPromptResponses(prev => [...prev, `User: ${prompt}`]);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log(text);

      // Update state again to add the AI's response
      setPromptResponses(prev => [...prev, `AI: ${text}`]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full h-screen z-10 overflow-y-scroll p-4">
      <div className="flex flex-col gap-4"> {/* Fixed className here */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask Me Something..."
            className="border border-gray-300 rounded px-4 py-2 h-12 w-[260px] text-black"
          />
          <button
            onClick={getResponseForGivenPrompt}
            className="text-xl bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 h-12"
          >
            ➡️
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="text-black">Loading...</span>
          </div>
        </div>
      )}

      <div className="mt-4">
        {promptResponses.map((promptResponse, index) => (
          <div key={index} className="p-2 border-b border-gray-100">
            <p className={`text-justify ${promptResponse.startsWith("User:") ? "text-blue-600 font-bold" : "text-gray-700"}`}>
              {promptResponse.startsWith("User:") ? "👤 " : "🤖 "}
              {promptResponse.replace(/^(User:|AI:)\s*/, "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
