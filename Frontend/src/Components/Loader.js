import { Spinner } from 'react-bootstrap';


export const Loader = () => {
  return (
    <Spinner 
    animation='border'
    role='status'
    style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%'
    }}
    >
        <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}
