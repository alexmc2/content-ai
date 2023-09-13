import React from 'react';

function ResendVerificationButton({ userId }) {
  async function resendVerificationEmail() {
    try {
      const response = await fetch('/api/resendVerificationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
      } else {
        alert('Error resending verification email.');
      }
    } catch (error) {
      alert('Error resending verification email.');
    }
  }

  return (
    <button onClick={resendVerificationEmail}>Resend Verification Email</button>
  );
}

export default ResendVerificationButton;
