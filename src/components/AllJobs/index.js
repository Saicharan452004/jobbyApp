import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProfileCard from '../ProfileCard'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobsData: [],
    checkboxInputs: [],
    radioInput: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.onGetJobDetails()
  }

  onGetJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchInput} = this.state
    const apiurl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs.join()}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCheckboxInputs = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({checkboxInputs: filteredData}, this.onGetJobDetails)
    }
  }

  onChangeRadioInput = event => {
    this.setState({radioInput: event.target.id}, this.onGetJobDetails)
  }

  onChangeSearchinput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobDetails()
    }
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onRetryJobs = () => {
    this.onGetJobDetails()
  }

  jobsfailureView = () => (
    <div className="failure-image-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-container-heading">Oops! Something Went Wrong</h1>
      <p className="failure-container-paragraph">
        we cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No jobs found</h1>
        <p className="no-jobs-paragraph">
          We could not find any jobs. Try other filters
        </p>
      </div>
    ) : (
      <ul className="unorder-jobs-container">
        {jobsData.map(eachItem => (
          <JobCard jobData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.jobsfailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="jobs-container-search-item-mobile">
            <input
              type="search"
              className="search-bar"
              value={searchInput}
              placeholder="Search"
              onChange={this.onChangeSearchinput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              data-testid="searchButton"
              type="button"
              className="search-button"
              onClick={this.onSubmitSearchInput}
            >
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
          <div className="side-bar-container">
            <ProfileCard />
            <hr className="hr-line" />
            <FiltersGroup
              onChangeCheckboxInputs={this.onChangeCheckboxInputs}
              onChangeRadioInput={this.onChangeRadioInput}
            />
          </div>
          <div className="jobs-container">
            <div className="jobs-container-search-item-desktop">
              <input
                type="search"
                className="search-bar"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchinput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default AllJobs
