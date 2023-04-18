import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/prisma-db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import slug from 'slug';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
        }
      );
    }
    const res = (await req.json()) as Post;
    const categoryId = await db.category.findFirst({
      where: {
        slug: res.category,
      },
      select: {
        id: true,
      },
    });
    if (!categoryId) {
      return NextResponse.json(
        { message: 'Category not found' },
        {
          status: 404,
        }
      );
    }
    const postSlug: string = slug(res.title);
    const result = await db.post.create({
      data: {
        title: res.title,
        content: res.content,
        imageUrl: res.image,
        slug: postSlug,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        category: {
          connect: {
            id: categoryId.id,
          },
        },
      },
    });
    return NextResponse.json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    const result = await db.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        slug: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
}
