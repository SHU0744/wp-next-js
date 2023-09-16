import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="text-2xl">home</div>
      <p className="">{count}</p>
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
        }}
      >
        カウントアップ
      </button>
    </>
  );
};

export default Home;
