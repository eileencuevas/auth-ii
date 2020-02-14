import React from 'react';

const UsersList = props => {
    if (props.users.length > 0) {
        return(
            <div>
                {props.users.map(user => (
                    <div>
                        <h3>{user.username}</h3>
                        <p>Department: {user.department}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        return(
            <h3>No Users Found! Did you log in...?</h3>
        );
    }
}

export default UsersList;