const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Header = (props) => <h1>{props.course}</h1>
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
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
    <Header course={course}/>
    <Content parts={parts}/>
    <Total parts={parts}/>
    </div>
  )
}

export default App