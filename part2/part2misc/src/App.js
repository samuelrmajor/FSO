import React from 'react'





const Courses = ({courses}) => {

  return (
    <div>
      {
        courses.map(
          course=>
      <Course key = {course.id} course = {course}/>
        )}
    </div>
  )

}

const Course = ({course}) => {

  return (
    <div>

      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>

    </div>
  )

}

const Header = (props) => {
  return (
    <h1> 
      {props.course.name}
    </h1>
  )
}


const Content = ({course}) => {

  return (
    <div>
      {
        course.parts.map(
          part=>
            <Part key={part.id} section ={part.name} exercise = {part.exercises}/>
        )
      }
    </div>
  )

}



const Part = ({section, exercise}) => {
  return (
    <p> 
      {section} {exercise}
    </p>
  )

}


const Total = ({course}) => {
  const result = course.parts.reduce((partialSum, a) => partialSum + a.exercises, 0)
  return (
    <p> 
      Number of exercises {result}
    </p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
     
       <Courses courses = {courses} />
     
    </div>
  )
}

export default App