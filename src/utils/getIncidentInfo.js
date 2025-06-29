import { incidents } from "../mockAPI/incidents";

export const getIncidentInfo = (patientId) => {
  return new Promise((resolve, reject) => {
    try {
      const patient = incidents?.filter((p) => p.patientId === patientId);

      setTimeout(() => {
        patient?resolve(patient) : reject("Patient not found");
      }, 100);
    } catch (err) {
      reject("Failed to parse patient data");
    }
  });
};