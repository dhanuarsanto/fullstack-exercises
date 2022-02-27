const Course = ({course}) => {
  return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={course.parts} />
      </div>
    )
}

const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part
          key={part.id}
          part={part.name}
          exercises={part.exercises}
        />
      )}
    </div>
    )
}

const Part = ({part,exercises}) => <p>{part} {exercises}</p>

const Total = ({total}) => {
  const exercises = total.map(part=>part.exercises)
  const initialValue = 0
  const sumTotal = exercises.reduce((previousValue,currentValue) =>
  previousValue + currentValue, initialValue)
  
  console.log(exercises)
  return (
    <b>Total of {sumTotal} exercises</b>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
        id:4
      }
    ]
  }
  
  console.log(course)

  return <Course course={course} />
}

export default App