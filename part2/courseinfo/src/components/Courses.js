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

export default Courses