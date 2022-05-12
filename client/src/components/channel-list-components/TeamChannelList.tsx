import { ReactNode } from 'react';
import { ChannelListMessengerProps } from 'stream-chat-react';
import { ChannelType } from './types';
// import AddChannel from '../../assets/AddChannel';

const TeamChannelListWrapper = ({ children }: { children: ReactNode }) => (
  <div className='w-full flex flex-col'>{children}</div>
);

const Alert = ({ msg }: { msg: string }) => (
  <TeamChannelListWrapper>
    <p className='text-white px-4'>{msg}</p>
  </TeamChannelListWrapper>
);

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
}: ChannelListMessengerProps &
  ChannelType & {
    children: ReactNode;
  }) => {
  if (error) {
    if (type !== 'team') return null;

    return <Alert msg='Connection error, please wait a moment and try again' />;
  }

  if (loading) {
    return (
      <Alert msg={type === 'team' ? 'Channels loading' : 'Messages loading'} />
    );
  }

  return (
    <TeamChannelListWrapper>
      <div className='px-4 flex justify-between items-center'>
        <p className='text-sm leading-4 h-4 text-[#ffffffa8] mb-[10px]'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>

        {/* button to add channel */}
      </div>
      {children}
    </TeamChannelListWrapper>
  );
};

export default TeamChannelList;
