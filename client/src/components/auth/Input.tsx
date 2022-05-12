import { ChangeEvent } from 'react';

const Input = ({
  name,
  placeholder,
  label,
  onChange,
  type = 'text',
}: {
  name: string;
  label: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
}) => (
  <div className='flex flex-col my-4'>
    <label htmlFor={name} className='mb-2 text-[#3d4f58] text-xs'>
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className='p-2 border border-solid border-[#b8c4c2] hover:border-[#dcdddd] focus:shadow-[0_0_0_1.5px_#005fff] focus:border-[#005fff] active:shadow-[0_0_0_1.5px_#005fff] active:border-[#005fff] rounded text-sm outline-none transition-all delay-[0] bg-white w-[85%]'
      onChange={onChange}
      required
    />
  </div>
);

export default Input;
