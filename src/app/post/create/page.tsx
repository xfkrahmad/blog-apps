import CreatePost from '@/components/CreatePost';

interface CreateProps {}

const CreatePage = async ({}: CreateProps) => {
  return (
    <main>
      <CreatePost />
    </main>
  );
};

export default CreatePage;
