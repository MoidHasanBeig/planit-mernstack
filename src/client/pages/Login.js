import React from 'react';

const Login = () => {
  return (
    <div className="login-page">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Sign-up or Login</h5>
          <p className="card-text">With one click</p>
          <button onClick={() => window.location.href = '/auth/google'} className="btn btn-primary">Google Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
