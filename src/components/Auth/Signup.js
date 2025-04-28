import React, { useState } from 'react';
import { signupWithEmail } from '../../firebase/authService';

function Signup({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signupWithEmail(email, password);
      setUser(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;
