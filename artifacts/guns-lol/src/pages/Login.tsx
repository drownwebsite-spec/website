import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useLocation } from "wouter";

function GunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M110 20H95V15C95 13.3 93.7 12 92 12H28C26.3 12 25 13.3 25 15V20H10C8.3 20 7 21.3 7 23V33C7 34.7 8.3 36 10 36H25V40C25 42.2 26.8 44 29 44H36V52C36 53.1 36.9 54 38 54H50C51.1 54 52 53.1 52 52V44H92C94.2 44 96 42.2 96 40V36H110C111.7 36 113 34.7 113 33V23C113 21.3 111.7 20 110 20Z" />
    </svg>
  );
}

export default function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
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
      navigate("/demo");
    }, 1000);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 font-['Inter']"
      style={{ background: "#0a0a0a" }}
      data-testid="login-page"
    >
      <div className="w-full max-w-[380px]">
        <div className="flex justify-center mb-5">
          <GunIcon className="w-16 h-9 text-purple-500" />
        </div>

        <h1 className="text-white text-xl font-semibold text-center mb-7" data-testid="login-title">
          Sign in to guns.lol
        </h1>

        <form onSubmit={handleSubmit} noValidate data-testid="login-form">
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
          <div className="mb-6">
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
                autoComplete="current-password"
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

          <button
            type="submit"
            data-testid="button-sign-in-submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3.5 rounded-full transition-all duration-200 mb-4 text-[15px] flex items-center justify-center gap-2"
            style={{ background: loading ? "#2a2a2a" : "#1f1f1f" }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : "Sign In"}
          </button>

          <p className="text-center text-sm" style={{ color: "#666" }}>
            Don't have an account?{" "}
            <button
              type="button"
              data-testid="link-sign-up"
              onClick={() => navigate("/signup")}
              className="font-medium transition-colors"
              style={{ color: "#a78bfa" }}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
