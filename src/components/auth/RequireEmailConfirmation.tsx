import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface RequireEmailConfirmationProps {
  children: React.ReactNode;
}

const RequireEmailConfirmation = ({ children }: RequireEmailConfirmationProps) => {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (!session?.user?.email_confirmed_at) {
        navigate("/confirm-email");
      }
    }
  }, [user, session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user || !session?.user?.email_confirmed_at) {
    return null;
  }

  return <>{children}</>;
};

export default RequireEmailConfirmation;
