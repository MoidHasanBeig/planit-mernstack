import React from 'react';

const Login = () => {
  return (
    <div className="login-page bg-light d-flex h-100">
      <div className="shadow-sm card text-center p-4 m-auto">
        <div className="card-body">
          <h1><i className="display-1 text-dark fas fa-calendar-check"></i></h1>
          <p className="mb-3"><em>Plan it</em></p>
          <h5 className="card-title">Sign-up or Login</h5>
          <p className="card-text">With one click</p>
          <button onClick={() => window.location.href = '/auth/google'} className="shadow btn btn-dark">
            <i className="fab fa-google mr-3"></i>
            Continue with ChaCha
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
