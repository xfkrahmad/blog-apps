import { validPost } from '@/lib/validation/create-post-validation';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '../CreatePost';

interface SelectInputProps {
  label: string;
  name: validPost;
  options: Category[];
  registerProps: UseFormRegister<FormData>;
  errorsMessage: string | undefined;
}

const SelectInput = ({
  name,
  label,
  options,
  registerProps,
  errorsMessage,
}: SelectInputProps) => {
  return (
    <div className='form-control max-w-xl w-full mt-4'>
      <label className='bg-gray-200 rounded-t-md'>
        <span className='ml-4'>{label}</span>
      </label>
      <select {...registerProps(name)} defaultValue={options[0].value}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value == 'default'}
          >
            {option.label}
          </option>
        ))}
      </select>
      <p className='text-red-500'>{errorsMessage}</p>
    </div>
  );
};

export default SelectInput;
