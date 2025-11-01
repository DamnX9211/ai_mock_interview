"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 7 * 24 * 60 * 60; // in seconds

export async function signUp(params: SignUpParams) {
  const { name, uid, email, password } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password,
      createdAt: new Date(),
    });
    return {
      success: true,
      message: "User created successfully. Please sign in.",
    };
  } catch (e: any) {
    console.error("Error during sign up:", e.message);

    if (e.code === "auth/email-already-in-exists") {
      return {
        success: false,
        message: "The email address is already in use by another account.",
      };
    }
    return {
      success: false,
      message: e.message,
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account first.",
      };
    }
    await setSessionCookie(idToken);
  } catch (e) {
    console.error("Error during sign in:", e);
    return {
      success: false,
      message: "Error during sign in.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
