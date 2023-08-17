import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(`http://localhost:3000/api/menus`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const Menu = async () => {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link href="/menu/1" className={styles.container} key={item._id}>
          <div className={styles.imagesContainer}>
            <Image
              src="/sushi.jpg"
              alt="menu"
              width={200}
              height={125}
              className={styles.img}
            />
          </div>
          <div className={styles.price}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>Menu Description</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
