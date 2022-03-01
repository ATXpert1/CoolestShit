import { useState, useEffect } from 'react';
import './style.css'
import utilityTools from './utilities'

const UserComp = (props) => {
  const [user, setuser] = useState({ name: "", email: "", address: { street: "", city: "", zipcode: "" } })
  const [isRed, setisRed] = useState(false)
  const [otherDataButton, setotherDataButton] = useState(false)
  const [showTodosAndPostsToggler, setShowTodosAndPostsToggler] = useState({ active: false, id: 0 })
  const [todos, settodos] = useState([])
  const [posts, setposts] = useState([])

  useEffect(() => {
    const func = async () => {
      setuser(props.user)
      //get todos of specific user
      let resp1 = await utilityTools.getUserTodosAxios(utilityTools.todosUrl + "?userId=", props.user.id)
      settodos(resp1.data)
      let resp2 = await utilityTools.getUserPostsAxios(utilityTools.postsUrl + "?userId=", props.user.id)
    setposts(resp2.data)
      for (const i of resp1.data) {
        if (!i.completed) {
          setisRed(true)
          break;
        }
      }
    }
    func()
  }, [])
  const updateUser = async (e) => {
    e.preventDefault()
    let resp = await utilityTools.updateUserAxios(utilityTools.usersUrl + "/", user)
    console.log(resp.data)
  }
  const markTodosCompleted = (id) => {
    let temp = [...todos]
    temp[id].completed = true
    settodos(temp)
  }
  return (
    <div>
      <form style={showTodosAndPostsToggler.active ? {backgroundColor: "orange"}: null} onSubmit={(e) => updateUser(e, user)} className={isRed ? "BoxRed" : "BoxGreen"}>
        ID:<label onClick={() => {
          let resp = props.showTodosAndPostsCallback(user.id)
          console.log(resp)
          setShowTodosAndPostsToggler(resp.id)
        }}>
          {user.id}</label><br></br>
        Name: <input type="label" value={user.name} name="name" onChange={e => setuser({ ...user, name: e.target.value })}></input><br></br>
        Email: <input type="text" value={user.email} name="email" onChange={e => setuser({ ...user, email: e.target.value })}></input><br></br>
        <input type="button" value="Other Data" onClick={() => setotherDataButton(false)} onMouseOver={() => { setotherDataButton(true) }}></input>
        {otherDataButton &&
          <div style={{backgroundColor: "white" ,border: "2px solid black", borderRadius: "10px" }}>
            Street: <input type="text" value={user.address.street} onChange={(e) => setuser({ ...user, address: { ...user.address, street: e.target.value } })}></input> <br></br>
            City: <input type="text" value={user.address.city} onChange={(e) => setuser({ ...user, address: { ...user.address, street: e.target.value } })}></input><br></br>
            zipcode: <input type="text" value={user.address.zipcode} onChange={(e) => setuser({ ...user, address: { ...user.address, street: e.target.value } })}></input>
          </div>
        }
        <input type="submit" value="Update"></input>
        <input type="button" value="Delete" onClick={() => props.removeUserCallback(user.id)}></input>
        {showTodosAndPostsToggler.active &&
        <div>
          <div style={{ position: "absolute", left: "400px", top: "30px" }}>
            Todos  -User {showTodosAndPostsToggler.id}
            <div style={{ border: "2px solid black", height: "200px", overflow: "hidden", overflowY: "scroll", width: "550px" }}>
              {todos.map((todo, index) => {
                return <div style={{ border: "2px solid purple", padding: "8px 8px 8px 8px", margin: "8px 8px 8px 8px" }} key={index}>Title: {todo.title} <br></br>
                  Completed: {todo.completed.toString()}
                  {!todo.completed &&
                    <input style={{ textAlign: "right" }} type="button" value={todo.completed.toString()} onClick={() => {markTodosCompleted(todo.id)}}></input>
                  }
                </div>
              })}
            </div>
          </div>
          <div style={{ position: "absolute", left: "400px", top: "263px" }}>
            Posts - User {showTodosAndPostsToggler.id}
            <div style={{ border: "2px solid black", height: "200px", overflow: "hidden", overflowY: "scroll", width: "550px" }}>
              {posts.map((post) => {
                return <div style={{ border: "2px solid purple", padding: "8px 8px 8px 8px", margin: "8px 8px 8px 8px" }} key={post.id}>Title: {post.title} <br></br>
                  Body: {post.body}
                </div>
              })}
            </div>
          </div>
        </div>
      }
      </form>
    </div>
  );
}
export default UserComp;
