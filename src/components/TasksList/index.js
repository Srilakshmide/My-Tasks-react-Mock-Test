import './index.css'

const TasksList = props => {
  const {taskDetails, toggleFilterButton, tagsList} = props
  const {id, task, tag} = taskDetails

  const name = tagsList.find(each => each.optionId === tag)

  const onClickTag = () => {
    toggleFilterButton(id)
  }

  return (
    <li className="my-task">
      <p className="task">{task}</p>
      <p className="tag-name">{name.displayText}</p>
    </li>
  )
}

export default TasksList
