import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * The database client is created lazily so that:
 *  - `next build` never crashes when DATABASE_URL isn't set (e.g. first
 *    Vercel deployment), and
 *  - the contact API can still deliver the email even if the database is
 *    temporarily unreachable.
 */
const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __avishPortfolioPool?: Pool | null;
};

function createPool(): Pool | null {
  if (!databaseUrl) return null;
  return new Pool({ connectionString: databaseUrl });
}

const pool =
  globalForDb.__avishPortfolioPool !== undefined
    ? globalForDb.__avishPortfolioPool
    : createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__avishPortfolioPool = pool;
}

/** Returns a Drizzle client, or `null` when no database is configured. */
export function getDb() {
  if (!pool) return null;
  return drizzle(pool);
}

export const hasDatabase = Boolean(databaseUrl);
