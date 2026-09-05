import { NextResponse } from "next/server";

const activeVisitors = new Map<string, number>();
const presenceWindow = 45_000;

export async function POST(request: Request) {
  const { visitorId } = await request.json() as { visitorId?: unknown };
  if (typeof visitorId !== "string" || visitorId.length > 100) {
    return NextResponse.json({ error: "Invalid visitor" }, { status: 400 });
  }

  const now = Date.now();
  activeVisitors.set(visitorId, now);
  for (const [id, seenAt] of activeVisitors) if (now - seenAt > presenceWindow) activeVisitors.delete(id);
  return NextResponse.json({ count: activeVisitors.size });
}
