'use client';
import useCategories from '@/hooks/useCategories';
import { cn } from '@/lib/utils';
import { Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';
import AddCategoryModal from '../ui/actions/AddCategoryModal';
import LoginWithGoogleBtn from '../ui/actions/LoginWithGoogleBtn';
import LoadingNavbar from './LoadingNavbar';
import Image from 'next/image';
interface NavbarProps {}
const navigation = {
  categories: [
    {
      name: 'Categories',
    },
  ],
};
const Navbar = ({}: NavbarProps) => {
  const { categories, isLoading } = useCategories();
  const session = useSession();
  const splitedCategories = _.chunk(categories, 5);

  const content = isLoading ? (
    <LoadingNavbar />
  ) : (
    <div className='bg-white fixed z-10 inset-x-0 top-0'>
      <header className='relative bg-white'>
        <nav aria-label='Top' className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0'>
            <div className='flex h-16 items-center justify-between'>
              {/* Logo */}
              <div className='flex flex-1'>
                <Link href='/'>
                  <span className='sr-only'>Your Company</span>
                  <Image
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt=''
                    width={30}
                    height={30}
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch'>
                <div className='flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0'>
                  {navigation.categories.map((category, categoryIdx) => (
                    <Popover key={categoryIdx} className='flex'>
                      {({ open }) => (
                        <>
                          <div className='relative flex'>
                            <Popover.Button
                              className={cn(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Popover.Panel className='absolute inset-x-0 top-full text-gray-500 sm:text-sm'>
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className='absolute inset-0 top-1/2 bg-white shadow'
                                aria-hidden='true'
                              />

                              <div className='relative bg-white'>
                                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                                  <div className='grid grid-cols-1 items-start gap-y-10 gap-x-6 pt-10 pb-12'>
                                    <div className='grid grid-cols-4 sm:grid-cols-3'>
                                      {splitedCategories.map(
                                        (category, idx) => {
                                          return (
                                            <ul
                                              key={idx}
                                              role='list'
                                              aria-labelledby='clothing-heading'
                                              className='space-y-6 sm:space-y-4'
                                            >
                                              {category.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className='flex'
                                                >
                                                  <Link
                                                    href={`/category/${item.slug}`}
                                                    className='hover:text-gray-800'
                                                  >
                                                    {item.name}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className='flex flex-1 items-center justify-end'>
                {/* Search */}
                <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                  <span className='sr-only'>Search</span>
                  <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
                </a>
                {/* Login Option */}
                {!session.data && session.status === 'unauthenticated' && (
                  <div className='dropdown dropdown-end'>
                    <label tabIndex={0} className='btn btn-ghost'>
                      <p>Login</p>
                    </label>
                    <ul
                      tabIndex={0}
                      className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
                    >
                      <li>
                        <LoginWithGoogleBtn className='max-w-sm mx-auto w-full' />
                      </li>
                    </ul>
                  </div>
                )}
                {/* Profile Icon */}
                {session.data && session.status === 'authenticated' && (
                  <div className='dropdown dropdown-end'>
                    <label
                      tabIndex={0}
                      className='btn btn-ghost btn-circle avatar'
                    >
                      <div className='w-10 rounded-full relative'>
                        <Image
                          alt='Profile Icon'
                          src={session.data.user.image ?? ''}
                          fill
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
                    >
                      <li>
                        <Link
                          href={`/post/create`}
                          className='justify-between hover:bg-indigo-500'
                        >
                          Create Post
                          <span className='badge'>New</span>
                        </Link>
                      </li>
                      <li>
                        <AddCategoryModal />
                      </li>
                      <li>
                        <button onClick={() => signOut()}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );

  return content;
};

export default Navbar;
