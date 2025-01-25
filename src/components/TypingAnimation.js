//documentation: https://www.npmjs.com/package/react-type-animation

import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
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