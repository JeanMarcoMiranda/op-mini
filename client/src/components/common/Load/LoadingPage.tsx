import React from 'react';

const LoadingPageComponent = () => {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75">
      <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: "50%" }}>
        <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-green-500"  fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
    </div>
  )
}

export default LoadingPageComponent;

