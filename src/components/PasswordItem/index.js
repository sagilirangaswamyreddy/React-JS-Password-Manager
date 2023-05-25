// Write your code here
import './index.css'

const PasswordItem = props => {
  const {eachPassword, onDeleteButtonClicked, showPassword} = props
  const {id, website, username, password} = eachPassword

  const onDelete = () => {
    onDeleteButtonClicked(id)
  }

  const passwordHaveToBeShown = showPassword ? (
    <p className="name-styles">{password}</p>
  ) : (
    <img
      className="stars-styles"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  return (
    <>
      <li>
        <div className="password-items-container">
          <div className="profile">
            <p>{website[0]}</p>
          </div>
          <div className="profile-content">
            <p className="name-styles">{website}</p>
            <p className="name-styles">{username}</p>
            {passwordHaveToBeShown}
          </div>
          <div className="delete-container">
            <button
              type="button"
              className="delete-btn"
              onClick={onDelete}
              data-testid="delete"
            >
              <img
                className="delete-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                alt="delete"
              />
            </button>
          </div>
        </div>
      </li>
    </>
  )
}
export default PasswordItem
