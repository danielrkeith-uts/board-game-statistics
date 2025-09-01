import { Link } from "react-router-dom"
import { CREATE_ACCOUNT_PAGE_URL } from "../../utils/constants"

const HomeView = () => {
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1>Board Games Statistics</h1>
        <h4 className="mt-0">Track games with your friends!</h4>
        <Link to={CREATE_ACCOUNT_PAGE_URL}><button className="btn btn-primary mt-3">Create account</button></Link>
      </div>
    </>
  )
}

export default HomeView