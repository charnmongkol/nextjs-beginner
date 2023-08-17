import React from "react";
import styles from "./reservation.module.css";
import Button from "@/components/button/Button";
import Image from "next/image";

const Reservation = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>RESERVATION</h1>
      <div className={styles.content}>
        <Image
          src="/bg.jpg"
          alt="reservation"
          fill={true}
          className={styles.bgImage}
        />
        <form className={styles.form}>
          <input type="text" placeholder="ชื่อ" className={styles.input} />
          <input
            type="text"
            placeholder="เบอร์ติดต่อ"
            className={styles.input}
          />
          <input
            type="number"
            placeholder="จำนวนที่นั่ง"
            className={styles.input}
          />
          <Button url="#" text="ตกลง" className={styles.button} />
        </form>
      </div>
    </div>
  );
};

export default Reservation;
