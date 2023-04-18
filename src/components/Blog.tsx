import parse, { Element } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
interface BlogProps {
  posts: PostRaw[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <div className='relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28'>
      <div className='absolute inset-0'>
        <div className='h-1/3 bg-white sm:h-2/3' />
      </div>
      <div className='relative mx-auto max-w-7xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            From the blog
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className='mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post) => (
            <div
              key={post.title}
              className='flex flex-col overflow-hidden rounded-lg shadow-lg'
            >
              <div className='flex-shrink-0'>
                <Image
                  className='h-48 w-full object-cover'
                  src={post.imageUrl}
                  alt=''
                  width={400}
                  height={400}
                />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-indigo-600'>
                    <Link
                      href={`/category/${post.category.slug}`}
                      className='hover:underline'
                    >
                      {post.category.name}
                    </Link>
                  </p>
                  <Link href={`/post/${post.slug}`} className='mt-2 block'>
                    <p className='text-xl font-semibold text-gray-900 line-clamp-2'>
                      {post.title}
                    </p>
                    <div className='mt-3 inline text-base text-gray-500 text-justify'>
                      {(() => {
                        const parsedHtml = parse(post.content) as any;
                        const intro = parsedHtml[0].props.children;
                        return <p className='line-clamp-5'>{intro}</p>;
                      })()}
                    </div>
                  </Link>
                </div>
                <div className='mt-6 flex items-center'>
                  <div className='flex-shrink-0'>
                    <span className='sr-only'>{post.author.name}</span>
                    <Image
                      className='h-10 w-10 rounded-full'
                      src={post.author.image}
                      alt=''
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-gray-900'>
                      <a className='hover:underline'>{post.author.name}</a>
                    </p>
                    <div className='flex space-x-1 text-sm text-gray-500'>
                      <time dateTime={post.createdAt}>
                        {moment(post.createdAt).format('DD MMMM YYYY')}
                      </time>
                      <span aria-hidden='true'>&middot;</span>
                      <span>0 minutes read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
