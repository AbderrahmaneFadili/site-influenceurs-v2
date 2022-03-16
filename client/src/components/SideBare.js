import React from "react";

const SideBare = () => {
  return (
    <div>
      <h1 className="display-1">SideBare </h1>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>

      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img src="..." className="rounded mr-2" alt="..." />
          <strong className="mr-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
          <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="toast-body">See? Just like this.</div>
      </div>
    </div>
  );
};
export default SideBare;
