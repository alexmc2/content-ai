import React from 'react';
import ResendVerificationButton from '../components/ResendVerificationButton'; 

function VerifyEmailPage() {
  return (
    <div className="container">
      <h1>Verify Your Email</h1>
      <p>
      A verification email has been sent to your inbox. Please click the link in
        the email to verify your account.
      </p>
      <ResendVerificationButton />
    </div>
  );
}

export default VerifyEmailPage;
