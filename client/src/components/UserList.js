import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import { useNavigate } from "react-router-dom";

function UserList() {
    const [ users, setUsers ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/users')
        .then((res) => {
            if (res.ok) {
                res.json().then((users) => setUsers(users))
            }
            else {
                res.json().then((err) => console.log(err))
            }
        })
    }, [])

    const alphaUsers = users.sort((a,b) => {
        if (a.last_name > b.last_name) {
            return 1
        } else if (a.last_name === b.last_name && a.first_name > b.first_name) {
            return 1
        } else if (a.last_name === b.last_name && b.first_name > a.first_name) {
            return -1
        } else if (b.last_name > a.last_name) {
            return -1
        } else {
            return 0
        }
    })

    function onAdminConfirmClick(userId, updatedAdminStatus) {
        fetch(`/change_user_admin_status/${userId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                is_admin: updatedAdminStatus
            })
        })
        .then((res) => {
            if(res.ok) {
                res.json().then((newUserArray) => setUsers(newUserArray))
            } else {
                res.json().then((err) => {
                    console.log(err)
                })
            }
        })
    }

  return (
    <div>
      <h1>Users</h1>
      <div className="user-list-header">
            <h3 className="user-list-item user-list__name">Name</h3>
            <h3 className="user-list-item user-list__username">Username</h3>
            <h3 className="user-list-item user-list__admin">Admin? </h3>
            <div className="user-list-item-end user__list-end"></div>
        </div>
      {alphaUsers.map((userToUpdate) => <UserListItem onAdminConfirmClick={onAdminConfirmClick} key={userToUpdate.id} userToUpdate={userToUpdate}/>)}
    </div>
  );
}

export default UserList;
