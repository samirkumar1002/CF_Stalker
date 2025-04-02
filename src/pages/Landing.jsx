import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [handle, setHandle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      navigate(`/hero/${handle}`);
    } else {
      alert('Invalid Codeforces handle!');
    }
  };

  return (
    <div className="min-h-screen bg-cf-dark">
      <nav className="bg-cf-dark border-b border-cf-gray">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center space-x-4">
              <span className="text-cf-blue font-bold text-xl">CF Stalker</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <div className="w-full max-w-md">
          <div className="bg-cf-gray rounded-lg shadow-cf p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-cf-blue mb-2">CF Stalker</h1>
              <p className="text-cf-text">Your Stalking Companion</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-cf-text mb-2">Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-4 py-2 bg-cf-dark border border-cf-gray rounded text-cf-text focus:outline-none focus:border-cf-blue"
                  placeholder="Enter Codeforces handle"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-cf-blue text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                Enter
              </button>
            </form>
          </div>
          <div className="mt-6 text-center text-sm text-cf-text">
            <p>© 2025 CF Stalker. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;