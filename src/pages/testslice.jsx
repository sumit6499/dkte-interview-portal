// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStudentIdByName } from '../Redux/studentSlice';

// function ExampleComponent() {
//     const dispatch = useDispatch();
//     const studentName = 'John Doe'; // Example student name

//     // Dispatch the getStudentIdByName action to retrieve the student ID
//     dispatch(getStudentIdByName({ studentName }));

//     // Use useSelector to access the student ID from the Redux store
//     const studentId = useSelector((state) => {
//         // Access the student ID from the Redux store state
//         return state.student.students.find((student) => student.name === studentName)?.id;
//     });

//     return (
//         <div>
//             <p>Student ID: {studentId}</p>
//         </div>
//     );
// }

// export default ExampleComponent;
