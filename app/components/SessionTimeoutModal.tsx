 
import React from 'react';

interface SessionTimeoutModalProps {
  onContinue: () => void;
  onLogout: () => void;
}

export const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({ 
  onContinue, 
  onLogout 
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <section className="w-full max-w-[600px] bg-white rounded-lg shadow-2xl p-8 flex flex-col text-black max-h-[90vh] overflow-y-auto">
        <header>
          <h2
            id="modal-title"
            className="text-[22px] text-black font-normal mb-3"
          >
            Session Timeout
          </h2>
          <p className="text-[15px] leading-relaxed text-black m-0">
            You'll be logged out shortly due to inactivity.
          </p>
        </header>

        <footer className="mt-12 flex items-center justify-between">
          <button
            onClick={onLogout}
              type="button"
              className="text-[#13499F] text-[15px] font-semibold underline decoration-2 underline-offset-2 hover:text-[#0f3a80] focus-visible:outline-none hover:no-underline transition-all focus-visible:ring-2 focus-visible:ring-[#13499F] focus-visible:ring-offset-2 rounded cursor-pointer"
            >
              Log Out
            </button>

          <button
            onClick={onContinue}
            type="button"
                className={`bg-[#13499f] text-white text-[14px] font-semibold border-2 border-[#13499f]-300 px-4 py-3 rounded-lg hover:bg-white hover:text-[#13499f] duration-200 cursor-pointer text-lg focus:outline-none focus:ring-offset-2 focus:ring-[#13499F] disabled:opacity-70 disabled:cursor-not-allowed transition-all`}
          >
            Continue Session
          </button>
        </footer>
      </section>
    </div>

  );
};