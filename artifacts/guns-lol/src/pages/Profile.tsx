import { useState, useEffect } from "react";
import { SiDiscord, SiTiktok, SiX, SiGithub, SiInstagram, SiYoutube, SiTwitch, SiSpotify, SiSteam, SiSnapchat } from "react-icons/si";
import { Globe, Star, Eye, Share2, Copy, Check, Music, ExternalLink } from "lucide-react";

function GunIconSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M110 20H95V15C95 13.3 93.7 12 92 12H28C26.3 12 25 13.3 25 15V20H10C8.3 20 7 21.3 7 23V33C7 34.7 8.3 36 10 36H25V40C25 42.2 26.8 44 29 44H36V52C36 53.1 36.9 54 38 54H50C51.1 54 52 53.1 52 52V44H92C94.2 44 96 42.2 96 40V36H110C111.7 36 113 34.7 113 33V23C113 21.3 111.7 20 110 20Z" />
    </svg>
  );
}

// Fake profile data keyed by username
const PROFILES: Record<string, Profile> = {
  vue: {
    username: "vue",
    displayName: "vue ♡",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=vue&backgroundColor=b6e3f4",
    bio: "welcome to my page!",
    verified: true,
    premium: true,
    views: 2541,
    stars: 4,
    badge: "✦",
    bgGradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    cardBg: "rgba(255,255,255,0.04)",
    accentColor: "#a78bfa",
    socials: [
      { type: "discord", url: "#", label: "discord" },
      { type: "github", url: "#", label: "github" },
      { type: "x", url: "#", label: "twitter" },
    ],
    links: [
      { title: "My Portfolio", url: "#", icon: "globe" },
      { title: "My Discord Server", url: "#", icon: "discord" },
      { title: "My YouTube", url: "#", icon: "youtube" },
    ],
  },
  hris: {
    username: "hris",
    displayName: "hris",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=hris&backgroundColor=c0aede",
    bio: "guns.lol on top!",
    verified: true,
    premium: true,
    views: 4814,
    stars: 5,
    badge: "◈",
    bgGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    cardBg: "rgba(255,255,255,0.04)",
    accentColor: "#818cf8",
    socials: [
      { type: "discord", url: "#", label: "discord" },
      { type: "github", url: "#", label: "github" },
      { type: "x", url: "#", label: "twitter" },
    ],
    links: [
      { title: "papaparc — Playing VS Code", url: "#", icon: "discord", subtitle: "Editing code..." },
    ],
  },
  demo: {
    username: "demo",
    displayName: "Demo User",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=demo&backgroundColor=d1d4f9",
    bio: "This is a demo profile page ✨ Customize yours at guns.lol",
    verified: false,
    premium: false,
    views: 120,
    stars: 3,
    badge: null,
    bgGradient: "linear-gradient(135deg, #111113 0%, #1a0b2e 100%)",
    cardBg: "rgba(255,255,255,0.04)",
    accentColor: "#a78bfa",
    socials: [
      { type: "discord", url: "#", label: "discord" },
      { type: "x", url: "#", label: "twitter" },
      { type: "instagram", url: "#", label: "instagram" },
    ],
    links: [
      { title: "My Website", url: "#", icon: "globe" },
      { title: "Support Me", url: "#", icon: "star" },
    ],
  },
};

interface Social { type: string; url: string; label: string; }
interface Link { title: string; url: string; icon: string; subtitle?: string; }
interface Profile {
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  verified: boolean;
  premium: boolean;
  views: number;
  stars: number;
  badge: string | null;
  bgGradient: string;
  cardBg: string;
  accentColor: string;
  socials: Social[];
  links: Link[];
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  discord: <SiDiscord size={18} />,
  tiktok: <SiTiktok size={18} />,
  x: <SiX size={18} />,
  twitter: <SiX size={18} />,
  github: <SiGithub size={18} />,
  instagram: <SiInstagram size={18} />,
  youtube: <SiYoutube size={18} />,
  twitch: <SiTwitch size={18} />,
  spotify: <SiSpotify size={18} />,
  steam: <SiSteam size={18} />,
  snapchat: <SiSnapchat size={18} />,
  globe: <Globe size={18} />,
  star: <Star size={18} />,
  music: <Music size={18} />,
};

