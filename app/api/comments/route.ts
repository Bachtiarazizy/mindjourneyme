import { client } from "@/sanity/client";
import { serverClient } from "@/sanity/write-client";
import { NextRequest, NextResponse } from "next/server";

const COMMENTS_QUERY = `*[_type == "comment" && post._ref == $postId && approved == true && spam != true] | order(_createdAt desc) {
  _id,
  _createdAt,
  name,
  email,
  website,
  comment,
  approved,
  "replies": *[_type == "comment" && parentComment._ref == ^._id && approved == true] {
    _id,
    _createdAt,
    name,
    comment,
    "isAuthor": post->author->name == name
  }
}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 });
  }

  try {
    const comments = await client.fetch(COMMENTS_QUERY, { postId });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, comment, postId, website } = body;

    // Validation
    if (!name || !email || !comment || !postId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Comment length validation
    if (comment.trim().length < 10) {
      return NextResponse.json({ error: "Comment must be at least 10 characters" }, { status: 400 });
    }

    // Get IP and User Agent (optional)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create comment in Sanity
    const newComment = await serverClient.create({
      _type: "comment",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      comment: comment.trim(),
      website: website?.trim() || undefined,
      post: {
        _type: "reference",
        _ref: postId,
      },
      approved: false,
      spam: false,
      ipAddress: ip,
      userAgent: userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment submitted successfully",
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error: "Failed to create comment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
