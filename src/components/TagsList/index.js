import './index.css'

const TagsList = props => {
  const {tags, onClickFilter, isActive} = props
  const {displayText, optionId} = tags

  const onClickTag = () => {
    onClickFilter(optionId)
  }

  const btnClassName = isActive ? 'selected' : ''

  return (
    <li className="tag-btn">
      <button
        type="button"
        className={`btn ${btnClassName}`}
        onClick={onClickTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagsList
