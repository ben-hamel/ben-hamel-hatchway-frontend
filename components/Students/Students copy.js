import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Students.module.css";

function Students() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://api.hatchways.io/assessment/students"
      );
      const data = await response.json();
      setStudent(data.students);
    };
    getData();
  }, []);

  const calcAverages = (grades) => {
    let total = 0;
    grades.forEach((grade) => {
      total += Number(grade);
    });
    return total / grades.length;
  };

  return (
    <div className={styles.container}>
      {student.map((item, index) => (
        <div key={index} className={styles.studentCard}>
          <div className={styles.studentImage}>
            <Image
              src={item.pic}
              alt="profile pic"
              width={110}
              height={110}
              layout="fixed"
            />
          </div>

          <div className={styles.studentInfo}>
            <div className={styles.studentName}>
              <h1>
                {item.firstName.toUpperCase()}
                <span> {item.lastName.toUpperCase()}</span>
              </h1>
            </div>
            <div className={styles.studentData}>
              <p>Email: {item.email}</p>
              <p>Company: {item.company}</p>
              <p>Skill: {item.skill}</p>
              <p>Average: {calcAverages(item.grades)}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Students;
