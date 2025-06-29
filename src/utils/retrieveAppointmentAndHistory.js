const retrieveAppointmentAndHistory = (incidents = []) => {
  const scheduled = [];
  const completed = [];

  for (const incident of incidents) {
    if (incident.status?.toLowerCase() === 'scheduled') {
      scheduled.push(incident);
    } else if (incident.status?.toLowerCase() === 'completed') {
      completed.push(incident);
    }
  }

  return [scheduled, completed];
};

export default retrieveAppointmentAndHistory;
