import { ChangeEvent, ComponentType, useState } from 'react';
import SearchIcon from '../../assets/SearchIcon';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getChannels = async (text: string) => {
    try {
      // TODO: fetch channels
    } catch (error) {
      setQuery('');
    }
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };

  return (
    <div className='relative flex justify-center pt-4 border-t border-solid border-[#00000033]'>
      <div className='flex items-center h-10 bg-[#337fff] rounded-lg mb-2 border border-solid border-transparent w-[90%] focus-within:border-white'>
        <div className='mx-2'>
          <SearchIcon />
        </div>

        <input
          type='text'
          className='text-white text-base outline-none bg-[#337fff] w-full'
          placeholder='Search'
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
