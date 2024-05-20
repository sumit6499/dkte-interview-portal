import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '@/redux/authSlice';

const AllUsers = () => {
    const users = useSelector(selectAllUsers);

    // Check if the users array is not null and has a length greater than 0
    const hasUsers = users && users.length > 0;

    if (!hasUsers) {
        console.log("no users");
    } else {
        console.log("There is something");
    }

    return (
        <div>
            <h1>All Registered Users</h1>
            <ul>
                {hasUsers ? users.map((userObj, index) => (
                    <li key={index}>
                        <p>User ID: {userObj.Uid}</p>
                        <p>Role: {userObj.Role}</p>
                        <p>Token: {userObj.token}</p>
                        <p>Name: {userObj.Name}</p>
                        <p>StartTime: {userObj.StartTime}</p>
                        <p>EndTime: {userObj.EndTime}</p>
                        <p>can i get name: {userObj.name}</p>
                        <p>User Info: {JSON.stringify(userObj.user, null, 2)}</p>
                    </li>
                )) : <p>No users found.</p>}
            </ul>
        </div>
    );
};

export default AllUsers;
