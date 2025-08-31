import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session types to include custom properties.
   */
  interface Session {
    user: {
      id?: string | null;
      role?: "user" | "admin" | null;
    } & DefaultSession["user"];
  }

  /**
   * Extends the built-in user model type.
   */
  interface User {
    role?: "user" | "admin" | null;
  }
}

declare module "next-auth/jwt" {
  /** Extends the built-in JWT type. */
  interface JWT {
    role?: "user" | "admin" | null;
  }
}
