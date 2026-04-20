import { Router, type IRouter } from "express";
import jwt from "jsonwebtoken";
import { db, usersTable, socialsTable, profileLinksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";

router.get("/profiles/:username", async (req, res) => {
  const { username } = req.params;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username.toLowerCase()))
    .limit(1);

  if (!user) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  await db
    .update(usersTable)
    .set({ views: user.views + 1 })
    .where(eq(usersTable.id, user.id));

  const socials = await db
    .select()
    .from(socialsTable)
    .where(eq(socialsTable.userId, user.id))
    .orderBy(socialsTable.sortOrder);

  const links = await db
    .select()
    .from(profileLinksTable)
    .where(eq(profileLinksTable.userId, user.id))
    .orderBy(profileLinksTable.sortOrder);

  res.json({
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    avatar: user.avatar,
    verified: user.verified,
    premium: user.premium,
    badge: user.badge,
    bgGradient: user.bgGradient,
    cardBg: user.cardBg,
    accentColor: user.accentColor,
    views: user.views + 1,
    stars: user.stars,
    socials: socials.map((s) => ({ type: s.type, url: s.url, label: s.label })),
    links: links.map((l) => ({ title: l.title, url: l.url, icon: l.icon })),
  });
});

router.put("/profiles/:username", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  let payload: { userId: number; username: string };
  try {
    payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as typeof payload;
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  if (payload.username !== req.params.username.toLowerCase()) {
    res.status(403).json({ error: "You can only edit your own profile" });
    return;
  }

  const { displayName, bio, bgGradient, cardBg, accentColor, badge, socials, links } = req.body as {
    displayName?: string;
    bio?: string;
    bgGradient?: string;
    cardBg?: string;
    accentColor?: string;
    badge?: string;
    socials?: { type: string; url: string; label: string }[];
    links?: { title: string; url: string; icon?: string }[];
  };

  await db
    .update(usersTable)
    .set({
      ...(displayName !== undefined && { displayName }),
      ...(bio !== undefined && { bio }),
      ...(bgGradient !== undefined && { bgGradient }),
      ...(cardBg !== undefined && { cardBg }),
      ...(accentColor !== undefined && { accentColor }),
      ...(badge !== undefined && { badge }),
    })
    .where(eq(usersTable.id, payload.userId));

  if (socials !== undefined) {
    await db.delete(socialsTable).where(eq(socialsTable.userId, payload.userId));
    if (socials.length > 0) {
      await db.insert(socialsTable).values(
        socials.map((s, i) => ({
          userId: payload.userId,
          type: s.type,
          url: s.url,
          label: s.label,
          sortOrder: i,
        })),
      );
    }
  }

  if (links !== undefined) {
    await db.delete(profileLinksTable).where(eq(profileLinksTable.userId, payload.userId));
    if (links.length > 0) {
      await db.insert(profileLinksTable).values(
        links.map((l, i) => ({
          userId: payload.userId,
          title: l.title,
          url: l.url,
          icon: l.icon ?? "globe",
          sortOrder: i,
        })),
      );
    }
  }

  res.json({ success: true });
});

export default router;
