import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name:"student",
    initialState:{
        students:[],
    },
    reducers:{
        storeStudent: (state,action)=>{
            const {studentId,studentName} = action.payload;
            state.students.push({id:studentId,name:studentName})
        },
        getStudentIdByName:(state,action) =>{
            const {studentName} = action.payload;
            const student = state.students.find((student)=>student.name===studentName);
            return student ? student.id:null;
        },
    },
});

export const {storeStudent,getStudentByName} = studentSlice.actions;
export default studentSlice.reducer;
