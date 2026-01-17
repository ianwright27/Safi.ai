import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function ToastDemo () {
    const [success, setSuccess] = useState(false);

    function checkSuccess(){
        setSuccess(true); 
        notify(success); 
    }

    const notify = (success) =>{
        if (success) {
            toast.success('Data submitted successfully!');
        } else {
            toast.error('Data failed to submit')
        }
    }

  return (
    <div>
      <button onClick={checkSuccess}>Make me a toast</button>
      <Toaster />
    </div>
  );
};