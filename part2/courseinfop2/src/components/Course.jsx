{/*This creates the Course component that is used */}

/* This is the Course component that is used to render the course information */
const Course = ({ course }) => {

  {/*Here we are returning all of our other components that we created below*/}
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts = {course.parts} />
      </div>
    )
  }

  {/*The Total component uses the reduce method to calculate the total number of exercises*/}
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (      
        <p><strong>Total of {total} exercises</strong></p>  
    )
  }
  
  const Header = ({ course }) => {
    return <h2>{course}</h2>
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  export default Course