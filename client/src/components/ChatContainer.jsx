import { useRef, useState } from "react";
import MobileNav from "./MobileNav";

export default function ChatContainer() {
  const [message, setMessage] = useState("");

  const messageInput = useRef();

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert("to implement: send message", message);
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      // messageInput.submit();
      setMessage("");
      alert(message);
    }
  };

  return (
    <div className="chat-container">
      <MobileNav />
      <div className="message-pane">
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
        <p>hello, world!</p>
      </div>
      <form
        ref={messageInput}
        className="message-input"
        onSubmit={(e) => handleSendMessage(e)}
      >
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}