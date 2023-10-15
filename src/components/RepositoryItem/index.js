// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {data} = props

  const {name, avatarUrl, forksCount, issuesCount, starsCount} = data
  return (
    <li className="list-cont">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name">{name}</h1>
      <div className="small-bg">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="icon-para">{starsCount} stars</p>
      </div>
      <div className="small-bg">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="icon-para">{forksCount} forks</p>
      </div>
      <div className="small-bg">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="icon-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
