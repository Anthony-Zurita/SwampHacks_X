//documentation used to implement typing animation: https://www.npmjs.com/package/react-type-animation

import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        'Welcome to Visual Voice!',
      ]}
      wrapper="span"
      speed={55}
      style={{ fontSize: '5em', display: 'inline-block' }}
      repeat={1}
      cursor={false}
    />
  );
};

export default TypingAnimation;