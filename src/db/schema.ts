import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Every message sent through the portfolio contact form is persisted here.
 * The same payload is also e-mailed to Avish as a formatted HTML table.
 */
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  projectType: varchar("project_type", { length: 80 }).notNull(),
  budget: varchar("budget", { length: 60 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});
