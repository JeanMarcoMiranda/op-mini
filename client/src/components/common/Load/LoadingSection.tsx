import React from 'react';

const LoadingSectionComponent = () => {
  return (
    <div className="px-4 lg:px-10 py-5 mt-3 mb-6">
      <div className="w-full h-full top-0 left-0 block bg-white opacity-75">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto relative w-0 h-0" style={{ top: "50%" }}>
          <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      </div>
    </div>
  )
}

export default LoadingSectionComponent;
//flex-auto <-- primer div
