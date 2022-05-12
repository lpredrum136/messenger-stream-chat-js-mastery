import { Channel, DefaultGenerics } from 'stream-chat';
import {
  ChannelList,
  ChannelListMessengerProps,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from 'stream-chat-react';

import { ChannelType } from './channel-list-components/types';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from './channel-list-components';

const SideBarIcon = ({
  icon,
  customStyles,
}: {
  icon: string;
  customStyles?: string;
}) => (
  <div
    className={`bg-gradient-sidebar-icon w-11 h-11 m-[14px] rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.33)]${
      customStyles ? ` ${customStyles}` : ''
    }`}
  >
    <div className='flex-center h-full'>
      <img src={icon} alt={icon} className='w-7' />
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className='p-4'>
    <p className='font-bold text-[18px] leading-7 text-white'>Medical Pager</p>
  </div>
);

const SideBar = () => (
  <div className='w-[72px] bg-gradient-sidebar shadow-[1px_0_0_rgba(0,0,0,0.25)]'>
    <SideBarIcon icon={HospitalIcon} />
    <SideBarIcon icon={LogoutIcon} customStyles='cursor-pointer' />
  </div>
);

const generateCustomChannelList =
  (type: ChannelType['type']) =>
  (channelListDefaultProps: ChannelListMessengerProps) =>
    (
      <TeamChannelList {...channelListDefaultProps} type={type}>
        <div></div>
      </TeamChannelList>
    );

const generateCustomeChannelPreview =
  (type: ChannelType['type']) =>
  (
    channelPreviewDefaultProps: ChannelPreviewUIComponentProps<DefaultGenerics>
  ) =>
    <TeamChannelPreview {...channelPreviewDefaultProps} type={type} />;

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className='flex flex-col bg-primary w-60'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={(channels: Channel[]) => channels}
          List={generateCustomChannelList('team')}
          Preview={generateCustomeChannelPreview('team')}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={(channels: Channel[]) => channels}
          List={generateCustomChannelList('messaging')}
          Preview={generateCustomeChannelPreview('messaging')}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
