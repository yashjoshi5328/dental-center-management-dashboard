// Import constants first
import { USER_KEY } from "../../utils/constants";
// Import utils
import { getAllPatientInfo, getPatientInfo } from "../../utils/getPatientInfo";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllincidentInfo, getIncidentInfo } from "../../utils/getIncidentInfo";
import retrieveAppointmentAndHistory from "../../utils/retrieveAppointmentAndHistory";
import getTotalRevenue from "../../utils/getTotalRevenue";
// Import components
import React, { useEffect, useState } from "react";
import AppointmentCard from "../globalComponent/AppointmentCard";
import ModalCard from "../globalComponent/ModalCard";

const AdminDashboard = () => {
  // State declarations
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [incidentData, setIncidentData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [modal, setModel] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);

  // Fetch patient and incident data on mount
  useEffect(() => {
    const data = getUserFromLocalStorage(USER_KEY);
    setPatient(getAllPatientInfo());
    setIncidentData(getAllincidentInfo());
  }, []);

  // Derive appointments and history from incident data
  useEffect(() => {
    const [scheduledAppointments, completedHistory] = retrieveAppointmentAndHistory(incidentData);
    setAppointmentData(scheduledAppointments);
    setHistoryData(completedHistory);
  }, [incidentData]);

  // Modal handler
  const handleModal = (e) => {
    // Find patient name for this appointment
    let patientName = '';
    if (e.patientId) {
      const patient = getAllPatientInfo().find(p => p.id === e.patientId);
      patientName = patient ? patient.name : '';
    }
    setModel({ ...e, patientName });
    setViewModal(true);
  };

  return (
    <div className="bg-amber-200 h-screen pt-16 p-2 font-mono bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff]">
      <div className="text-2xl p-2 shadow-2xl mb-2 border-b-1 border-b-gray-300">Welcome Admin!</div>
      <div className="flex justify-evenly gap-1">
        <div className="shadow-2xl bg-gradient-to-br from-amber-200 via-white to-blue-200 rounded-2xl p-2 flex-1 flex flex-col items-center justify-center">
          <p className="text-sm wrap-anywhere text-center">Upcoming Appoinments</p>
          <p className="text-2xl text-center">{appointmentData.length.toString().padStart(2, '0')}</p>
        </div>
        <div className="shadow-2xl bg-gradient-to-br from-amber-200 via-white to-blue-200 rounded-2xl p-2 flex-1 flex flex-col items-center justify-center">
          <p className="text-sm wrap-anywhere text-center">Total Revenue</p>
          <p className="text-2xl text-center">{getTotalRevenue(historyData)}₹</p>
        </div>
        <div className="shadow-2xl bg-gradient-to-br from-amber-200 via-white to-blue-200 rounded-2xl p-2 flex-1 flex flex-col items-center justify-center">
          <p className="text-sm wrap-anywhere text-center">Completed Treatments</p>
          <p className="text-2xl text-center">{historyData.length.toString().padStart(2, '0')}</p>
        </div>
      </div>
      <div className="mt-1 pt-2">
        <p className="text-xl font-extrabold">Upcoming Appoinments</p>
        <div className="p-4 mt-2 rounded-2xl md:max-h-90 space-y-2">
          {appointmentData.length > 0 ? (
            appointmentData.slice(0, 10).map((e) => (
              <AppointmentCard key={e.id} data={e} onClick={() => handleModal(e)} />
            ))
          ) : (
            <p className="text-center">No Upcoming Appointments</p>
          )}
        </div>
        {viewModal && <ModalCard data={modal} onClose={() => setViewModal(false)} showPatientName={true} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
