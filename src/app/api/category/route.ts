import { authOptions } from '@/lib/auth-options';
import { db } from '@/lib/prisma-db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import slug from 'slug';

export async function GET() {
  try {
    const result = await db.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    return NextResponse.json({
      message: 'success',
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }
}

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
    const res = (await req.json()) as Category;
    const categorySlug = slug(res.value);
    const isSlugExists = await db.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });
    if (isSlugExists) {
      return NextResponse.json(
        { message: 'Try another Category name' },
        {
          status: 400,
        }
      );
    }

    const result = await db.category.create({
      data: {
        name: res.value,
        slug: categorySlug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
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
