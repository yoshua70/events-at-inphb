import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  content: string;
  bgColor?: string;
};

const Message = ({ content, bgColor }: Props) => {
  const onClick = () => {
    document.getElementById("message")?.remove();
  };

  let theme;

  switch (bgColor) {
    case "red":
      theme = "message-red";
      break;

    default:
      theme = "message";
      break;
  }

  return (
    <div className={bgColor ? `message ${theme}` : "message"} id="message">
      <p className="">{content}</p>
      <span onClick={onClick}>
        <FontAwesomeIcon icon={faXmark} />
      </span>
    </div>
  );
};

export default Message;
