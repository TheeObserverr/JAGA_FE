import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { userType } = body;

  // Simple mock token generation
  const token = btoa(JSON.stringify({ userType, exp: Date.now() + 3600000 }));

  return NextResponse.json({ token });
}
