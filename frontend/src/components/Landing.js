
import { Container } from 'react-bootstrap';
import TypingAnimation from './TypingAnimation';

const Landing = () => {

    return (
        <div
            style={{
                backgroundImage: "url('https://kidscarehomehealth.com/wp-content/uploads/2022/08/KCHH-sign-language.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '92vh',
                position: 'relative'
            }}
        >
            <div 
                className="overlay"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}
            />
            
            {/* Semi-transparent white bar to help make text stand out */}
            <div 
                className="text-overlay-bar"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.45)',
                    padding: '2.5rem 0',
                    backdropFilter: 'blur(3px)'
                }}
            >
                <Container className="text-center">
                    <TypingAnimation />
                    <p className="lead mb-4 text-dark font-bold">
                        We empowering communication through sign language learning. 
                        Our web application provides a fun and effective way of learning sign language. Behind 
                        the scenes, we use a continously learning machine learning model, big data, and money yes.
                    </p>
                </Container>
            </div>
        </div>
    );
};

export default Landing;
