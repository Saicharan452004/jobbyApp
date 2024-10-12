import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-bar-desktop-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-bar-logo"
          />
        </Link>
        <ul className="links-container">
          <li className="list-item">
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>
          <li className="list-item">
            <Link to="/jobs" className="link-item">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          className="nav-bar-desktop-button"
          type="button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </nav>
      <nav className="nav-bar-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-bar-logo"
          />
        </Link>
        <ul className="links-container">
          <li>
            <Link to="/">
              <AiFillHome className="mobile-link-item" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsFillBriefcaseFill className="mobile-link-item" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="mobile-link-item mobile-button"
              onClick={onClickLogout}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
