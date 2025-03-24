import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";

function UserListItem({userToUpdate, onAdminConfirmClick}) {
    const [ adminClick, setAdminClick ] = useState(false)
    const { user } = useContext(UserContext) 
    const [stars, setStars] = useState(["☆","☆","☆","☆","☆"])
    
    useEffect(() => {
        if(userToUpdate.poly_reviews.length > 0){
            setStars(formatStars(userToUpdate.poly_reviews[0].stars))
        }
    },[])

    function handleAdminClick(e){
        setAdminClick(true)
    }

    function handleAdminConfirmClick(e) {
        onAdminConfirmClick(userToUpdate.id, !userToUpdate.is_admin)
        setAdminClick(false)
    }

    function handleReviewClick(e) {
        fetch('/poly_reviews/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({stars: e.target.id, reviewable_id: userToUpdate.id, reviewable_type: "User"}),
        })
        .then((res) => res.json())
        .then((review) => setStars(formatStars(review)))
      }

    const renderStars = stars.map((star, index) => (
        <span onClick={handleReviewClick} key={index} className="user-review" id={index + 1}>{star}</span>
      ))

    function formatStars(num) {
        if(num === 0) return ["☆","☆","☆","☆","☆"];
        const updatedStars = num
        const newStars = []
        for(let i = 1; i <= 5; i++) {
          if(i <= updatedStars) {
            newStars.push("★")
          } else {
            newStars.push("☆")
          }
        }
        return newStars
      }
    
  return (
        <tr key={userToUpdate.id} >
            <td>{userToUpdate.last_name}, {userToUpdate.first_name}</td>
            <td>{userToUpdate.username}</td>
            <td>{userToUpdate.is_admin ? null : renderStars}</td>
            <td>{userToUpdate.is_admin ? "Yes" : "No"}</td>
            <td>
            {!adminClick ?
                <button onClick={user.id !== userToUpdate.id ? handleAdminClick : null} className={user.id !== userToUpdate.id ? "user-list-item-button user-list__button" : "disable user-list__button"}>{userToUpdate.is_admin ? "remove admin" : "make admin"}</button>
                :
                <div>
                    <button onClick={handleAdminConfirmClick}>Confirm</button>
                    <button onClick={()=> setAdminClick(false)}>Cancel</button>
                </div>
                }
            </td>
        </tr>
  );
}

export default UserListItem;
