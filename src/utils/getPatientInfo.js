export const getPatientInfo = (patientId) => {
  return new Promise((resolve, reject) => {
    try {
      const patients = JSON.parse(localStorage.getItem('patients')) || [];
      const patient = patients.find((p) => p.id === patientId);
      setTimeout(() => {
        patient ? resolve(patient) : reject("Patient not found");
      }, 100);
    } catch (err) {
      reject("Failed to parse patient data");
    }
  });
};

export const getAllPatientInfo = () => {
  return JSON.parse(localStorage.getItem('patients')) || [];
};