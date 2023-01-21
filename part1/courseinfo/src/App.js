const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Header = ({ courseName }) => <h1>{courseName}</h1>
const Content = ({ parts }) => {
  const partsComponents = parts.map((ele, index) => <Part key={index} name={ele.name} exercises={ele.exercises} />)
  return(
    <div>
      {partsComponents}
    </div>
  )
}
const Total = ({ parts }) => {
  const sum = parts.reduce((partialSum, ele) => partialSum + ele.exercises, 0);
  return (<p>Number of exercises {sum}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header courseName={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
  )
}

export default App