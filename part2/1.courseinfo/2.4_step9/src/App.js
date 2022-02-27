const Course = ({courses}) =>
  <>
    {courses.map(course=><Display key={course.id} courses={course} />)}
  </>

const Display = ({courses}) => {
  return (
      <>
        <Header course={courses.name} />
        <Content parts={courses.parts} />
        <Total total={courses.parts} />
      </>
    )
}

const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => 
  <>
    {parts.map(part =>
      <Part
        key={part.id}
        part={part.name}
        exercises={part.exercises}
      />
    )}
  </>

const Part = ({part,exercises}) => <p>{part} {exercises}</p>

const Total = ({total}) => {
  const exercises = total.map(part=>part.exercises)
  const initialValue = 0
  const sumTotal = exercises.reduce((previousValue,currentValue) =>
  previousValue + currentValue, initialValue)
  
  return (
    <b>Total of {sumTotal} exercises</b>
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
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
    )
}

export default App