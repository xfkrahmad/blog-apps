import { Skeleton } from '@mui/material';

interface CreatePostLoadingProps {}

const CreatePostLoading = ({}: CreatePostLoadingProps) => {
  return (
    <div className='relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28'>
      <div className='relative mx-auto max-w-7xl'>
        <div className='mx-auto max-w-lg xl:max-w-none'>
          <div className='xl:flex xl:justify-between gap-x-4'>
            <div className='w-full'>
              <div className='form-control max-w-xl w-full mt-4'>
                <Skeleton height={100} />
              </div>
              <div className='form-control max-w-xl w-full mt-4'>
                <Skeleton height={100} />
              </div>
              <div className='form-control max-w-xl w-full mt-4'>
                <Skeleton height={100} />
              </div>
            </div>
            <div className='form-control max-w-xl w-full mt-4'>
              <Skeleton height={150} />
            </div>
          </div>
        </div>

        <div className='w-1/4 mt-4 flex justify-center items-center mx-auto'>
          <Skeleton width={300} height={40} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostLoading;
