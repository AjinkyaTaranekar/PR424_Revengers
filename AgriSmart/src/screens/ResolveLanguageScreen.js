import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveLanguageScreen = () => {
  const { checkLanguageSelection } = useContext(AuthContext);

  useEffect(() => {
    checkLanguageSelection();
  }, []);
  return null;
};

export default ResolveLanguageScreen;
