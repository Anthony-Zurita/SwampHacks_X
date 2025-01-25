//https://www.google.com/url?sa=i&url=https%3A%2F%2Fkidscarehomehealth.com%2Fbasic-sign-language-signs%2F&psig=AOvVaw0NXlp938lcn3lWjcm_M6jM&ust=1737934285972000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIidz--DkosDFQAAAAAdAAAAABAI
import { Container } from 'react-bootstrap';
import TypingAnimation from './TypingAnimation';

//https://kidscarehomehealth.com/wp-content/uploads/2022/08/KCHH-sign-language.jpg

const Landing = () => {
  return (
    <div 
      className="landing-container"
      style={{
        backgroundImage: "url('https://kidscarehomehealth.com/wp-content/uploads/2022/08/KCHH-sign-language.jpg')",  // Replace with your image
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      />
      <Container className="text-center text-white position-relative" style={{ paddingTop: '15vh' }}>
        <TypingAnimation />
        <p className="lead mb-4">
          Empowering communication through sign language learning. 
          Connect with expert tutors and join our community of learners 
          on your journey to mastering sign language.
        </p>
      </Container>
    </div>
  );
};

export default Landing;
