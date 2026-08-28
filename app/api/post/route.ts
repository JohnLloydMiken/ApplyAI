// app/api/posts/route.ts
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json()

  const post = await prisma.post.create({
    data: { imageUrl },
  })

  return NextResponse.json(post)
}