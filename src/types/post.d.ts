interface Post {
  category: string;
  title: string;
  image: string;
  content: string;
}

interface PostRaw {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  author: Author;
  category: CategoryRaw;
}

interface CategoryPost {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
  image: string;
}
