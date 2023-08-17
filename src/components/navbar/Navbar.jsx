"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        APP Demo
      </Link>
      <Link href="/dashboard/register" className={styles.logo}>
        Registration
      </Link>

      {session.status === "authenticated" ? (
        <>
          <Link href="/dashboard" className={styles.logo}>
            Dashboard
          </Link>
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/dashboard/login" className={styles.logo}>
            Sign In
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
