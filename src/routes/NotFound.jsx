import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h2>Upss!, page not found (404)</h2>
            <Link to="/" className="btn btn-outline-primary">
                Home
            </Link>
        </div>
    )
}

export default NotFound
