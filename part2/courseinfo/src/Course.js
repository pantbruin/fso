
const Header = ({ courseName }) => <h1>{courseName}</h1>
const Content = ({ parts }) => {
  const partsComponents = parts.map((ele, index) => <Part key={index} name={ele.name} exercises={ele.exercises} />)
  return(
    <div>
      {partsComponents}
    </div>
  )
}
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
  const sum = parts.reduce((partialSum, ele) => partialSum + ele.exercises, 0);
  return (<p><strong>total of {sum} exercises</strong></p>)
}

const Course = (props) => {
    return (
      <div>
        <Header courseName={props.courseName} />
        <Content parts={props.parts} />
        <Total parts={props.parts}/>
  
      </div>
  
    )
  }

  export default Course