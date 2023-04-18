import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '../CreatePost';
import { validPost } from '@/lib/validation/create-post-validation';

interface InputProps {
  name: validPost;
  label: string;
  type: string;
  placeholder: string;
  registerProps: UseFormRegister<FormData>;
  errorsMessage: string | undefined;
}

const Input = ({
  name,
  label,
  type,
  placeholder,
  registerProps,
  errorsMessage,
}: InputProps) => {
  return (
    <div className='form-control max-w-xl w-full mt-4'>
      <label className='bg-gray-200 rounded-t-md'>
        <span className='ml-4'>{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className='input input-bordered'
        {...registerProps(name)}
      />
      <p className='text-red-500'>{errorsMessage}</p>
    </div>
  );
};

export default Input;
