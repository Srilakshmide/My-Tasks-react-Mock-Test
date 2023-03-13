import {Component} from 'react'
import {v4} from 'uuid'

import TagsList from '../TagsList'
import TasksList from '../TasksList'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreateTask extends Component {
  state = {
    taskInput: '',
    taskData: [],
    selectedTag: 'HEALTH',
    isActive: false,
  }

  onChangeTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onClickFilter = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  toggleFilterButton = id => {
    this.setState(prevState => ({
      taskData: prevState.taskData.map(eachTask => {
        if (id === eachTask.id) {
          return {...eachTask, isFilter: !eachTask.isFilter}
        }
        return eachTask
      }),
    }))
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state

    const newTask = {
      id: v4(),
      task: taskInput,
      tag: selectedTag,
      isFilter: false,
    }
    this.setState(prevState => ({
      taskData: [...prevState.taskData, newTask],
      taskInput: '',
      selectedTag: 'HEALTH',
    }))
  }

  getFilteredItems = () => {
    const {taskData, isActive} = this.state

    if (isActive) {
      return taskData.filter(eachItem => eachItem.isFilter === true)
    }
    return taskData
  }

  render() {
    const {taskInput, taskData, isActive, selectedTag} = this.state
    const len = taskData.length
    const filteredTasksList = this.getFilteredItems()

    return (
      <div className="bg-container">
        <div className="task-container">
          <h1 className="heading">Create a task!</h1>
          <form className="form" onSubmit={this.onAddTask}>
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              type="text"
              className="input"
              value={taskInput}
              placeholder="Enter the task here"
              id="task"
              onChange={this.onChangeInput}
            />
            <label className="label" htmlFor="optionId">
              Tags
            </label>
            <select
              className="input"
              value={selectedTag}
              id="optionId"
              onChange={this.onChangeTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-container">
          <h1 className="tags-head">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <TagsList
                key={each.optionId}
                tags={each}
                onClickFilter={this.onClickFilter}
                isActive={isActive}
              />
            ))}
          </ul>
          <h1 className="task-head">Tasks</h1>
          {len ? (
            <ul className="tasks-list">
              {filteredTasksList.map(each => (
                <TasksList
                  key={each.id}
                  taskDetails={each}
                  tagsList={tagsList}
                  toggleFilterButton={this.toggleFilterButton}
                />
              ))}
            </ul>
          ) : (
            <div className="no-task">
              <p className="no-task-head">No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CreateTask
