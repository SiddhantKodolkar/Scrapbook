// src/hooks/useBlockNavigation.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useBlockNavigation = (shouldBlock) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldBlock) {
      const handlePopState = (event) => {
        event.preventDefault();
        const shouldLeave = window.confirm('Are you sure you want to leave? You need to logout first.');
        if (shouldLeave) {
          navigate('/media');
        } else {
          window.history.pushState(null, null, window.location.pathname);
        }
      };

      window.history.pushState(null, null, window.location.pathname); // Prevent going back directly

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [shouldBlock, navigate]);
};

export default useBlockNavigation;
