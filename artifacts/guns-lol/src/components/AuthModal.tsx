import { useState } from "react";
import { X, Eye, EyeOff, Check } from "lucide-react";

function GunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 9h-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1v1a2 2 0 0 0 2 2h1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2h8a2 2 0 0 0 2-2v-1h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/>
    </svg>
  );
}

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: "login" | "signup";
  prefillUsername?: string;
}

export function AuthModal({ open, onClose, initialTab = "signup", prefillUsername = "" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    username: prefillUsername,
    email: "",
    password: "",
    confirm: "",
  });

  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  function validateLogin() {
    const errs: Record<string, string> = {};
    if (!loginForm.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) errs.email = "Enter a valid email";
    if (!loginForm.password) errs.password = "Password is required";
    return errs;
  }

  function validateSignup() {
    const errs: Record<string, string> = {};
    if (!signupForm.username) errs.username = "Username is required";
    else if (signupForm.username.length < 3) errs.username = "Username must be at least 3 characters";
    else if (!/^[a-zA-Z0-9_-]+$/.test(signupForm.username)) errs.username = "Only letters, numbers, _ and - allowed";
    if (!signupForm.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupForm.email)) errs.email = "Enter a valid email";
    if (!signupForm.password) errs.password = "Password is required";
    else if (signupForm.password.length < 8) errs.password = "Password must be at least 8 characters";
    if (signupForm.password !== signupForm.confirm) errs.confirm = "Passwords do not match";
    return errs;
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLogin();
    setLoginErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateSignup();
    setSignupErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  function handleClose() {
    setSuccess(false);
    setLoading(false);
    setLoginErrors({});
    setSignupErrors({});
    onClose();
  }

  const inputClass = (error?: string) =>
    `w-full bg-[#111113] border ${error ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 outline-none focus:border-purple-500/60 transition-colors`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      data-testid="auth-modal-backdrop"
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm bg-[#16161a] rounded-3xl border border-white/8 shadow-2xl animate-fade-in-up"
        data-testid="auth-modal"
        style={{ animationDuration: "0.25s" }}
      >
        {/* Close button */}
        <button
          data-testid="button-modal-close"
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          onClick={handleClose}
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center pt-8 pb-2">
          <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <GunIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-lg">guns.lol</span>
        </div>

        {success ? (
          <div className="px-6 pb-8 pt-6 text-center" data-testid="auth-success">
            <div className="w-14 h-14 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              {tab === "signup" ? "Account Created!" : "Welcome back!"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {tab === "signup"
                ? `Your profile guns.lol/${signupForm.username} is ready.`
                : "You've been successfully logged in."}
            </p>
            <button
              data-testid="button-success-close"
              onClick={handleClose}
              className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-200"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex mx-6 mt-4 bg-[#111113] rounded-xl p-1 gap-1">
              <button
                data-testid="tab-signup"
                onClick={() => { setTab("signup"); setSignupErrors({}); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === "signup" ? "bg-purple-700 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Sign Up
              </button>
              <button
                data-testid="tab-login"
                onClick={() => { setTab("login"); setLoginErrors({}); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === "login" ? "bg-purple-700 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Log In
              </button>
            </div>

            <div className="px-6 py-5">
              {tab === "signup" ? (
                <form onSubmit={handleSignupSubmit} data-testid="form-signup" className="space-y-3">
                  <div>
                    <div className="flex items-center bg-[#111113] border border-white/10 rounded-xl overflow-hidden focus-within:border-purple-500/60 transition-colors">
                      <span className="pl-4 text-gray-500 text-sm whitespace-nowrap">guns.lol/</span>
                      <input
                        data-testid="input-signup-username"
                        type="text"
                        placeholder="username"
                        value={signupForm.username}
                        onChange={e => setSignupForm(f => ({ ...f, username: e.target.value }))}
                        className="flex-1 bg-transparent px-2 py-3 text-white text-sm placeholder:text-gray-600 outline-none"
                      />
                    </div>
                    {signupErrors.username && (
                      <p data-testid="error-signup-username" className="text-red-400 text-xs mt-1 pl-1">{signupErrors.username}</p>
                    )}
                  </div>

                  <div>
                    <input
                      data-testid="input-signup-email"
                      type="email"
                      placeholder="Email address"
                      value={signupForm.email}
                      onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass(signupErrors.email)}
                    />
                    {signupErrors.email && (
                      <p data-testid="error-signup-email" className="text-red-400 text-xs mt-1 pl-1">{signupErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        data-testid="input-signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signupForm.password}
                        onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
                        className={inputClass(signupErrors.password) + " pr-10"}
                      />
                      <button
                        type="button"
                        data-testid="button-toggle-password"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {signupErrors.password && (
                      <p data-testid="error-signup-password" className="text-red-400 text-xs mt-1 pl-1">{signupErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        data-testid="input-signup-confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        value={signupForm.confirm}
                        onChange={e => setSignupForm(f => ({ ...f, confirm: e.target.value }))}
                        className={inputClass(signupErrors.confirm) + " pr-10"}
                      />
                      <button
                        type="button"
                        data-testid="button-toggle-confirm"
                        onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {signupErrors.confirm && (
                      <p data-testid="error-signup-confirm" className="text-red-400 text-xs mt-1 pl-1">{signupErrors.confirm}</p>
                    )}
                  </div>

                  <button
                    data-testid="button-signup-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-700 hover:bg-purple-600 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-all duration-200 mt-2 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : null}
                    {loading ? "Creating account..." : "Create Account"}
                  </button>

                  <p className="text-center text-gray-600 text-xs pt-1">
                    Already have an account?{" "}
                    <button type="button" data-testid="link-switch-to-login" onClick={() => setTab("login")} className="text-purple-400 hover:text-purple-300 transition-colors">
                      Log in
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit} data-testid="form-login" className="space-y-3">
                  <div>
                    <input
                      data-testid="input-login-email"
                      type="email"
                      placeholder="Email address"
                      value={loginForm.email}
                      onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass(loginErrors.email)}
                    />
                    {loginErrors.email && (
                      <p data-testid="error-login-email" className="text-red-400 text-xs mt-1 pl-1">{loginErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        data-testid="input-login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                        className={inputClass(loginErrors.password) + " pr-10"}
                      />
                      <button
                        type="button"
                        data-testid="button-toggle-login-password"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p data-testid="error-login-password" className="text-red-400 text-xs mt-1 pl-1">{loginErrors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <a href="#" data-testid="link-forgot-password" className="text-purple-400 hover:text-purple-300 text-xs transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    data-testid="button-login-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-700 hover:bg-purple-600 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : null}
                    {loading ? "Logging in..." : "Log In"}
                  </button>

                  <p className="text-center text-gray-600 text-xs pt-1">
                    Don't have an account?{" "}
                    <button type="button" data-testid="link-switch-to-signup" onClick={() => setTab("signup")} className="text-purple-400 hover:text-purple-300 transition-colors">
                      Sign up
                    </button>
                  </p>
                </form>
              )}

              <p className="text-center text-gray-700 text-xs mt-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
