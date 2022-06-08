import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Students.module.css";

function Students({ student, handleTagAdded }) {
  const [showGrades, setShowGrades] = useState(false);
  const [tag, setTag] = useState([]);

  // console.log(student);
  /**
   * calculate the average grade of the student
   */
  const calcAverages = (grades) => {
    let total = 0;
    grades.forEach((grade) => {
      total += Number(grade);
    });
    return total / grades.length;
  };

  /**
   * component to show list of student test grades
   */
  const ShowGrades = (grades) => {
    return (
      <>
        {grades.data.map((grade, index) => (
          <li key={index}>
            Test {index + 1}: {grade}%
          </li>
        ))}
      </>
    );
  };

  const addTag = (e) => {
    // console.log("add tag launched", e.target.value);
    // console.log("e", e);
    if (e.key === "Enter") {
      // setTag([...tag, e.target.value]);
      // console.log("id", student.id);
      // console.log("tag target", e.target.value);
      handleTagAdded(e.target.value, student.id);
      e.target.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.studentCard}>
        <div className={styles.studentImage}>
          <Image
            src={student.pic}
            alt="profile pic"
            width={110}
            height={110}
            layout="fixed"
          />
        </div>

        <div className={styles.studentInfo}>
          <div className={styles.studentName}>
            <h1>
              {student.firstName.toUpperCase()}
              <span> {student.lastName.toUpperCase()}</span>
            </h1>

            {showGrades ? (
              <button
                className={styles.minusButton}
                onClick={() => setShowGrades(false)}
              >
                &#45;
              </button>
            ) : (
              <button
                className={styles.plusButton}
                onClick={() => setShowGrades(true)}
              >
                &#43;
              </button>
            )}
          </div>
          <ul className={styles.studentData}>
            <li>Email: {student.email}</li>
            <li>Company: {student.company}</li>
            <li>Skill: {student.skill}</li>
            <li>Average: {calcAverages(student.grades)}%</li>
            <div className={styles.gradesList}>
              {showGrades ? (
                <ShowGrades
                  data={student.grades}
                  className={styles.gradeList}
                />
              ) : null}
            </div>

            {student.tags.map((tag, index) => (
              <div key={index}>{tag}</div>
            ))}
            <input onKeyDown={addTag} />
            <button onClick={() => console.log(student.tags)}>Check Tag</button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Students;
