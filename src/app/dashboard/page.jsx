"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import styles from "./page.module.css";
import Image from "next/image";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session.data?.user.name);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `api/menus?username=${session?.data?.user.name}`,
    fetcher
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const price = e.target[1].value;
    const img = e.target[2].value;
    const desc = e.target[3].value;
    console.log(title, price, img, desc);
    try {
      await fetch("api/menus", {
        method: "POST",
        body: JSON.stringify({
          title,
          price,
          img,
          desc,
          username: session.data.user.name,
        }),
      });
      //post ขึ้นทันทีหลังจากกดsubmit ไม่ต้องrefresh page
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/menus/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  //protecting route
  if (session.status === "loading") {
    return <p>Loading....</p>;
  }
  if (session.status === "unauthenticated") {
    setTimeout(() => {
      return router?.push("/dashboard/login");
    }, 100);
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading..."
            : data.map((item) => (
                <div className={styles.post} key={item._id}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={item.img}
                      alt=""
                      width={200}
                      height={100}
                      priority={false}
                    />
                  </div>
                  <h2 className={styles.postTitle}>{item.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(item._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Menu</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Price" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Description"
            className={styles.textArea}
            cols={30}
            rows={10}
          ></textarea>
          <button className={styles.button}>Save</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