const LINK_ICONS: Record<string, React.ReactNode> = {
  discord: <SiDiscord size={16} />,
  youtube: <SiYoutube size={16} />,
  github: <SiGithub size={16} />,
  twitter: <SiX size={16} />,
  x: <SiX size={16} />,
  instagram: <SiInstagram size={16} />,
  twitch: <SiTwitch size={16} />,
  spotify: <SiSpotify size={16} />,
  globe: <Globe size={16} />,
  star: <Star size={16} />,
};

function useTypewriter(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

export default function Profile({ username }: { username: string }) {
  const profile = PROFILES[username] ?? {
    ...PROFILES.demo,
    username,
    displayName: username,
    bio: `${username}'s profile`,
    avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4`,
  };

  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const bio = useTypewriter(profile.bio);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(`guns.lol/${profile.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const formatViews = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : n.toString();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-12 pb-16 px-4 relative overflow-hidden font-['Inter']"
      style={{ background: profile.bgGradient }}
      data-testid="profile-page"
    >
      {/* Background particles / subtle noise */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 70%)" }} />

      {/* Profile card */}
      <div
        className="relative z-10 w-full max-w-[340px] flex flex-col items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.45s ease, transform 0.45s ease",
        }}
        data-testid="profile-card"
      >
        {/* Avatar */}
        <div className="relative mb-4" data-testid="profile-avatar-wrapper">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 shadow-2xl"
            style={{ borderColor: profile.accentColor + "60" }}
          >
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="w-full h-full object-cover bg-[#1a1a2e]"
              data-testid="profile-avatar"
            />
          </div>
          {profile.premium && (
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
              style={{ background: profile.accentColor, color: "#000" }}
              data-testid="profile-premium-badge"
              title="Premium"
            >
              ◈
            </div>
          )}
        </div>

        {/* Username + stars */}
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-white font-bold text-xl tracking-tight" data-testid="profile-username">
            {profile.displayName}
          </h1>
          {profile.verified && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
              style={{ background: profile.accentColor }}
              data-testid="profile-verified-badge"
              title="Verified"
            >
              ✓
            </div>
          )}
          {profile.badge && (
            <span className="text-sm" style={{ color: profile.accentColor }} data-testid="profile-badge">{profile.badge}</span>
          )}
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-3" data-testid="profile-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < profile.stars ? "fill-current" : "opacity-20"}
              style={{ color: i < profile.stars ? profile.accentColor : "#ffffff" }}
            />
          ))}
        </div>

        {/* Bio */}
        <p
          className="text-gray-300 text-sm text-center mb-5 min-h-[20px] leading-relaxed px-2"
          data-testid="profile-bio"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {bio}
          <span className="animate-pulse">|</span>
        </p>

        {/* Social icons */}
        {profile.socials.length > 0 && (
          <div className="flex items-center gap-3 mb-6" data-testid="profile-socials">
            {profile.socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                data-testid={`social-icon-${s.type}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: profile.cardBg,
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                }}
                title={s.label}
              >
                {SOCIAL_ICONS[s.type] ?? <Globe size={18} />}
              </a>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="w-full space-y-2.5 mb-6" data-testid="profile-links">
          {profile.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              data-testid={`profile-link-${i}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
              style={{
                background: profile.cardBg,
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: profile.accentColor + "22", color: profile.accentColor }}
              >
                {LINK_ICONS[link.icon] ?? <ExternalLink size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{link.title}</div>
                {link.subtitle && (
                  <div className="text-gray-500 text-xs truncate mt-0.5">{link.subtitle}</div>
                )}
              </div>
              <ExternalLink size={13} className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>

        {/* Views + share row */}
        <div className="flex items-center justify-between w-full px-1 mb-8" data-testid="profile-meta-row">
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <Eye size={13} />
            <span>{formatViews(profile.views)} views</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="button-copy-link"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              <span>{copied ? "Copied!" : "Copy link"}</span>
            </button>
            <button
              data-testid="button-share"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Share2 size={12} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* guns.lol footer branding */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease 0.4s",
        }}
      >
        <a
          href="/"
          data-testid="link-guns-lol-branding"
          className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 hover:bg-black/60 transition-all duration-200 hover:scale-105"
        >
          <GunIconSmall className="w-5 h-3 text-purple-400" />
          <span className="text-white text-xs font-semibold tracking-tight">guns.lol</span>
        </a>
      </div>
    </div>
  );
}
