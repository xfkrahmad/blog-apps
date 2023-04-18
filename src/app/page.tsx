import Blog from '../components/Blog';
import { checkEnvironment } from './helpers/check-env';

const getAllPosts = async () => {
  const res = await fetch(`${checkEnvironment()}/api/post`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data;
};

export default async function Home() {
  const { data } = await getAllPosts();
  const posts = data as PostRaw[];
  return (
    <main>
      <Blog posts={posts} />
    </main>
  );
}
