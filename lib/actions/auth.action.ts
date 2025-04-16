import { db, auth } from "@/firebase/admin";
import { UserRecord } from "firebase-admin/auth";
import { cookies } from "next/headers";

// Define User type
type User = {
    uid: string;
    name?: string;
    email?: string;
    // ...other fields...
};

// Add type definitions for authentication parameters
type SignUpParams = {
    uid: string;
    name: string;
    email: string;
};

type SignInParams = {
    email: string;
    idToken: string;
};

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }
        await db.collection('users').doc(uid).set({ name, email });
        return {
            success: true,
            message: 'User created successfully.'
        };
    } catch (e: any) {
        console.error('Error creating a user', e);
        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email is already in use.'
            }
        }
        return {
            success: false,
            message: 'An error occurred while creating the user.'
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Create an account instead.'
            }
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: 'User signed in successfully.'
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'An error occurred while signing in.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    // Dynamically import cookies; this ensures it's only used server-side.
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK,
    });
    cookieStore.set("session", sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: '/',
        maxAge: ONE_WEEK,
    });
}

export async function getCurrentUser(): Promise<User | null> {
    // Get cookies from server
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        // Properly get the user document from Firestore
        const userDoc = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userDoc.exists) {
            return null;
        }
        return {
            ...userDoc.data(),
            uid: userDoc.id,
        } as User;
    } catch (e) {
        console.error('Error verifying session cookie', e);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}
