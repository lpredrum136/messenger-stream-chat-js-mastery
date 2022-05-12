import { DefaultGenerics } from 'stream-chat';
import {
  ChannelPreviewUIComponentProps,
  useChatContext,
  Avatar,
} from 'stream-chat-react';
import { ChannelType } from './types';
import './TeamChannelPreview.css';

const TeamChannelPreview = ({
  type,
  channel,
}: ChannelPreviewUIComponentProps<DefaultGenerics> & ChannelType) => {
  const { channel: activeChannel, client } = useChatContext();

  // TODO testing class channel-preview__item
  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      # {channel.data?.name || channel.data?.id}
    </p>
  );

  // client.userID is our id, meaning throwing ourselves out of that chat, so we actually get all the users we're talking to
  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      (member) => member.user?.id !== client.userID
    );

    return (
      <div className='channel-preview__item'>
        <Avatar
          image={members[0].user?.image as string | null | undefined}
          name={members[0].user?.name}
          size={24}
        />
        <p>{members[0].user?.name}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel.id === activeChannel?.id
          ? 'h-9 flex items-center hover:channel-preview__wrapper__selected'
          : 'h-auto flex items-center channel-preview__wrapper__selected'
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
