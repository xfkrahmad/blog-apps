'use client';
import { FC, useState } from 'react';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

interface LoginWithGoogleBtnProps {
  className: string;
}

const LoginWithGoogleBtn: FC<LoginWithGoogleBtnProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loginWithGoogleHandler = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Something went wrong with your login.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      isLoading={isLoading}
      type='button'
      className={className}
      onClick={loginWithGoogleHandler}
    >
      {isLoading ? null : <FcGoogle />}
      <span className='ml-2'> Google</span>
    </Button>
  );
};

export default LoginWithGoogleBtn;
