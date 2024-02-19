
import React, { useEffect } from 'react';
import axios from 'axios';

const ReCAPTCHA = ({ onVerify }) => {
  useEffect(() => {
    const loadReCAPTCHAScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadReCAPTCHAScript();
  }, []);

//   const handleVerify = async (token) => {
//     try {
//       // Replace 'YOUR_SERVER_API_ENDPOINT' with your server endpoint
//       const response = await axios.post('/https://dummy.restapiexample.com/api/v1/employees', { token });
//       onVerify(response.data.success);
//     } catch (error) {
//       console.error('Error verifying reCAPTCHA:', error);
//       onVerify(false);
//     }
//   };

const handleVerify = (success) => {
    onVerify(success);
  
    if (success) {
     
      console.log('reCAPTCHA Verified!');
    }
  };
  
 

  return (
    <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_API_KEY" data-callback={handleVerify}></div>
  );
};

export default ReCAPTCHA;
