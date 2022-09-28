import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function UserListItem({userToUpdate, onAdminConfirmClick}) {
    const [ adminClick, setAdminClick ] = useState(false)
    const { user } = useContext(UserContext) 

    function handleAdminClick(e){
        setAdminClick(true)
    }

    function handleAdminConfirmClick(e) {
        onAdminConfirmClick(userToUpdate.id, !userToUpdate.is_admin)
        setAdminClick(false)
    }
    
  return (
    <div>
        <div key={userToUpdate.id} className="user-list">
            <p className="user-list-item">{userToUpdate.last_name}, {userToUpdate.first_name}</p>
            <p className="user-list-item">{userToUpdate.username}</p>
            <p className="user-list-item">{userToUpdate.is_admin ? "Yes" : "No"}</p>
            <div className="user-list-item-end">
            {!adminClick ?
                <button onClick={user.id !== userToUpdate.id ? handleAdminClick : null} className={user.id !== userToUpdate.id ? "user-list-item-button" : "disable"}>{userToUpdate.is_admin ? "remove admin" : "make admin"}</button>
                :
                <div>
                    <button onClick={handleAdminConfirmClick}>Confirm</button>
                    <button onClick={()=> setAdminClick(false)}>Cancel</button>
                </div>
                }
            </div>
        </div>
    </div>
  );
}

export default UserListItem;
