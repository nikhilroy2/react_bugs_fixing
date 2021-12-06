/* eslint no-return-assign: "off" */
import './_errorBoundary.scss';
import React from 'react';

const CrashPage = () => {
  const urlName = window.location.pathname.split('/')[2];
  const urlNameFormated = urlName[0]?.toUpperCase() + urlName?.slice(1);
  const goBackUrl = `/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}`;

  return (
    <div className="error-boundary">
      <div className="error-boundary__text">Oops! Something went wrong...</div>
      <button onClick={() => (window.location.href = goBackUrl)} className="error-boundary__button">
        Go to
        {' '}
        {urlNameFormated || 'last page'}
      </button>
    </div>
  );
};

export default CrashPage;
