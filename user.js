import { useState, useEffect } from 'react';
import './style.css'
import utilityTools from './utilities'

const UserComp = (props) => {
  const [user, setuser] = useState({ name: "", email: "", address: { street: "", city: "", zipcode: "" } })
  const [isRed, setisRed] = useState(false)
  const [otherDataButton, setotherDataButton] = useState(false)
  const [showTodosAndPostsToggler, setShowTodosAndPostsToggler] = useState(props.showTodosAndPostsProp)
  const [todos, settodos] = useState([])
  const [posts, setPosts] = useState([])
  const [showTodos, setShowTodos] = useState(true)
  const [addTodoInfo, setAddTodoInfo] = useState({ "userId": props.user.id, "title": "", "completed": false })
  const [showPosts, setShowPosts] = useState(true)
  const [addPostsInfo, setAddPostsInfo] = useState({ "userId": props.user.id, "title": "", "body": "" })

  useEffect(() => {
    const func = async () => {
      setuser(props.user)
      //get todos of specific user
      let resp1 = await utilityTools.getUserTodosAxios(utilityTools.todosUrl + "?userId=", props.user.id)
      settodos(resp1.data)
      //get posts of specific user
      let resp2 = await utilityTools.getUserPostsAxios(utilityTools.postsUrl + "?userId=", props.user.id)
      setPosts(resp2.data)
    }
    func()
  }, [])

  useEffect(()=>{
    for (const i of todos) {
      if (!i.completed) {
        setisRed(true)
        break;
      }
      setisRed(false)
    }
  }, [todos])

  useEffect(() => {
    const func = () => {
      setShowTodosAndPostsToggler({ active: props.showTodosAndPostsProp.active, id: props.showTodosAndPostsProp.id })
    }
    func()
  }, [props.showTodosAndPostsProp])
  const updateUser = async (e) => {
    e.preventDefault()
    let resp = await utilityTools.updateUserAxios(utilityTools.usersUrl + "/", user)
    console.log(resp.data)
  }
  const markTodosCompleted = (id) => {
    let copyTodo = [...todos]
    console.log(id)
    copyTodo[id].completed = true
    settodos(copyTodo)
  }
  const addTodo = async () => {
    let resp = await utilityTools.postTodoAxios(utilityTools.todosUrl, addTodoInfo)
    settodos([...todos, addTodoInfo])
    let copyTodo = [...todos]
    copyTodo.push(addTodoInfo)
    settodos(copyTodo)
  }
  const addPost = async () => {
    let resp = await utilityTools.postTodoAxios(utilityTools.postsUrl, addPostsInfo)
    let copyPosts = [...posts]
    copyPosts.push(addPostsInfo)
    setPosts(copyPosts)
  }

  return (
    <div>
      <form style={showTodosAndPostsToggler.active ? { backgroundColor: "orange" } : null} onSubmit={(e) => updateUser(e, user)} className={isRed ? "BoxRed" : "BoxGreen"}>
        <label onClick={() => {
          props.showTodosAndPostsCallback(user.id)
        }}>
          ID: {user.id}</label><br></br>
        Name: <input type="label" value={user.name} name="name" onChange={e => setuser({ ...user, name: e.target.value })}></input><br></br>
        Email: <input type="text" value={user.email} name="email" onChange={e => setuser({ ...user, email: e.target.value })}></input><br></br>
        <input type="button" value="Other Data" onClick={() => setotherDataButton(false)} onMouseOver={() => { setotherDataButton(true) }}></input>
        {otherDataButton &&
          <div style={{ backgroundColor: "white", border: "2px solid black", borderRadius: "10px" }}>
            Street: <input type="text" value={user.address.street} onChange={(e) => setuser({ ...user, address: { ...user.address, street: e.target.value } })}></input> <br></br>
            City: <input type="text" value={user.address.city} onChange={(e) => setuser({ ...user, address: { ...user.address, city: e.target.value } })}></input><br></br>
            zipcode: <input type="text" value={user.address.zipcode} onChange={(e) => setuser({ ...user, address: { ...user.address, zipcode: e.target.value } })}></input>
          </div>
        }
        <input type="submit" value="Update"></input>
        <input type="button" value="Delete" onClick={() => props.removeUserCallback(user.id)}></input>
        {showTodosAndPostsToggler.active &&
          <div>
            <div style={{ position: "absolute", left: "400px", top: "30px" }}>
              {!showTodos ?
                <div style={{center: "align"}}>
                  Todos  -User {showTodosAndPostsToggler.id}
                  <div style={{ border: "2px solid black", height: "100px", width: "275px", textAlign: "center" }}>
                    Title: <input type="text" onChange={(e) => setAddTodoInfo({ ...addTodoInfo, title: e.target.value })}></input>
                    <div style={{ float: "right", position: "absolute", bottom: "0", right: "0", padding: "20px" }}>
                      <input type="button" value="Cancel" onClick={() => { setShowTodos(true) }}></input>
                      <input type="button" value="Add" onClick={() => { addTodo() }}></input>
                    </div>
                  </div>
                </div> :
                <div>
                  <div>Todos  -User {showTodosAndPostsToggler.id}
                    <div style={{ float: "right" }}>
                      <input type="button" value="Add" onClick={() => { setShowTodos(false) }}></input>
                    </div>
                  </div>
                  <div style={{ border: "2px solid black", height: "200px", overflow: "hidden", overflowY: "scroll", width: "550px" }}>
                    {todos.map((todo, index) => {
                      return <div style={{ border: "2px solid purple", padding: "8px 8px 8px 8px", margin: "8px 8px 8px 8px" }} key={index}>Title: {todo.title} <br></br>
                        Completed: {todo.completed.toString()}
                        <div style={{ float: "right" }}>{!todo.completed &&
                          <input type="button" value="Mark Completed" onClick={() => { markTodosCompleted(index) }}></input>
                        }
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              }
            </div>
            {!showPosts ? <div style={{ position: "absolute", left: "400px", top: "263px", textAlign: "center" }}>
              Posts - User {showTodosAndPostsToggler.id}
              <div style={{ border: "2px solid black", height: "100px", overflow: "hidden", overflowY: "scroll", width: "275px" }}>
                Title: <input type="text" onChange={(e) => { setAddPostsInfo({ ...addPostsInfo, title: e.target.value }) }}></input> <br></br>
                Body: <input type="text" onChange={(e) => { setAddPostsInfo({ ...addPostsInfo, body: e.target.value }) }}></input>
                <div style={{ float: "right", position: "absolute", bottom: "0", right: "0", padding: "20px" }}>
                  <input type="button" value="Cancel" onClick={() => { setShowPosts(true) }}></input>
                  <input type="button" value="Add" onClick={() => { addPost() }}></input>
                </div>
              </div>
            </div> :
              <div style={{ position: "absolute", left: "400px", top: "263px" }}>
                Posts - User {showTodosAndPostsToggler.id}
                <div style={{ float: "right" }}>
                  <input type="button" value="Add" onClick={() => setShowPosts(false)}></input>
                </div>
                <div style={{ border: "2px solid black", height: "200px", overflow: "hidden", overflowY: "scroll", width: "550px" }}>
                  {posts.map((post, index) => {
                    return <div style={{ border: "2px solid purple", padding: "8px 8px 8px 8px", margin: "8px 8px 8px 8px" }} key={index}>Title: {post.title} <br></br>
                      Body: {post.body}
                    </div>
                  })}
                </div>
              </div>
            }
          </div>
        }
      </form>
    </div>
  );
}
export default UserComp;
