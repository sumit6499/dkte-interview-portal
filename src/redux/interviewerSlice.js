import { createSlice } from "@reduxjs/toolkit";

export const interviewerSlice = createSlice({
    name:"interviewer",
    initialState:{
        interviewers:[],
    },
    reducers:{
        storeInterviewers:(state,action)=>{
            const {interviewerId,interviewerName} = action.payload;
            state.interviewers.push({id:interiviewerId,name:interviewerName})
        },
        getInterviewersIdByName:(state,action)=>{
            const {interviewerName} = action.payload;
            const interviewer = state.interviewers.find(
                (interviewer)=> interviewer.name===interviewerName
            );
            return interviewer? interviewer.id : null;
        },
    },
});

export const {storeInterviewer,getInterviewerIdByName} = interviewerSlice.actions;

export default interviewerSlice.reducer;