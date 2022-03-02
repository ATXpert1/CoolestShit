import { useEffect, useState } from "react";

import UserComp from "./user";
import './style.css'
import utilityTools from "./utilities";

function UsersComp(props) {
  const [users, setusers] = useState([])
  const [searchData, setsearchData] = useState("")
  const [showTodosAndPostsToggler, setShowTodosAndPostsToggler] = useState({ active: false, id: 0 })

  useEffect(async () => {
    // get all users
    let resp = await utilityTools.getUsersAxios(utilityTools.usersUrl)
    setusers(resp.data)
  }, [])

  const deleteUser = async (id) => {
    // delete specific user
    let resp = await utilityTools.deleteUserAxios(utilityTools.usersUrl + "/" + id)
    let copyUsers = [...users]
    const indexToRemove = users.findIndex(user => user.id === id)
    copyUsers.splice(indexToRemove, 1)
    setusers(copyUsers)
  }
  const showTodosAndPosts = (id) => {
    if (id === showTodosAndPostsToggler.id) {
      setShowTodosAndPostsToggler({ active: !showTodosAndPostsToggler.active, id: id })
    }
    else if (id !== showTodosAndPostsToggler.id && showTodosAndPostsToggler.active) {
      setShowTodosAndPostsToggler({ active: true, id: id })
    }
    else {
      setShowTodosAndPostsToggler({ active: true, id: id })
    }
  }
  return (
    <div className="main-frame">
      <div style={{ textAlign: "center" }}>
        Search: <input className="textbox1" type="text" onChange={(e) => { setsearchData(e.target.value) }}></input>
        <input type="button" value="Add"></input>
      </div >
      {users.map((user, index) => {
        if (user.name.includes(searchData) || user.email.includes(searchData)) {
          return <div key={user.id}><UserComp user={users[index]} removeUserCallback={deleteUser}
            showTodosAndPostsCallback={showTodosAndPosts}
            showTodosAndPostsProp={
              (user.id === showTodosAndPostsToggler.id) ? { active: showTodosAndPostsToggler.active, id: showTodosAndPostsToggler.id } : { active: false, id: 0 }} /></div>
        }
        else {
          return null
        }
      })
      }
    </div>
  );
}

export default UsersComp;
