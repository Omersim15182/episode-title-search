import style from "./Messages.module.css";

export default function Messages() {
  //   const [messages, setMessages] = useState<string[]>([]);

  return (
    <div className={style["messages"]}>
      <div className={style["messages-container"]}>
        <input
          type="text"
          className={style["custom-input"]}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}
