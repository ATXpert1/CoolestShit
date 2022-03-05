import { useEffect, useState } from "react";

import UserComp from "./user";
import './style.css'
import utilityTools from "./utilities";

function UsersComp(props) {
  const [users, setusers] = useState([])
  const [searchData, setsearchData] = useState("")
  const [showTodosAndPostsToggler, setShowTodosAndPostsToggler] = useState({ active: false, id: 0 })
  const [makeNewUser, setMakeNewUser] = useState(false)
  const [newUserData, setNewUserData] = useState({
    "id": "", "name": "", "username": "Brad", "email": "Slayer@gmail.com",
    "address": {
      "street": "rotchild",
      "city": "Honolulu",
      "zipcode": "4343-4343"
    }
  })

  useEffect(async () => {
    // get all users
    let resp = await utilityTools.getUsersAxios(utilityTools.usersUrl)
    setusers(resp.data)
  }, [])

  const deleteUser = async (id) => {
    // delete specific user
    let resp = await utilityTools.deleteUserAxios(utilityTools.usersUrl + "/" + id)
    console.log(resp)
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
  const makeNewUserFunc = async () => {
    let newId = users[users.length - 1].id + 1
    let copyUserData = { ...newUserData }
    copyUserData.id = newId
    let resp = await utilityTools.postUsersAxios(utilityTools.usersUrl, copyUserData)
    console.log(resp)
    setusers([...users, copyUserData])
  }
  return (
    <div className="main-frame">
      <div style={{ textAlign: "center" }}>
        Search: <input className="textbox1" type="text" onChange={(e) => { setsearchData(e.target.value) }}></input>
        <input type="button" value="Add" onClick={() => { setMakeNewUser(true) }}></input>
      </div >
      {makeNewUser ?
        <div style={{ position: "absolute", left: "400px", top: "30px", border: "2px solid black", height: "100px", width: "275px" }}>
          Name: <input type="text" onChange={(e) => { setNewUserData({ ...newUserData, "name": e.target.value }) }}></input> <br></br>
          Email: <input type="text" onChange={(e) => { setNewUserData({ ...newUserData, "email": e.target.value }) }}></input>
          <div style={{ position: "absolute", right: 0, bottom: 0, padding: "10px" }}>
            <input type="button" value="Cancel" onClick={() => { setMakeNewUser(false) }}></input>
            <input type="button" value="Add" onClick={() => { makeNewUserFunc() }}></input>
          </div>
        </div> : null}
        {/* load users */}
      {users.map((user, index) => {
        // search function
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
