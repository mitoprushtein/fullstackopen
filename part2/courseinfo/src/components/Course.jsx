const Header = (props) =>
  <h1>{props.course}</h1>


const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>

const Total = ({ parts }) =>
  <p>Number of exercises {
    parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
  }</p>

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course
