import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  //State Declarations
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newAuthorName, setNewAuthorName] = useState('')
  const [newBlogName, setNewBlogName] = useState('')
  const [newURL, setNewURL] = useState('')

  //Hooks
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Services/Funcs
    //Logs User in and Saves token locally
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
      setErrorMessage('Successful Login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.error(exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

      //Logs user out, deletes token
    const handleLogout = (event) => {
    event.preventDefault()
    
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)

    setErrorMessage('Logged Out Successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    }
      //Creates blog
    const handleNewBlog = async (event) => {
      event.preventDefault()
      const blogObject = {
        title: newBlogName,
        author: newAuthorName,
        url: newURL
      }

      try {
        const response = await blogService.create(blogObject)
        console.log(response.title)
        setBlogs(blogs.concat(response))
        setNewBlogName('')
        setNewAuthorName('')
        setNewURL('')
        setErrorMessage('Blog Creation Succeeded')
        setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      } catch {
        setErrorMessage('Blog Creation Failed')
        setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      }

    }



  //Forms/Components
  const loginForm = () => (
    <div>
      <h1>LOGIN:</h1>
      <form onSubmit={handleLogin}>
        <div>
            Username: 
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            Password:  
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form> 
    </div>     
  )

  const loggedInForm = () => (
    <div>
      <h5>logged in as: {user.name}</h5>
      <form onSubmit={handleLogout}>
         <button type="submit">Log Out</button>
      </form>
    </div> 
  )

  const newBlogForm = () => (
    <div>
      <h1>New Blog:</h1>
      <form onSubmit={handleNewBlog}>
        <div>
            Title: 
            <input
              type="text"
              value={newBlogName}
              name="title"
              onChange={({ target }) => setNewBlogName(target.value)}
            />
        </div>
        <div>
            Author:  
            <input
              type="text"
              value={newAuthorName}
              name="author"
              onChange={({ target }) => setNewAuthorName(target.value)}
            />
        </div>
        <div>
            URL:  
            <input
              type="text"
              value={newURL}
              name="url"
              onChange={({ target }) => setNewURL(target.value)}
            />
        </div>
        <button type="submit">Create</button>
      </form> 
    </div>     
  )








  if (user===null) {
    return (
      <div>
      <Notification message={errorMessage} />
      {loginForm()}
      </div>
    )
  }
  

  return (
 
    <div>
      <div>
      <Notification message={errorMessage} />
      </div>
      <h2>Blogs</h2>
      {loggedInForm()}
      {newBlogForm()}
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
