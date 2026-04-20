import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useLocation } from "wouter";
import { SiGuns } from "react-icons/si";

function GunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M110 20H95V15C95 13.3 93.7 12 92 12H28C26.3 12 25 13.3 25 15V20H10C8.3 20 7 21.3 7 23V33C7 34.7 8.3 36 10 36H25V40C25 42.2 26.8 44 29 44H36V52C36 53.1 36.9 54 38 54H50C51.1 54 52 53.1 52 52V44H92C94.2 44 96 42.2 96 40V36H110C111.7 36 113 34.7 113 33V23C113 21.3 111.7 20 110 20Z" />
    </svg>
  );
}

export default function SignUp() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreedTos, setAgreedTos] = useState(false);
  const [agreedOffers, setAgreedOffers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (!username.trim()) e.username = "Username is required";
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) e.username = "3-20 chars, letters/numbers/_";
    if (!agreedTos) e.tos = "You must agree to the Terms of Service";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/${username}`);
    }, 1200);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 font-['Inter']"
      style={{ background: "#0a0a0a" }}
      data-testid="signup-page"
    >
      <div className="w-full max-w-[380px]">
        {/* Gun icon */}
        <div className="flex justify-center mb-5">
          <GunIcon className="w-16 h-9 text-purple-500" />
        </div>

        {/* Title */}
        <h1 className="text-white text-xl font-semibold text-center mb-7" data-testid="signup-title">
          Create a guns.lol account
        </h1>

        <form onSubmit={handleSubmit} noValidate data-testid="signup-form">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-1.5" htmlFor="email">Email</label>
            <div
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 w-full"
              style={{ background: "#1a1a1a", border: errors.email ? "1px solid #ef4444" : "1px solid transparent" }}
            >
              <Mail size={16} className="text-gray-500 flex-shrink-0" />
              <input
                id="email"
                data-testid="input-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-1.5" htmlFor="password">Password</label>
            <div
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 w-full"
              style={{ background: "#1a1a1a", border: errors.password ? "1px solid #ef4444" : "1px solid transparent" }}
            >
              <Lock size={16} className="text-gray-500 flex-shrink-0" />
              <input
                id="password"
                data-testid="input-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-gray-600"
                autoComplete="new-password"
              />
              <button
                type="button"
                data-testid="button-toggle-password"
                onClick={() => setShowPassword(v => !v)}
                className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1 pl-1">{errors.password}</p>}
          </div>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-white text-sm mb-1.5" htmlFor="username">Username</label>
            <div
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 w-full"
              style={{ background: "#1a1a1a", border: errors.username ? "1px solid #ef4444" : "1px solid transparent" }}
            >
              <User size={16} className="text-gray-500 flex-shrink-0" />
              <span className="text-gray-500 text-sm whitespace-nowrap">guns.lol/</span>
              <input
                id="username"
                data-testid="input-username"
                type="text"
                placeholder=""
                value={username}
                onChange={e => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")); setErrors(p => ({ ...p, username: "" })); }}
                className="bg-transparent text-white text-sm outline-none flex-1"
                autoComplete="username"
              />
            </div>
            {errors.username && <p className="text-red-400 text-xs mt-1 pl-1">{errors.username}</p>}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-3 cursor-pointer group" data-testid="checkbox-tos-wrapper">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  data-testid="checkbox-tos"
                  checked={agreedTos}
                  onChange={e => { setAgreedTos(e.target.checked); setErrors(p => ({ ...p, tos: "" })); }}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                  style={{
                    background: agreedTos ? "#7c3aed" : "transparent",
                    border: errors.tos ? "1.5px solid #ef4444" : agreedTos ? "1.5px solid #7c3aed" : "1.5px solid #444"
                  }}
                  onClick={() => { setAgreedTos(v => !v); setErrors(p => ({ ...p, tos: "" })); }}
                >
                  {agreedTos && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-gray-400 text-sm leading-snug">
                I agree to{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">ToS</a>
                {" "}&amp;{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
              </span>
            </label>
            {errors.tos && <p className="text-red-400 text-xs -mt-1 pl-8">{errors.tos}</p>}

            <label className="flex items-start gap-3 cursor-pointer group" data-testid="checkbox-offers-wrapper">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  data-testid="checkbox-offers"
                  checked={agreedOffers}
                  onChange={e => setAgreedOffers(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                  style={{
                    background: agreedOffers ? "#7c3aed" : "transparent",
                    border: agreedOffers ? "1.5px solid #7c3aed" : "1.5px solid #444"
                  }}
                  onClick={() => setAgreedOffers(v => !v)}
                >
                  {agreedOffers && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-gray-400 text-sm leading-snug">
                I agree to receive offers, news and updates from guns.lol.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            data-testid="button-sign-up-submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3.5 rounded-full transition-all duration-200 mb-4 text-[15px] flex items-center justify-center gap-2"
            style={{ background: loading ? "#2a2a2a" : "#1f1f1f" }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </>
            ) : "Sign Up"}
          </button>

          {/* Sign in link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              data-testid="link-sign-in"
              onClick={() => navigate("/login")}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
