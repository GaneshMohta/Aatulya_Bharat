import React,{useState} from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Color } from 'three';




export default function Gemini_React() {

  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_Key = "AIzaSyAppPBWZQ0Tdc8oa2TOSNfj3YvwJpyG2og"
  const genAI = new GoogleGenerativeAI(
    API_Key
  );
   const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      //const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      setpromptResponses(...promptResponses,inputValue);
      const result = await model.generateContent(inputValue);
      setInputValue('')
      const response = result.response;
      const text = response.text();
      console.log(text)
      setpromptResponses([...promptResponses,text]);

      setLoading(false)
    }
    catch (error) {
      console.log(error)
      console.log("Something Went Wrong");
      setLoading(false)
    }
  }
    ;

  return (
    <div className="bg-black w-[100%] h-[100%]  z-10 overflow-y-scroll">
    <div className="flex col">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ask Me Something You Want"
          className="form-control h-12 w-[260px]"
        />
      </div>
      <div className="col-auto ">
        <button onClick={getResponseForGivenPrompt} className="">➡️</button>
      </div>
    </div>
    {loading ? (
      <div className="text-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden text-white">Loading...</span>
        </div>
      </div>
    ) : (
      promptResponses.map((promptResponse, index) => (
        <div key={index} className='p-2  scroll-p-0' >
          <p className={`response-text ${index === promptResponses.length - 1 ? 'fw-bold' : ''} text-red-200 text-justify text-pretty `}>🤖{promptResponse}</p>
        </div>
      ))
    )}
  </div>
  );
}
