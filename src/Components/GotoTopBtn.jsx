import React, { useState, useEffect } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import color from '../color/color';

const GotoTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop >250);
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          className="go-to-top"
          onClick={goToTop}
          style={{ position: 'fixed', right: '1.25rem', bottom: '1.25rem',cursor:'pointer' }}
        >
          <BsFillArrowUpCircleFill fontSize={40} sx={{color:color.bluedark}} />
        </div>
      )}
    </div>
  );
};

export default GotoTopBtn;
