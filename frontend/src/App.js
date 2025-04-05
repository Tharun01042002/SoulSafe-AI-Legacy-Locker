
import React, { useState } from "react";
import { Button, Textarea } from "@material-ui/core";

function App() {
  const [message, setMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAIHelp = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setAiMessage(data.aiMessage);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>SoulSafe</h1>
      <Textarea
        placeholder="Write your legacy message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleAIHelp} disabled={loading}>
        {loading ? "Generating..." : "Help me write with AI"}
      </Button>
      {aiMessage && <div>{aiMessage}</div>}
    </div>
  );
}

export default App;
