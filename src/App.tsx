import { useState, useEffect } from 'react';
import { Chat } from './components/Chat';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div className={`min-h-screen w-full ${isDarkTheme ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-100 via-purple-50 to-teal-50'} flex justify-center`}>
      {/* Decorative elements */}
      {!isDarkTheme && (
        <>
          <div className="decorative-flower">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#FDA4AF" fillOpacity="0.7"/>
              <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" fill="#FDA4AF" fillOpacity="0.7"/>
              <path d="M12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10Z" fill="#FDA4AF" fillOpacity="0.7"/>
              <path d="M12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z" fill="#FDA4AF" fillOpacity="0.7"/>
              <path d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z" fill="#FDA4AF" fillOpacity="0.7"/>
              <path d="M6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12Z" fill="#FDA4AF" fillOpacity="0.7"/>
              <path d="M18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10C18.9 10 18 10.9 18 12Z" fill="#FDA4AF" fillOpacity="0.7"/>
            </svg>
          </div>
          <div className="decorative-flower">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#93C5FD" fillOpacity="0.7"/>
              <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" fill="#93C5FD" fillOpacity="0.7"/>
              <path d="M12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10Z" fill="#93C5FD" fillOpacity="0.7"/>
              <path d="M12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z" fill="#93C5FD" fillOpacity="0.7"/>
              <path d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z" fill="#93C5FD" fillOpacity="0.7"/>
              <path d="M6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12Z" fill="#93C5FD" fillOpacity="0.7"/>
              <path d="M18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10C18.9 10 18 10.9 18 12Z" fill="#93C5FD" fillOpacity="0.7"/>
            </svg>
          </div>
          <div className="decorative-flower">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#C4B5FD" fillOpacity="0.7"/>
              <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" fill="#C4B5FD" fillOpacity="0.7"/>
              <path d="M12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10Z" fill="#C4B5FD" fillOpacity="0.7"/>
              <path d="M12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z" fill="#C4B5FD" fillOpacity="0.7"/>
              <path d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z" fill="#C4B5FD" fillOpacity="0.7"/>
              <path d="M6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12Z" fill="#C4B5FD" fillOpacity="0.7"/>
              <path d="M18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10C18.9 10 18 10.9 18 12Z" fill="#C4B5FD" fillOpacity="0.7"/>
            </svg>
          </div>
          <div className="decorative-flower">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#86EFAC" fillOpacity="0.7"/>
              <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" fill="#86EFAC" fillOpacity="0.7"/>
              <path d="M12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10Z" fill="#86EFAC" fillOpacity="0.7"/>
              <path d="M12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14Z" fill="#86EFAC" fillOpacity="0.7"/>
              <path d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z" fill="#86EFAC" fillOpacity="0.7"/>
              <path d="M6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12Z" fill="#86EFAC" fillOpacity="0.7"/>
              <path d="M18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10C18.9 10 18 10.9 18 12Z" fill="#86EFAC" fillOpacity="0.7"/>
            </svg>
          </div>
          
          {/* Stars */}
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          <div className="decorative-star">★</div>
          
          {/* Circles */}
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
          
          {/* Wavy lines */}
          <div className="decorative-wave"></div>
          <div className="decorative-wave"></div>
        </>
      )}
      
      {/* Dark theme decorations */}
      {isDarkTheme && (
        <>
          {/* Stars for dark theme */}
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          <div className="decorative-star dark">★</div>
          
          {/* Moon */}
          <div className="decorative-moon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.53 15.93C20.55 16.29 19.5 16.5 18.38 16.5C13.97 16.5 10.4 13.16 10.4 9C10.4 7.96 10.61 6.97 10.97 6.07C10.98 6.05 10.99 6.03 11 6C7.59 6.82 5 9.96 5 13.76C5 18.42 8.95 22.25 13.76 22.25C17.45 22.25 20.5 19.82 21.5 16.55C21.53 16.35 21.57 16.14 21.6 15.93C21.6 15.93 21.57 15.93 21.53 15.93Z" fill="#FEF3C7" fillOpacity="0.7"/>
            </svg>
          </div>
          
          {/* Comets */}
          <div className="decorative-comet"></div>
          <div className="decorative-comet"></div>
          <div className="decorative-comet"></div>
        </>
      )}
      
      <div className="w-full max-w-xl px-4 flex flex-col h-screen">
        <header className={`${isDarkTheme ? 'bg-gray-800/80 text-white' : 'bg-white/80'} backdrop-blur-sm shadow-md py-6 w-full rounded-lg mt-4 text-center relative`}>
          <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Mental Wellness Chat</h1>
          <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} mt-2`}>A safe space to talk about your feelings</p>
          
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className={`absolute right-4 top-4 p-2 rounded-full ${isDarkTheme ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-gray-700'}`}
            title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDarkTheme ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </header>
        <main className="w-full py-4 flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
          <Chat isDarkTheme={isDarkTheme} />
        </main>
        <footer className={`py-4 text-center text-sm w-full mb-4 ${isDarkTheme ? 'bg-gray-800/80 text-gray-300' : 'bg-white/80 text-gray-500'} backdrop-blur-sm rounded-lg shadow-md`}>
          <p>Remember, you're not alone. We're here to support you.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
