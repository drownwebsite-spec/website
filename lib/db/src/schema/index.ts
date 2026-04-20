import { pgTable, text, serial, boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 30 }).notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  bio: text("bio").default(""),
  avatar: text("avatar").default(""),
  verified: boolean("verified").default(false).notNull(),
  premium: boolean("premium").default(false).notNull(),
  badge: text("badge").default(""),
  bgGradient: text("bg_gradient").default("linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"),
  cardBg: text("card_bg").default("rgba(255,255,255,0.04)"),
  accentColor: text("accent_color").default("#a78bfa"),
  views: integer("views").default(0).notNull(),
  stars: integer("stars").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const socialsTable = pgTable("socials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 30 }).notNull(),
  url: text("url").notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const profileLinksTable = pgTable("profile_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  icon: text("icon").default("globe"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  verified: true,
  premium: true,
  views: true,
  stars: true,
  createdAt: true,
});

export const insertSocialSchema = createInsertSchema(socialsTable).omit({ id: true });
export const insertProfileLinkSchema = createInsertSchema(profileLinksTable).omit({ id: true });

export type User = typeof usersTable.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Social = typeof socialsTable.$inferSelect;
export type ProfileLink = typeof profileLinksTable.$inferSelect;
