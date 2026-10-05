import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  let database = "unconfigured";
  const db = getDb();
  if (db) {
    try {
      await db.execute(sql`select 1`);
      database = "connected";
    } catch {
      database = "unreachable";
    }
  }
  return NextResponse.json({
    ok: true,
    service: "avish-boricha-portfolio",
    database,
    timestamp: new Date().toISOString(),
  });
}
