import React, { useEffect, createContext, useState } from "react";
import { auth, createUserProfileDocument } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set up the authentication state observer and get user data
        const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                // Subscribe to user document changes
                const unsubscribeFromSnapshot = onSnapshot(userRef, (snapShot) => {
                    setUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                    setLoading(false);
                });

                // Return a cleanup function that unsubscribes from the snapshot
                return unsubscribeFromSnapshot;
            } else {
                setUser(userAuth); // this will be null when not logged in
                setLoading(false);
            }
        });

        // Return a cleanup function that unsubscrires from auth state changes
        return unsubscribeFromAuth;
    }, []);

    const userContext = { user, loading };
    if (loading) {
        return <div>Loading...</div>;
    }
    return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
