import { useState } from 'react' 
import PropTypes from 'prop-types'
const Blog = ({blog, handleDeleteBlog, userOwnedBool, handleUpdateBlog, loggedIn}) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const loggedInLike = loggedIn ? {display: ""} : {display:"none"}
  const userOwned = userOwnedBool ? {display: ""} : {display:"none"}
  
  const toggleVisibility = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }
  const likeBlog = (event) => {
    event.preventDefault()
    handleUpdateBlog({...blog, likes: blog.likes+1})
  }

  const sendDeleteBlog = (event) => {
    event.preventDefault()
    console.log(blog)
    handleDeleteBlog(blog)
  }

  //SHOWING DETAILS
  if (showDetails) {
    return (
      <div style = {blogStyle}>
    Title: {blog.title} <br/>
    Author: {blog.author}<br/>
    Likes: {blog.likes} <button style = {loggedInLike} onClick={likeBlog}>Like</button><br/>
    <button onClick={toggleVisibility}>Hide</button>
    <button style = {userOwned} onClick={sendDeleteBlog}>Remove</button>
  </div> 
    )
  }

  else { return (
  <div>
    {blog.title} {blog.author} 
    <button onClick={toggleVisibility}>Show Details</button>
  </div>  
)
}
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  userOwnedBool: PropTypes.bool.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Blog