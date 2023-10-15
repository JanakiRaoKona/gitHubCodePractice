// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filtersData, onClickLanguage, isActive} = props
  const {id, language} = filtersData

  const themeButton = isActive ? 'tab-btn' : ''

  const onClickButton = () => {
    onClickLanguage(id)
  }

  return (
    <li>
      <button
        type="button"
        className={`button ${themeButton}`}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
