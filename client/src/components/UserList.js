import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import { useNavigate } from "react-router-dom";

function UserList() {
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState("")
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
    
    const searchFilteredUsers = alphaUsers.filter((user) => {
        if(search === "") {
          return true
        } else if (user.last_name.toLowerCase().startsWith(search.toLowerCase())) {
          return true
        } else {
          return false
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
    <div className="content">
        <h1>Users</h1>
        <label className="order_search_label">Search by last name:
            <input type="text" className="order_search_bar" value={search} onChange={(e) => setSearch(e.target.value)}></input>
          </label>
        <table className="user-list-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Rating </th>
                    <th>Admin? </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {searchFilteredUsers.map((userToUpdate) => <UserListItem onAdminConfirmClick={onAdminConfirmClick} key={userToUpdate.id} userToUpdate={userToUpdate}/>)}
            </tbody>
        </table>
        {searchFilteredUsers.length < 1 ? <p>Search returned no results...</p> : null}
    </div>
  );
}

export default UserList;
