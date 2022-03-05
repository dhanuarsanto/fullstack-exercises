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

export default Course