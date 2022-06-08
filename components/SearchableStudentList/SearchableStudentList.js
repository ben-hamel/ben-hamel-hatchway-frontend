import React from "react";
import styles from "./SearchableStudentList.module.css";
import { useState, useEffect } from "react";
import Students from "../Students/Students";

function SearchableStudentList() {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // retrieve data from the server
      const response = await fetch(
        "https://api.hatchways.io/assessment/students"
      );
      // convert the response to json
      const data = await response.json();

      // if no tags property is found, add an empty array
      data.students.forEach((student) => {
        if (!student.tags) {
          student.tags = [];
        }
      });

      // set the data to the state
      setStudent(data.students);
    };

    // call the function to retrieve data
    getData();
  }, []);

  const handleTagAdded = (tag, index) => {
    /**
     * Immutable update pattern
     */
    setStudent((prevStudents) => {
      const changedStudent = { ...prevStudents[index - 1] };

      // Check if student has 'tags` and add it if it doesn't.
      if (!("tags" in changedStudent)) {
        changedStudent.tags = [];
      }

      // Add new tag to array
      if (
        tag === "" ||
        tag === undefined ||
        tag === null ||
        tag === " " ||
        changedStudent.tags.includes(tag)
      ) {
        return prevStudents;
      }

      // Add new tag to array
      changedStudent.tags = [...changedStudent.tags, tag];

      // Copy array so we can change it
      const mutatableStudents = [...prevStudents];
      mutatableStudents[index - 1] = changedStudent;

      // The state will be set to this array with the student
      // at the index we were given changed
      return mutatableStudents;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          placeholder="Search by name"
          onChange={(event) => setQuery(event.target.value)}
        />
        <input
          placeholder="Search by tag"
          onChange={(event) => setTagFilter(event.target.value)}
        />
      </div>

      {student
        .filter((student, index) => {
          if (query === "" && tagFilter == "") {
            // If there is no query and no tag filter, show all students
            return student;
          } else {
            // Filter by name
            const containsStudentName =
              `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase());
            // Filter by tag
            const containsStudentTag = student.tags.some((tag) =>
              tag.toLowerCase().includes(tagFilter.toLowerCase())
            );

            if (query && tagFilter) {
              // If the student contains the query and the tag filter, show them
              return containsStudentName && containsStudentTag;
            } else if (
              (query && containsStudentName) ||
              (tagFilter && containsStudentTag)
            ) {
              // If the student contains the query or the tag filter, show them
              return true;
            }
          }
        })
        .map((student, index) => {
          return (
            <Students
              key={index}
              student={student}
              handleTagAdded={handleTagAdded}
            />
          );
        })}
    </div>
  );
}

export default SearchableStudentList;
