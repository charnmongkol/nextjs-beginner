import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

async function getData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}
export async function generateMetadata({ params }) {
  const data = await getData(params.id);
  return {
    title: data.title,
    description: data.desc,
  };
}

const blogPost = async ({ params }) => {
  const data = await getData(params.id);
  return <div className={styles.mainContainer}>{data.title}</div>;
};

export default blogPost;
