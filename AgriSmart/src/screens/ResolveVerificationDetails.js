import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveVerificationDetailsScreen = () => {
  const { checkVerificationDetails } = useContext(AuthContext);

  useEffect(() => {
    checkVerificationDetails();
  }, []);
  return null;
};

export default ResolveVerificationDetailsScreen;
