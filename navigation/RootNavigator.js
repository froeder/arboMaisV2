import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import { AuthStack } from "./AuthStack";
import AppStack from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { auth } from "../config";
import navigationTheme from "./navigationTheme";

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
