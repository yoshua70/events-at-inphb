import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const handleAuthChange = async (
  event: AuthChangeEvent,
  session: Session | null
) => {
  await fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
};
