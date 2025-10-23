import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const useAuthRequired = (requireEmailConfirmation: boolean = true) => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
    } else if (requireEmailConfirmation && !session?.user?.email_confirmed_at) {
      navigate("/confirm-email");
    }
  }, [user, session, navigate, location, requireEmailConfirmation]);

  return {
    user,
    isAuthenticated: !!user,
    isEmailConfirmed: !!session?.user?.email_confirmed_at
  };
};
