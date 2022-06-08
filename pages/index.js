// import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import Students from "../components/Students/Students";
import SearchableStudentList from "../components/SearchableStudentList";
// import { useState, useEffect } from "react";

export default function Home() {
  console.log("App Rendered");
  return (
    <div className={styles.container}>
      <SearchableStudentList />
      {/* <Students /> */}
    </div>
  );
}
