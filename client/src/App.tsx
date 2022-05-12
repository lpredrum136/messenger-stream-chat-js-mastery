import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { ChannelContainer, ChannelListContainer, Auth } from './components';
import { CHAT_TOKEN, CHAT_USERNAME, CHAT_USER_ID } from './constants';

const chatClient = StreamChat.getInstance('ma7kubpk6wkg');

const authToken = localStorage.getItem(CHAT_TOKEN);

if (authToken) {
  chatClient.connectUser(
    {
      id: localStorage.getItem(CHAT_USER_ID) as string,
      name: localStorage.getItem(CHAT_USERNAME) as string,
    },
    authToken
  );
}

function App() {
  if (!authToken) return <Auth />;
  return (
    <div className='flex shadow-[0_1px_4px_0_rgba(0,0,0,0.33)] h-screen'>
      <Chat client={chatClient}>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
