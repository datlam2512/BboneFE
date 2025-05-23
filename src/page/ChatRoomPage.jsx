import { Helmet } from "react-helmet";
import  AccountChat  from "../section/AccountChatPage/views/AccountChat";

function ChatRoomPage() {
  return (
    <div>
      <Helmet>
        <title>ChatRoom</title>
      </Helmet>
      <AccountChat />
    </div>
  );
}
export default ChatRoomPage;
2