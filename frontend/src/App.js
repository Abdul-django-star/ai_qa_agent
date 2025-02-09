import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [query, setQuery] = useState(""); // State to handle the user's input
  const [history, setHistory] = useState([]); // State to store chat history
  const [loading, setLoading] = useState(false); // State to manage loading state

  const sendQuery = async () => {
    if (!query.trim()) return; // Avoid sending empty queries

    setLoading(true); // Set loading state to true while waiting for response
    try {
      // Sending POST request to the backend with the user's query
      const response = await axios.post("http://localhost:8000/chat/", {
        query,
      });

      // Updating the conversation history with both the user query and AI's response
      const newHistory = [
        ...history,
        { query, answer: response.data.response },
      ];
      setHistory(newHistory);
      setQuery(""); // Clear the input box
    } catch (error) {
      console.error("Error sending query:", error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="chat-box">
      <h1>AI Chatbot</h1>

      {/* Displaying the conversation history */}
      <div className="chat-history">
        {history.map((item, index) => (
          <div key={index} className="chat-item">
            <div className="user-query">
              <strong>You:</strong> {item.query}
            </div>
            <div className="ai-response">
              <strong>AI:</strong> {item.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Input area for the user to ask questions */}
      <div className="chat-input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query state
          placeholder="Ask something..."
        />
        <button onClick={sendQuery} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
