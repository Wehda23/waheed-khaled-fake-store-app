/**
 * Is a component wrapper for guest users UI components only.
*/


type GuestComponentWrapperProps = {
  children: React.ReactNode;
};

const GuestComponentWrapper = ({ children }: GuestComponentWrapperProps) => {
    // Check if user is logged in
    const isLoggedIn = false; // Replacing it with useContext Later.

    // Incase user is logged in don't return guest UI elements
    if (isLoggedIn) return <></>;

    // when user is not logged in it will return guest UI Elements
    return <>{children}</>;
};

export default GuestComponentWrapper;