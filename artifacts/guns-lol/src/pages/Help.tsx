import { useState } from "react";
import { useLocation } from "wouter";
import { SiDiscord } from "react-icons/si";
import {
  Users, HelpCircle, Image, Gem, Fingerprint, AlertCircle,
  Rocket, Link2, Share2, Menu, Home, X, Search, ChevronRight,
  ExternalLink, Info, ArrowLeft
} from "lucide-react";

function GunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M110 20H95V15C95 13.3 93.7 12 92 12H28C26.3 12 25 13.3 25 15V20H10C8.3 20 7 21.3 7 23V33C7 34.7 8.3 36 10 36H25V40C25 42.2 26.8 44 29 44H36V52C36 53.1 36.9 54 38 54H50C51.1 54 52 53.1 52 52V44H92C94.2 44 96 42.2 96 40V36H110C111.7 36 113 34.7 113 33V23C113 21.3 111.7 20 110 20Z" />
    </svg>
  );
}

const CATEGORIES = [
  { slug: "account-support",       icon: <Users size={20} />,       label: "Account Support" },
  { slug: "how-to-guides",         icon: <HelpCircle size={20} />,  label: "How-To Guides" },
  { slug: "how-to-upload-assets",  icon: <Image size={20} />,       label: "How To Upload Assets" },
  { slug: "premium-guides",        icon: <Gem size={20} />,         label: "Premium Guides" },
  { slug: "policies-security",     icon: <Fingerprint size={20} />, label: "Policies & Security" },
  { slug: "troubleshooting",       icon: <AlertCircle size={20} />, label: "Troubleshooting & Issues" },
];

const POPULAR = [
  { slug: "getting-started",       icon: <Rocket size={20} />,      label: "Getting Started with guns.lol" },
  { slug: "adding-social-media",   icon: <Link2 size={20} />,       label: "Adding Your Social Media" },
  { slug: "premium",               icon: <Gem size={20} />,         label: "Explore guns.lol Premium" },
  { slug: "link-discord",          icon: <SiDiscord size={20} />,   label: "Link Your Discord Account" },
  { slug: "share-profile",         icon: <Share2 size={20} />,      label: "Share Your Profile" },
  { slug: "how-to-guides",         icon: <HelpCircle size={20} />,  label: "How-To Guides" },
];

/* ─── ARTICLES ──────────────────────────────────────────────── */
interface InfoBox { text: string; }
interface ArticleSection {
  heading: string;
  intro?: string;
  steps?: { text: string; link?: { label: string; href: string } }[];
  infoBoxes?: InfoBox[];
  mockup?: React.ReactNode;
}

interface Article {
  breadcrumb: string[];
  title: string;
  description?: string;
  sections: ArticleSection[];
}

function AccountActionsMockup({ highlight }: { highlight: string }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
      <div className="px-4 py-2.5 text-xs" style={{ color: "#888", borderBottom: "1px solid #2a2a2a" }}>Account Actions</div>
      {["Change Email", "By changing your password, you will be logged out of every device.", "Change Password", "Unlink Discord"].map((item, i) => (
        <div
          key={i}
          className="px-4 py-3 text-sm relative flex items-center justify-center"
          style={{
            borderBottom: i < 3 ? "1px solid #222" : "none",
            color: i === 1 ? "#666" : "#ccc",
            fontSize: i === 1 ? "11px" : "13px",
            background: item === highlight ? "#2a1a1a" : "transparent"
          }}
        >
          {item}
          {item === highlight && (
            <div className="absolute right-8 top-1/2 flex items-center gap-1" style={{ transform: "translateY(-50%)" }}>
              <div className="w-12 h-0.5 bg-red-500" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-red-500 rotate-45 -ml-1.5" />
            </div>
          )}
        </div>
      ))}
      <div className="mx-4 mb-4 mt-0 rounded-lg py-2.5 text-center text-sm flex items-center justify-center gap-2" style={{ background: "#4a0000", color: "#ff6b6b" }}>
        <span>⎋</span> Logout
      </div>
    </div>
  );
}

function SecurityMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
      <div className="px-4 py-2.5 text-xs" style={{ color: "#888", borderBottom: "1px solid #2a2a2a" }}>Security Settings</div>
      {[
        { label: "Multi-factor authentication", sub: "Multi-factor authentication adds a layer of security to your account", highlight: true },
        { label: "Login with Discord", sub: "Allows you to login with Discord into your guns.lol account", highlight: false },
      ].map((row, i) => (
        <div key={i} className="px-4 py-3 flex items-center justify-between relative" style={{ borderBottom: i === 0 ? "1px solid #222" : "none" }}>
          <div className="flex-1 pr-3">
            <div className="text-sm text-white mb-0.5">{row.label}</div>
            <div className="text-xs" style={{ color: "#555" }}>{row.sub}</div>
          </div>
          <div className="flex items-center gap-2">
            {row.highlight && (
              <div className="flex items-center gap-1 mr-1">
                <div className="w-8 h-0.5 bg-red-500" />
                <div className="w-2 h-2 border-t-2 border-r-2 border-red-500 rotate-45 -ml-1.5" />
              </div>
            )}
            <div className="w-10 h-5 rounded-full flex items-center px-0.5" style={{ background: "#7c3aed", justifyContent: "flex-end" }}>
              <div className="w-4 h-4 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const ARTICLES: Record<string, Article> = {
  "account-support": {
    breadcrumb: ["General", "Account Support"],
    title: "Account Support",
    description: "In this guide you will find information on how to manage your guns.lol account, including account settings, public profile, and more.",
    sections: [
      {
        heading: "How To Change Your Username, Alias, or Display Name",
        intro: "To change your username, alias, or display name, follow these steps:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/account", href: "#" } },
          { text: "Locate the \"Manage your account\" section" },
          { text: "Change the information you want to update" },
        ],
        infoBoxes: [
          { text: "There is a cooldown period of 3 days for changing your username and a cooldown period of 2 days for changing your alias." },
          { text: "Changing your username will also update your profile URL." },
        ],
      },
      {
        heading: "How To Change Your Email Address",
        intro: "To change your email address, follow these steps:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/account/settings", href: "#" } },
          { text: "Scroll down to the \"Account Actions\" section" },
          { text: "Click on \"Change Email\"" },
        ],
        mockup: <AccountActionsMockup highlight="Change Email" />,
      },
      {
        heading: "How To Change Your Password",
        intro: "To change your password, follow these steps:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/account/settings", href: "#" } },
          { text: "Scroll down to the \"Account Actions\" section" },
          { text: "Click on \"Change Password\"" },
        ],
        mockup: <AccountActionsMockup highlight="Change Password" />,
        infoBoxes: [{ text: "By changing your password, you will be logged out of every device." }],
      },
      {
        heading: "How To Enable Multi-Factor Authentication (2FA)",
        intro: "To enable Two-Factor Authentication (2FA), follow these steps:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/account/settings", href: "#" } },
          { text: "Scroll down to the \"Security Settings\" section" },
          { text: "Toggle the \"Multi-Factor Authentication\" switch" },
        ],
        mockup: <SecurityMockup />,
        infoBoxes: [{ text: "Two-Factor Authentication (2FA) adds an extra layer of security to your account." }],
      },
    ],
  },
  "how-to-guides": {
    breadcrumb: ["General", "How-To Guides"],
    title: "How-To Guides",
    description: "Step-by-step guides for getting the most out of guns.lol.",
    sections: [
      {
        heading: "How To Set Up Your Profile",
        intro: "To set up your guns.lol profile, follow these steps:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/account", href: "#" } },
          { text: "Upload a profile picture" },
          { text: "Add a bio and display name" },
          { text: "Link your social media accounts" },
        ],
      },
      {
        heading: "How To Add Custom Links",
        intro: "To add custom links to your profile:",
        steps: [
          { text: "Navigate to ", link: { label: "guns.lol/account/links", href: "#" } },
          { text: "Click \"Add Link\"" },
          { text: "Enter your link title and URL" },
          { text: "Save your changes" },
        ],
      },
    ],
  },
  "how-to-upload-assets": {
    breadcrumb: ["General", "How To Upload Assets"],
    title: "How To Upload Assets",
    description: "Learn how to upload and manage your assets on guns.lol.",
    sections: [
      {
        heading: "Uploading Files",
        intro: "To upload assets to guns.lol:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/account/assets", href: "#" } },
          { text: "Click the \"Upload\" button" },
          { text: "Select your file (images, videos, etc.)" },
          { text: "Your file will be instantly available via a shareable link" },
        ],
        infoBoxes: [{ text: "Maximum file size is 100MB for free users and 1GB for Premium users." }],
      },
    ],
  },
  "premium-guides": {
    breadcrumb: ["General", "Premium Guides"],
    title: "Premium Guides",
    description: "Everything you need to know about guns.lol Premium features.",
    sections: [
      {
        heading: "What's Included in Premium",
        steps: [
          { text: "Exclusive Badge on your profile" },
          { text: "Profile Layouts & Custom Fonts" },
          { text: "Typewriter Animation" },
          { text: "Special Profile Effects" },
          { text: "Advanced Customization & SEO" },
        ],
      },
      {
        heading: "How To Upgrade to Premium",
        intro: "To upgrade your account:",
        steps: [
          { text: "Go to ", link: { label: "guns.lol/premium", href: "#" } },
          { text: "Click \"Get Premium\"" },
          { text: "Complete your purchase — it's a one-time payment" },
        ],
        infoBoxes: [{ text: "Premium is a lifetime purchase. Pay once, keep it forever." }],
      },
    ],
  },
  "policies-security": {
    breadcrumb: ["General", "Policies & Security"],
    title: "Policies & Security",
    description: "Information about our policies, privacy practices, and security features.",
    sections: [
      {
        heading: "Privacy Policy",
        intro: "We collect only the information needed to provide you with our services:",
        steps: [
          { text: "Email address for account management" },
          { text: "Username and profile information you provide" },
          { text: "Usage analytics to improve the platform" },
        ],
      },
      {
        heading: "Account Security",
        intro: "We recommend the following security practices:",
        steps: [
          { text: "Enable Two-Factor Authentication (2FA)" },
          { text: "Use a strong, unique password" },
          { text: "Never share your account credentials" },
        ],
        infoBoxes: [{ text: "guns.lol will never ask for your password via email or Discord." }],
      },
    ],
  },
  "troubleshooting": {
    breadcrumb: ["General", "Troubleshooting & Issues"],
    title: "Troubleshooting & Issues",
    description: "Common issues and how to resolve them.",
    sections: [
      {
        heading: "Profile Not Loading",
        intro: "If your profile isn't loading correctly:",
        steps: [
          { text: "Clear your browser cache and cookies" },
          { text: "Try a different browser or incognito mode" },
          { text: "Check your internet connection" },
          { text: "Contact support if the issue persists" },
        ],
      },
      {
        heading: "Can't Log In",
        intro: "If you're having trouble logging in:",
        steps: [
          { text: "Double-check your email and password" },
          { text: "Use the \"Forgot Password\" option" },
          { text: "Make sure you're not using a VPN that could block access" },
        ],
        infoBoxes: [{ text: "If you've enabled 2FA, you'll need your authenticator app to log in." }],
      },
    ],
  },
  "getting-started": {
    breadcrumb: ["Popular Articles", "Getting Started"],
    title: "Getting Started with guns.lol",
    description: "Everything you need to get up and running with guns.lol in minutes.",
    sections: [
      {
        heading: "Create Your Account",
        intro: "To get started:",
        steps: [
          { text: "Visit ", link: { label: "guns.lol", href: "#" } },
          { text: "Click \"Sign Up for Free\"" },
          { text: "Choose your username (this becomes your profile URL)" },
          { text: "Verify your email address" },
        ],
      },
      {
        heading: "Customize Your Profile",
        steps: [
          { text: "Upload a profile picture" },
          { text: "Add a bio" },
          { text: "Add your social media links" },
          { text: "Choose a theme or background" },
        ],
        infoBoxes: [{ text: "Your profile is live immediately at guns.lol/yourusername" }],
      },
    ],
  },
};

