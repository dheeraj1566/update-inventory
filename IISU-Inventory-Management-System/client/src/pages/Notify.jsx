import React from 'react'
import { ToastContainer, toast } from 'react-toastify';




// Removed invalid function declaration
    const notify = () => {
      toast('This is a simple toast message!');
    };

function Notify() {
  return (
    <div>
         <button className="bg-amber-600 text-amber-50" onClick={notify}>Show Toast</button>
      <ToastContainer />

    </div>
  )
}

export default Notify
