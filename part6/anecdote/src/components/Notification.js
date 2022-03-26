import {useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(state=>state.notifications)
  const style = notification.style
  const message = notification.message
  if (style === "none") {
    return null
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification