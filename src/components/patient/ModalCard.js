import React from 'react';
import { formatDateTime } from '../../utils/format';

const ModalCard = ({ data, onClose }) => {
  const [date, time] = formatDateTime(data.appointmentDate).split('at');

  const handleUnfocusClose=(e)=>{
    if(e.target.id==="close-area"){
      onClose();
    }
  }

  return (
    <div
      id="close-area"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
      onClick={handleUnfocusClose}
    >
      <div
        className="relative w-[90%] min-w-fit max-w-md p-4 rounded-2xl shadow-2xl 
                   bg-gradient-to-tr from-[#fdfbfb] via-[#e6ecff] to-[#ffe6f0]"
      >
        <button
          className="absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>

        <div className="px-2 space-y-2">
          <p className="font-extrabold text-2xl text-center">{data.title}</p>

          <p className="text-lg">
            <b>Scheduled On:</b> {date}
          </p>

          <p className="text-lg">
            <b>Timing:</b> {time}
          </p>

          <p className="text-lg">
            <b>Description:</b> {data.description}
          </p>

          <p className="text-lg">
            <b>Note:</b> {data.comments}
          </p>
          <p className="text-lg">
            <b>Cost:</b> {data.cost}₹
          </p>
          {data.files.length?<div className="text-lg">
            <b>Files:</b> {data.files.map((x,i)=>{
                return (<div key={i} className='inline'>
                          <a href={"https://"+x.url} className='underline' target='_blank'>{x.name}</a>{i!==data.files.length-1 && " , "}
                        </div>);
            })}
          </div>:<></>}
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
