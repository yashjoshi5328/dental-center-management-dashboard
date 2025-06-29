import React, { useEffect, useState } from 'react';
import { PROFILE_URL, USER_KEY } from '../../utils/constants';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getPatientInfo } from '../../utils/getPatientInfo';
import { getIncidentInfo } from '../../utils/getIncidentInfo';
import retrieveAppointmentAndHistory from '../../utils/retrieveAppointmentAndHistory';
import HistoryCard from './HistoryCard';
import AppointmentCard from './AppointmentCard';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');
  const [incidentData, setIncidentData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const data = getUserFromLocalStorage(USER_KEY);
    const patientC = data;

    getPatientInfo(patientC.patientId)
      .then((data) => setPatient({ ...data, email: patientC.email }))
      .catch((err) => setError(err.message));

    getIncidentInfo(patientC.patientId)
      .then((data) => setIncidentData(data))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const [scheduledAppointments, completedHistory] = retrieveAppointmentAndHistory(incidentData);
    setAppointmentData(scheduledAppointments);
    setHistoryData(completedHistory);
  }, [incidentData]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!patient) return <p>Loading patient data...</p>;

  return (
    <div className=" bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff] font-mono min-h-screen pt-16 px-4">
      {/* Patient Info */}
      <div className="bg-gradient-to-br from-[#fffafb] via-[#fff0f5] to-[#ffffff]
      flex flex-col justify-center items-center py-4 shadow-2xl rounded-2xl mb-6">
        <img className="h-20 w-20" src={PROFILE_URL} alt="profile" />
        <p className="font-bold text-lg p-1">{patient.name}</p>
        <p className="p-1">
          <b>DOB:</b> {patient.dob}
        </p>
        <p className="p-1">
          <b>Contact:</b> {patient.contact} | {patient.email}
        </p>
        <p className="p-1">
          <b>Health Summary:</b> {patient.healthInfo}
        </p>
      </div>

      <div
        className='md:flex md:justify-between md:h-110'
      >
      {/* Appointments */}
      <div className="bg-gradient-to-br from-[rgba(255,240,245,0.6)] via-[rgba(255,250,250,0.4)] to-[rgba(255,255,255,0.2)]
 p-4 rounded-2xl shadow-2xl mb-6 md:mb-0 md:w-6/12">
        <h2 className="font-bold text-2xl mb-2">Appointments</h2>
        <div className="p-4 mt-2 rounded-2xl max-h-36 
        md:max-h-90
        overflow-y-auto space-y-2">
          {appointmentData.length > 0 ? (
            appointmentData.map((e) => (
              <AppointmentCard key={e.id} data={e} />
            ))
          ) : (
            <p className="text-center">No Upcoming Appointments</p>
          )}
        </div>
      </div>

      {/* History */}
      <div className="bg-gradient-to-br from-[rgba(255,240,245,0.6)] via-[rgba(255,250,250,0.4)] to-[rgba(255,255,255,0.2)]
 p-4 pb-6 shadow-2xl rounded-2xl md:w-6/12">
        <h2 className="font-bold text-2xl mb-2">History</h2>
        <div
          className="p-4 mt-2 rounded-2xl max-h-60 md:max-h-90 overflow-y-auto space-y-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#94a3b8 transparent',
          }}
        >
          {historyData.length > 0 ? (
            historyData.map((e) => <HistoryCard key={e.id} data={e} />)
          ) : (
            <p className="text-center">No Records</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
