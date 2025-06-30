import React, { useEffect, useState } from 'react';

const INCIDENTS_KEY = 'incidents';

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

function getWeekDays(date) {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    setIncidents(JSON.parse(localStorage.getItem(INCIDENTS_KEY)) || []);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = view === 'month' ? getMonthDays(year, month) : getWeekDays(currentDate);

  const handleDayClick = (date) => {
    setSelectedDay(date);
    const dayStr = date.toISOString().slice(0, 10);
    const dayTreatments = incidents.filter(i => i.appointmentDate && i.appointmentDate.slice(0, 10) === dayStr);
    setTreatments(dayTreatments);
  };

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    }
  };
  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    }
  };

  return (
    <div className="p-6 pt-16 min-h-screen bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Calendar View (Admin)</h2>
        <div className="flex gap-2">
          <button className={`px-3 py-1 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setView('month')}>Month</button>
          <button className={`px-3 py-1 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setView('week')}>Week</button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrev} className="px-2 py-1 bg-gray-200 rounded">Prev</button>
        <span className="font-semibold">{view === 'month' ? currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : `Week of ${days[0].toLocaleDateString()}`}</span>
        <button onClick={handleNext} className="px-2 py-1 bg-gray-200 rounded">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-1 bg-white rounded shadow p-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center font-bold text-blue-700">{d}</div>
        ))}
        {view === 'month' && Array(days[0].getDay()).fill(null).map((_, i) => <div key={'empty'+i}></div>)}
        {days.map((date, idx) => {
          const dayStr = date.toISOString().slice(0, 10);
          const hasIncident = incidents.some(i => i.appointmentDate && i.appointmentDate.slice(0, 10) === dayStr);
          return (
            <div
              key={idx}
              className={`h-16 border rounded flex flex-col items-center justify-center cursor-pointer ${hasIncident ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100'}`}
              onClick={() => handleDayClick(date)}
            >
              <span className="font-semibold">{date.getDate()}</span>
              {hasIncident && <span className="text-xs text-blue-600">•</span>}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div className="mt-6 bg-white rounded shadow p-4">
          <div className="font-bold mb-2">Appointments for {selectedDay.toLocaleDateString()}:</div>
          {treatments.length === 0 ? (
            <div className="text-gray-500">No appointments.</div>
          ) : (
            <ul className="space-y-2">
              {treatments.map((t, idx) => (
                <li key={idx} className="border-b pb-2">
                  <div className="font-semibold">{t.title}</div>
                  <div><b>Time:</b> {t.appointmentDate.slice(11, 16)}</div>
                  <div><b>Treatment:</b> {t.treatment || '-'}</div>
                  <div><b>Patient ID:</b> {t.patientId}</div>
                  <div><b>Status:</b> {t.status}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
