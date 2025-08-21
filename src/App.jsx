import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("test123");
    navigate("/auth");
    // supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
    //   setSession(sess);
    //   navigate("/auth");
    // });

    // return () => sub.subscription.unsubscribe();
  }, [navigate]);

  return <AuthPage />;
}
