import { useEffect, useState } from "react";

import UserComp from "./user";
import './style.css'
import utilityTools from "./utilities";

function UsersComp(props) {
  const [users, setusers] = useState([])
  const [searchData, setsearchData] = useState("")
  const [showTodosAndPostsToggler, setShowTodosAndPostsToggler] = useState({ active: false, id: 0 })
  useEffect(async () => {
    let resp = await utilityTools.getUsersAxios(utilityTools.usersUrl)
    setusers(resp.data)
  })

  const deleteUser = async (id) => {
    let resp = await utilityTools.deleteUserAxios(utilityTools.usersUrl + "/" + id)
    setusers(users.splice(id - 1, 1))
  }
  const showTodosAndPosts = (id) => {
    if (id === showTodosAndPostsToggler.id) {
      showTodosAndPostsToggler.active = !showTodosAndPostsToggler.active
      return;
    }
    else if (id !== showTodosAndPostsToggler.id && showTodosAndPostsToggler.active) {
      setShowTodosAndPostsToggler({ active: showTodosAndPostsToggler.active, id: id })
    }
    else {
      setShowTodosAndPostsToggler({ active: !showTodosAndPostsToggler.active, id: id })
    }
    return {active: showTodosAndPostsToggler.active, id: showTodosAndPostsToggler.id}
  }
  return (
    <div className="main-frame">
      <div style={{ textAlign: "center" }}>
        Search: <input className="textbox1" type="text" onChange={(e) => { setsearchData(e.target.value) }}></input>
        <input type="button" value="Add"></input>
      </div >
      {users.map((user, index) => {
        if (user.name.includes(searchData) || user.email.includes(searchData)) {
          return <div key={user.id}><UserComp user={users[index]} removeUserCallback={(id) => deleteUser(id)} showTodosAndPostsCallback={(id) => { showTodosAndPosts(id) }} /></div>
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
