import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchVal: '',
    showPassword: false,
  }

  componentDidMount() {
    const passwordListFromStorage = JSON.parse(
      localStorage.getItem('password_manager'),
    )
    console.log(passwordListFromStorage)
    const passwordStorage =
      passwordListFromStorage === null ? [] : passwordListFromStorage

    this.setState({passwordList: passwordStorage})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password, passwordList} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
      localStorage.setItem(
        'password_manager',
        JSON.stringify([...passwordList, newPassword]),
      )
    }
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDeleteButtonClicked = id => {
    const {passwordList} = this.state
    const updatedPasswords = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordList: updatedPasswords})
    localStorage.setItem('password_manager', JSON.stringify(updatedPasswords))
  }

  onSearchChange = event => {
    this.setState({searchVal: event.target.value})
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      searchVal,
      showPassword,
    } = this.state

    const searchResult = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchVal.toLowerCase()),
    )
    const passwordsCount = searchResult.length
    const imgOrPasswords =
      passwordsCount === 0 ? (
        <div className="passwords-img">
          <img
            className="img-pass"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
          />
          <p className="img-pass-para">No Passwords</p>
        </div>
      ) : (
        <div>
          <ul className="comments-container">
            {searchResult.map(eachPassword => (
              <PasswordItem
                key={eachPassword.id}
                onDeleteButtonClicked={this.onDeleteButtonClicked}
                eachPassword={eachPassword}
                showPassword={showPassword}
              />
            ))}
          </ul>
        </div>
      )
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            className="logo-styles"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="data-img-container">
          <div className="data-container">
            <h1 className="heading">Add New Password</h1>
            <form className="form-styles" onSubmit={this.onAddPassword}>
              <div className="input-img-container">
                <div className="small-logos-container">
                  <img
                    className="small-logos"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <input
                  value={website}
                  className="input-name"
                  name="Enter Website"
                  placeholder="Enter Website"
                  type="text"
                  onChange={this.onWebsiteChange}
                />
              </div>
              <div className="input-img-container">
                <div className="small-logos-container">
                  <img
                    className="small-logos"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </div>
                <input
                  value={username}
                  className="input-name"
                  placeholder="Enter Username"
                  type="text"
                  name="Enter Username"
                  onChange={this.onUsernameChange}
                />
              </div>
              <div className="input-img-container">
                <div className="small-logos-container">
                  <img
                    className="small-logos"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <input
                  value={password}
                  className="input-name"
                  placeholder="Enter Password"
                  type="password"
                  name="Enter Password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="pass-manager-img"
            />
          </div>
        </div>
        <div className="passwords-container">
          <div className="search-and-passwords-count-container">
            <div>
              <h1 className="number-of-passwords">
                Your Passwords <p className="number"> {passwordsCount} </p>
              </h1>
            </div>
            <div className="input-img-container sm-container">
              <div className="small-logos-container">
                <img
                  className="small-logos"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                value={searchVal}
                className="input-name"
                placeholder="Search"
                type="search"
                onChange={this.onSearchChange}
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="show-passwords-container">
            <input
              id="show-password"
              className="checkbox-styles"
              type="checkbox"
              onChange={this.onShowPassword}
            />
            <label htmlFor="show-password" className="show-passwords-text">
              Show Passwords
            </label>
          </div>
          <div className="passwords-container">{imgOrPasswords}</div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
