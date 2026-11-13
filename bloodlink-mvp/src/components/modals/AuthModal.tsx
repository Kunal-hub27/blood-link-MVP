import { useState, type FormEvent } from "react";
import { X, ArrowRight, AlertCircle } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
  notify: (text: string, kind?: "success" | "error" | "info") => void;
}

export function AuthModal({ onClose, onSuccess, notify }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!isSupabaseConfigured || !supabase) {
      // Offline / Demo fallback
      if (!email.includes("@")) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
      notify("Demo mode: Signed in locally as " + email, "success");
      onSuccess(email);
      onClose();
      return;
    }

    if (!email || password.length < 10) {
      setErrorMsg("Please enter a valid email and a password with at least 10 characters.");
      return;
    }

    setLoading(true);
    try {
      const result =
        authMode === "signup"
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) {
        setErrorMsg(result.error.message);
        notify(result.error.message, "error");
      } else {
        if (authMode === "signup" && !result.data.session) {
          notify("Check your email to confirm your account, then sign in.", "success");
        } else {
          const userEmail = result.data.user?.email || email;
          notify(authMode === "signup" ? "Account created and signed in." : "Welcome back.", "success");
          onSuccess(userEmail);
        }
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="modal-head">
          <div>
            <div className="eyebrow red">SECURE ACCESS</div>
            <h2 id="auth-title">{authMode === "signup" ? "Create BloodLink Account" : "Welcome Back"}</h2>
            <p>
              {isSupabaseConfigured
                ? "Secure authentication powered by Supabase Auth with Row Level Security."
                : "Demo Mode Active: Enter any email to explore signed-in workflows."}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="modal-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              minLength={10}
              placeholder="At least 10 characters"
              autoComplete={authMode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="form-hint">
            Passwords must contain at least 10 characters for security.
          </p>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-large"
            disabled={loading}
          >
            <span>{loading ? "Processing..." : authMode === "signup" ? "Create Account" : "Sign In"}</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="text-link auth-switch"
            onClick={() => {
              setAuthMode(authMode === "signup" ? "login" : "signup");
              setErrorMsg(null);
            }}
          >
            {authMode === "signup"
              ? "Already registered? Sign in"
              : "New to BloodLink? Create an account"}
          </button>
        </form>
      </div>
    </div>
  );
}
