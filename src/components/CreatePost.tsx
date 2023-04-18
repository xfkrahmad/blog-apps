'use client';
import { checkEnvironment } from '@/app/helpers/check-env';
import useCategories, { categorySelectOptions } from '@/hooks/useCategories';
import { isValidPost } from '@/lib/validation/create-post-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import Button from './ui/Button';
import Input from './ui/Input';
import SelectInput from './ui/SelectInput';
import CreatePostLoading from './CreatePostLoading';

export type FormData = z.infer<typeof isValidPost>;

interface CreateProps {}

const CreatePost = ({}: CreateProps) => {
  const Editor = dynamic(() => import('./ui/CKEditorInput'), { ssr: false });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isValidPost),
  });
  useEffect(() => {
    register('content');
  }, []);

  const { categories: categoriesRaw, isLoading } = useCategories();
  let categoriesOptions: Category[] = [];
  if (!isLoading) {
    categoriesOptions = categorySelectOptions(categoriesRaw);
  }
  const addPost = async (
    title: string,
    category: string,
    image: string,
    content: string
  ) => {
    try {
      const validatedData = isValidPost.parse({
        category,
        title,
        image,
        content,
      });
      const data = await axios.post(`${checkEnvironment()}/api/post`, {
        ...validatedData,
      });
      toast.success(`${validatedData.title} Has Been Added`);
      router.push('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(errors);
      }
      if (error instanceof AxiosError) {
        console.log(error);
      } else {
      }
    } finally {
    }
  };
  const formSubmitHandler = async (data: FormData) => {
    addPost(data.title, data.category, data.image, data.content);
  };

  const pageContent = isLoading ? (
    <CreatePostLoading />
  ) : (
    <div className='relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28'>
      <div className='relative mx-auto max-w-7xl'>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className='mx-auto max-w-lg xl:max-w-none'
        >
          <div className='xl:flex xl:justify-between gap-x-4'>
            <div className='w-full'>
              <SelectInput
                label='Choose your category'
                options={categoriesOptions}
                registerProps={register}
                name='category'
                errorsMessage={errors.category?.message}
              />
              <Input
                label='Post Image'
                placeholder='Post Image Url...'
                type='url'
                registerProps={register}
                name='image'
                errorsMessage={errors.image?.message}
              />
              <Input
                label='Post Title'
                placeholder='How to make your life eassier'
                type='text'
                registerProps={register}
                name='title'
                errorsMessage={errors.title?.message}
              />
            </div>
            <div className='w-full'>
              <Editor
                onChange={(v) => {
                  console.log(v);
                  setValue('content', v);
                }}
                errorsMessage={errors.content?.message}
                data={getValues('content')}
              />
            </div>
          </div>
          <Button className='w-1/4 mt-4 flex justify-center items-center mx-auto'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );

  return pageContent;
};

export default CreatePost;
