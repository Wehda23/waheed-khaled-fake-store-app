/**
 * IsLoggedInWrapper is a component for Logged In users UI component Only.
*/
import { ReactNode } from "react";

type IsLoggedWrapperProps = {
  children: ReactNode;
};

const IsLoggedWrapper = ({ children }: IsLoggedWrapperProps) => {
    // Check if user is logged in
    const isLoggedIn = true; // Replacing it with useContext Later.

    // Incase user is not logged in don't return logged in UI elements
    if (!isLoggedIn) return <></>;

    // when user is logged in it will return UI Elements
    return <>{children}</>;
};

export default IsLoggedWrapper;