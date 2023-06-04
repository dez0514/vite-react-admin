import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-h-[100%]">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={ handleClick }>Back Home</Button>}
      />
    </div>
  )
}

export default NotFound