import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("data", data);
    if (data?.user?.confirmation_sent_at) {
      const res = await supabase
        .from("form27_users") // <- your table name
        .insert([
          {
            email: email,
            password: password,
            email_confirmed_at: data.user.confirmation_sent_at,
          },
        ])
        .select();

      setLoading(false);
      if (error) setMessage(error.message);
      else
        setMessage(
          "Signup successful! Please check your email to verify your account."
        );
    }
    if (error) setMessage(error.message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage("Login successful!");
    // Navigate to dashboard or handle post-login logic here
    // navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setMessage(error.message);
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Form27 — Login / Signup</h2>

      <form onSubmit={handleLogin} style={{ marginBottom: 20 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={loading}>
            Login
          </button>
          <button type="button" onClick={handleSignUp} disabled={loading}>
            Signup
          </button>
        </div>
      </form>

      <div style={{ marginBottom: 12 }}>
        <button onClick={handleGoogleLogin}>Continue with Google</button>
      </div>

      {message && (
        <p
          style={{
            color: message.includes("successful") ? "green" : "crimson",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
