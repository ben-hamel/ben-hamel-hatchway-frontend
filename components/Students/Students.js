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

  /**
   *  pass the tag to the parent component
   */
  const addTag = (e) => {
    if (e.key === "Enter") {
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

            {showGrades ? (
              <div className={styles.gradesList}>
                <ShowGrades data={student.grades} />
              </div>
            ) : null}

            {student.tags.length > 0 ? (
              <div className={styles.tagsContainer}>
                {student.tags.map((tag, index) => (
                  <div className={styles.tag} key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            ) : null}

            <div className={styles.tagInput}>
              <input
                // className={styles.tagInput}
                onKeyDown={addTag}
                placeholder="Search by tag"
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Students;
