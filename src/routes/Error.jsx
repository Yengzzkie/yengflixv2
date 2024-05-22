import { Link } from "react-router-dom"

export default function Error() {
  return (
    <>
      <h1>Ooops... an error has occured.</h1>
      <h2>That page does not exist</h2>
      <span>Return to</span> <Link to="/">Home</Link>
    </>
  )
}
