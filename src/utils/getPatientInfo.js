import { patients } from "../mockAPI/patients";

export const getPatientInfo = (patientId) => {
  return new Promise((resolve, reject) => {
    try {
      const patient = patients?.find((p) => p.id === patientId);

      setTimeout(() => {
        patient?resolve(patient) : reject("Patient not found");
      }, 100);
    } catch (err) {
      reject("Failed to parse patient data");
    }
  });
};