//implemented using react-bootstrap spinner documentation: https://react-bootstrap.netlify.app/docs/components/spinners/
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
    return (
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Spinner 
          animation="border" 
          role="status"
          style={{ 
            width: '6rem', 
            height: '6rem'
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

export default LoadingSpinner;