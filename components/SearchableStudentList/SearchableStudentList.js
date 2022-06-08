import React from "react";
import styles from "./SearchableStudentList.module.css";
import { useState, useEffect } from "react";
import Students from "../Students/Students";

function SearchableStudentList() {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [student, setStudent] = useState([]);

  const [curatedStudents, setCuratedStudents] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://api.hatchways.io/assessment/students"
      );
      const data = await response.json();
      // console.log("data", data);

      data.students.forEach((student) => {
        if (!student.tags) {
          student.tags = [];
        }
      });

      // data.students[0].tags = ["tag", "tag2"];
      setStudent(data.students);
    };
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

      changedStudent.tags = [...changedStudent.tags, tag];

      // Copy array so we can change it
      const mutatableStudents = [...prevStudents];
      mutatableStudents[index - 1] = changedStudent;

      // The state will be set to this array with the student
      // at the index we were given changed
      return mutatableStudents;
    });
  };

  // const studentsFilteredByName = student.filter((student) => {
  //   return (
  //     student.firstName.toLowerCase().includes(query.toLowerCase()) ||
  //     student.lastName.toLowerCase().includes(query.toLowerCase())
  //   );
  // });

  // const studentsFilteredByTag = student.filter((student) => {
  //   //loop over student tags and check if it includes the tagFilter
  //   // return student.tags.includes(tagFilter);
  //   return student.tags.some((tag) => tag.toLowerCase().includes(tagFilter));
  // });

  function filterItems(arr, test) {
    return arr.filter(function (el) {
      return el.toLowerCase().indexOf(test.toLowerCase()) !== -1;
    });
  }

  const handleFilter = (e) => {
    const filteredStudents = student.filter((student) => {
      const containsStudentName = `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const containsStudentTag = student.tags.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      );
      // return containsStudentName || containsStudentTag;

      if (query && tagFilter) {
        // if name and note filters are used, return the result of the above boolean values
        return containsStudentName && containsStudentTag;
      } else if (
        (query && containsStudentName) ||
        (tagFilter && containsStudentTag)
      ) {
        // else if name and containsStudentName are a match or if note and containsStudentNote are a match, keep record
        return true;
      } else {
        // else, discard record
        return student;
      }
    });

    setCuratedStudents(filteredStudents);
  };

  const filteredData = student.filter(
    (dataObj) =>
      dataObj.firstName.indexOf(query) !== -1 &&
      dataObj.lastName.indexOf(query) !== -1 &&
      dataObj.tags.indexOf(tagFilter) !== -1
  );

  return (
    <div className={styles.container}>
      <button onClick={() => console.log("student", studentsFilteredByName)}>
        student
      </button>
      <button onClick={() => console.log(tagFilter)}>tagFilter</button>
      <button
        onClick={() => console.log("studentsFilteredByTag", handleFilter)}
      >
        studentsFilteredByTag
      </button>
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
            return student;
          } else {
            const containsStudentName =
              `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase());
            const containsStudentTag = student.tags.some((tag) =>
              tag.toLowerCase().includes(tagFilter.toLowerCase())
            );
            // return containsStudentName || containsStudentTag;

            if (query && tagFilter) {
              // if name and note filters are used, return the result of the above boolean values
              return containsStudentName && containsStudentTag;
            } else if (
              (query && containsStudentName) ||
              (tagFilter && containsStudentTag)
            ) {
              // else if name and containsStudentName are a match or if note and containsStudentNote are a match, keep record
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
