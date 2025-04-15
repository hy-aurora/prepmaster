'use server';
import { dba, auth } from "../../firebase-admin";

import { UserRecord } from "firebase-admin/auth";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;
    try {
        const userRecord = await dba.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }
        await dba.collection('users').doc(uid).set({ name, email });
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
                message: 'User not exist. Create an account instead.'
            }
        }
        await setSessionCookie(idToken);
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: 'An error occurred while signing in.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
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