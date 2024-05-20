import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admins:[],
    },
    reducers:{
        storeAdmin:(state,action)=>{
            const {adminId,adminName} = action.payload;
            state.admins.push({id:adminId,name:adminName});
        },
        getAdminIdByName:(state,action)=>{
            const {adminName} = action.payload;
            const admin = state.admins.find((admin)=>
                admin.name === adminName);
                return admin?admin.id:null;
            },
    },
});

export const {storeAdmin,getAdminIdByName} = adminSlice.actions;

