import { Skeleton } from '@mui/material';

interface LoadingNavbarProps {}

const LoadingNavbar = ({}: LoadingNavbarProps) => {
  return (
    <div className='bg-white fixed z-10 inset-x-0 top-0'>
      <header className='relative bg-white'>
        <nav aria-label='Top' className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0'>
            <div className='flex h-16 items-center justify-between'>
              {/* Logo */}
              <div className='flex flex-1'>
                <a href='#'>
                  <span className='sr-only'>Your Company</span>
                  <Skeleton variant='circular' width={40} height={40} />
                </a>
              </div>
              <Skeleton height={20} width={70} />
              <div className='flex flex-1 items-center justify-end'>
                {/* Search */}
                <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                  <span className='sr-only'>Search</span>
                  <Skeleton height={20} width={20} />
                </a>
                {/* Login Option */}
                <Skeleton variant='circular' width={40} height={40} />
                {/* Profile Icon */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default LoadingNavbar;
