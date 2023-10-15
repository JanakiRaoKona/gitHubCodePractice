import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    popularRepos: languageFiltersData[0].id,
    filterData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItems()
  }

  onClickLanguage = id => {
    this.setState({popularRepos: id}, this.getItems)
  }

  successView = () => {
    const {filterData} = this.state
    return (
      <ul className="ul-list-container-2">
        {filterData.map(item => (
          <RepositoryItem data={item} key={item.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <>
      <img
        className="warn-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="warn-data">Something Went Wrong</h1>
    </>
  )

  loadingView = () => (
    <>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  getItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {popularRepos} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${popularRepos}`

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const upDateData = data.popular_repos.map(item => ({
        id: item.id,
        avatarUrl: item.avatar_url,
        forksCount: item.forks_count,
        name: item.name,
        issuesCount: item.issues_count,
        starsCount: item.stars_count,
      }))
      this.setState({
        filterData: upDateData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {popularRepos} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="ul-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              filtersData={eachItem}
              key={eachItem.id}
              onClickLanguage={this.onClickLanguage}
              isActive={popularRepos === eachItem.id}
            />
          ))}
        </ul>

        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
