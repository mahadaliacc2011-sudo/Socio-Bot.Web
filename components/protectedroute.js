import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirect to login automatically
    }
  }, [status]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return <>{children}</>;
}