/* ─── HELP NAVBAR ─────────────────────────────────────────────── */
function HelpNav({ onMenuClick }: { onMenuClick: () => void }) {
  const [, navigate] = useLocation();
  return (
    <div className="flex items-center justify-between px-4 py-4" data-testid="help-navbar">
      <a href="/help" onClick={e => { e.preventDefault(); navigate("/help"); }}>
        <GunIcon className="w-8 h-5 text-purple-500" />
      </a>
      <div className="flex items-center gap-5">
        <button onClick={() => navigate("/")} className="transition-colors hover:text-white" style={{ color: "#999" }}>
          <Home size={18} />
        </button>
        <a href="https://discord.gg/gunslol" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" style={{ color: "#999" }}>
          <SiDiscord size={18} />
        </a>
        <button onClick={onMenuClick} className="transition-colors hover:text-white" style={{ color: "#999" }}>
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
}

/* ─── HELP MENU OVERLAY ────────────────────────────────────────── */
function HelpMenuOverlay({ onClose }: { onClose: () => void }) {
  const [, navigate] = useLocation();
  return (
    <div className="fixed inset-0 z-50 flex flex-col font-['Inter']" style={{ background: "#0b0b0b" }}>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <GunIcon className="w-7 h-4 text-purple-500" />
          <span className="font-bold text-white text-base">guns.lol</span>
        </div>
        <button onClick={onClose} style={{ color: "#a78bfa" }}>
          <X size={22} />
        </button>
      </div>
      <div className="px-4 pt-2 space-y-2">
        <button
          onClick={() => { onClose(); }}
          className="w-full text-left px-4 py-3.5 rounded-xl text-white text-sm"
          style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
        >
          Help Center
        </button>
        {["Discord", "Leaderboard", "Pricing"].map(item => (
          <button
            key={item}
            onClick={() => { onClose(); navigate(item === "Pricing" ? "/#pricing-section" : "/"); }}
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#ccc" }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="px-4 mt-auto pb-8 space-y-3">
        <button
          className="w-full text-left px-4 py-3.5 rounded-xl text-sm"
          style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#ccc" }}
          onClick={() => { onClose(); navigate("/login"); }}
        >
          Login
        </button>
        <button
          onClick={() => { onClose(); navigate("/signup"); }}
          className="w-full text-white font-semibold py-3.5 rounded-full text-sm"
          style={{ background: "#5b21b6" }}
        >
          Sign Up Free
        </button>
      </div>
    </div>
  );
}

/* ─── ARTICLE VIEW ────────────────────────────────────────────── */
function ArticleView({ slug, onBack }: { slug: string; onBack: () => void }) {
  const article = ARTICLES[slug];
  if (!article) return (
    <div className="px-5 py-12 text-center">
      <p style={{ color: "#666" }}>Article not found.</p>
      <button onClick={onBack} className="mt-4 text-purple-400 text-sm">← Back</button>
    </div>
  );

  return (
    <div className="px-5 py-6" data-testid="article-view">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "#666" }}>
        <button onClick={onBack} className="hover:text-white transition-colors">{article.breadcrumb[0]}</button>
        <ChevronRight size={14} />
        <span style={{ color: "#aaa" }}>{article.breadcrumb[1]}</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
      {article.description && (
        <p className="text-base mb-8 leading-relaxed" style={{ color: "#888" }}>{article.description}</p>
      )}

      {article.sections.map((section, si) => (
        <div key={si} className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{section.heading}</h2>
          {section.intro && (
            <p className="text-base mb-4 leading-relaxed" style={{ color: "#ccc" }}>{section.intro}</p>
          )}
          {section.steps && (
            <ul className="mb-5 space-y-2 pl-1">
              {section.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-base" style={{ color: "#ccc" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <span>
                    {step.text}
                    {step.link && (
                      <a href={step.link.href} className="underline inline-flex items-center gap-0.5" style={{ color: "#a78bfa", textDecorationColor: "#a78bfa" }}>
                        {step.link.label}
                        <ExternalLink size={11} className="ml-0.5 flex-shrink-0" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {section.mockup && (
            <div className="mb-5">{section.mockup}</div>
          )}
          {section.infoBoxes?.map((box, bi) => (
            <div
              key={bi}
              className="flex items-start gap-3 px-4 py-4 rounded-2xl mb-3"
              style={{ background: "#111d3a", border: "1px solid #1e3a6e" }}
            >
              <Info size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#60a5fa" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#93c5fd" }}>{box.text}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN HELP PAGE ──────────────────────────────────────────── */
export default function Help() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const filtered = search.trim()
    ? [
        ...CATEGORIES.filter(c => c.label.toLowerCase().includes(search.toLowerCase())),
        ...POPULAR.filter(p => p.label.toLowerCase().includes(search.toLowerCase())),
      ]
    : null;

  return (
    <div className="min-h-screen font-['Inter']" style={{ background: "#0b0b0b" }} data-testid="help-page">
      {menuOpen && <HelpMenuOverlay onClose={() => setMenuOpen(false)} />}

      <HelpNav onMenuClick={() => setMenuOpen(true)} />

      {activeArticle ? (
        <ArticleView slug={activeArticle} onBack={() => setActiveArticle(null)} />
      ) : (
        <div className="px-5 pb-16">
          {/* Hero */}
          <div className="pt-6 pb-8">
            <h1 className="text-4xl font-bold text-white mb-5 leading-tight">How can we help you?</h1>
            <div
              className="flex items-center gap-2.5 rounded-full px-4 py-3.5 mb-6"
              style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
            >
              <Search size={16} style={{ color: "#555" }} />
              <input
                data-testid="input-search"
                type="text"
                placeholder="Search documentation..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600"
              />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              Need help? Start by searching for answers to common questions. Whether you're setting up your page, adding social media links, or exploring premium features, we've got you covered.
            </p>
          </div>

          {/* Search results */}
          {filtered && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Search Results</h2>
              {filtered.length === 0 ? (
                <p style={{ color: "#666" }} className="text-sm">No results found.</p>
              ) : (
                <div className="space-y-2">
                  {filtered.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveArticle(item.slug)}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all hover:opacity-90"
                      style={{ background: "#1a1040", border: "1px solid #2d1a5e" }}
                    >
                      <div className="flex-shrink-0 text-purple-400">{item.icon}</div>
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!filtered && (
            <>
              {/* Guides & Tutorials */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Guides &amp; Tutorials <span style={{ color: "#a78bfa" }}>#</span>
                </h2>
                <div className="space-y-2">
                  {CATEGORIES.map((cat, i) => (
                    <button
                      key={i}
                      data-testid={`category-${cat.slug}`}
                      onClick={() => setActiveArticle(cat.slug)}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all hover:opacity-90"
                      style={{ background: "#1a1040", border: "1px solid #2d1a5e" }}
                    >
                      <div className="flex-shrink-0 text-purple-400">{cat.icon}</div>
                      <span className="text-white text-sm font-medium">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Popular Articles</h2>
                <div className="space-y-2">
                  {POPULAR.map((art, i) => (
                    <button
                      key={i}
                      data-testid={`article-${art.slug}`}
                      onClick={() => setActiveArticle(art.slug)}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all hover:opacity-90"
                      style={{ background: "#1a1040", border: "1px solid #2d1a5e" }}
                    >
                      <div className="flex-shrink-0 text-purple-400">{art.icon}</div>
                      <span className="text-white text-sm font-medium">{art.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Changelog */}
              <div className="flex justify-end">
                <button className="flex items-center gap-1 text-sm transition-colors hover:text-white" style={{ color: "#666" }}>
                  Changelog <ChevronRight size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* help.guns.lol pill at bottom */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10">
        <div
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium"
          style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#aaa" }}
        >
          <GunIcon className="w-4 h-2.5 text-purple-500" />
          help.guns.lol
        </div>
      </div>
    </div>
  );
}
