import React, { useEffect, useState } from 'react';

const INCIDENTS_KEY = 'incidents';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: '',
    patientId: '',
    treatment: '',
    nextAppointmentDate: '',
    files: []
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIncidents(JSON.parse(localStorage.getItem(INCIDENTS_KEY)) || []);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'files') {
      // Convert files to base64 strings for storage
      const fileReaders = Array.from(files).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve({ name: file.name, data: ev.target.result });
          reader.readAsDataURL(file);
        });
      });
      Promise.all(fileReaders).then(fileObjs => {
        setForm(prev => ({ ...prev, files: [...(prev.files || []), ...fileObjs] }));
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = () => {
    setForm({ title: '', description: '', comments: '', appointmentDate: '', cost: '', status: '', patientId: '' });
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (incident) => {
    setForm({
      title: incident.title || '',
      description: incident.description || '',
      comments: incident.comments || '',
      appointmentDate: incident.appointmentDate || '',
      cost: incident.cost !== undefined ? incident.cost : '',
      status: incident.status || '',
      patientId: incident.patientId || '',
      treatment: incident.treatment || '',
      nextAppointmentDate: incident.nextAppointmentDate || '',
      files: incident.files || []
    });
    setEditing(incident.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = incidents.filter((i) => i.id !== id);
    setIncidents(updated);
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(updated));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let updated;
    // Format appointmentDate and nextAppointmentDate
    const formattedDate = form.appointmentDate ? form.appointmentDate.slice(0, 16) : '';
    const formattedNextDate = form.nextAppointmentDate ? form.nextAppointmentDate.slice(0, 16) : '';
    const formWithNumberCost = {
      ...form,
      cost: form.cost ? Number(form.cost) : '',
      appointmentDate: formattedDate,
      nextAppointmentDate: formattedNextDate,
    };
    if (editing) {
      updated = incidents.map((i) => (i.id === editing ? { ...formWithNumberCost, id: editing } : i));
    } else {
      const newId = 'i-' + Math.random().toString(36).substr(2, 9);
      updated = [...incidents, { ...formWithNumberCost, id: newId }];
    }
    setIncidents(updated);
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(updated));
    setShowForm(false);
    setEditing(null);
  };

  // Helper to open file in new tab
  const openFileInNewTab = (file) => {
    const win = window.open();
    if (!win) return;
    if (file.data && file.data.startsWith('data:image')) {
      win.document.write(`<html><head><title>${file.name}</title></head><body style='margin:0'><img src='${file.data}' alt='${file.name}' style='max-width:100vw;max-height:100vh;display:block;margin:auto;'/></body></html>`);
    } else if (file.data && file.data.startsWith('data:application/pdf')) {
      win.document.write(`<html><head><title>${file.name}</title></head><body style='margin:0'><embed src='${file.data}' type='application/pdf' width='100%' height='100%' style='min-height:100vh;'/></body></html>`);
    } else {
      win.document.write(`<html><head><title>${file.name}</title></head><body><pre>Cannot preview this file type.</pre></body></html>`);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Incidents Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-br from-pink-100 via-white to-blue-200 text-black px-4 py-2 rounded shadow hover:brightness-95"
          onClick={handleAdd}
        >
          Add Incident
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-6 bg-white rounded-xl shadow-lg p-4 max-w-md mx-auto flex flex-col gap-3 border border-gray-200">
          <input className="border rounded px-3 py-2" name="title" value={form.title} onChange={handleInputChange} placeholder="Title" required />
          <input className="border rounded px-3 py-2" name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required />
          <input className="border rounded px-3 py-2" name="comments" value={form.comments} onChange={handleInputChange} placeholder="Comments" />
          <input
            className="border rounded px-3 py-2"
            type="datetime-local"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleInputChange}
            placeholder="Appointment Date"
            required
          />
          <input className="border rounded px-3 py-2" name="patientId" value={form.patientId} onChange={handleInputChange} placeholder="Patient ID" required />
          <input className="border rounded px-3 py-2" name="status" value={form.status} onChange={handleInputChange} placeholder="Status (Scheduled/Completed)" required />
          {/* Show these fields only if status is not Scheduled */}
          {form.status && form.status.toLowerCase() !== 'scheduled' && (
            <>
              <input className="border rounded px-3 py-2" name="cost" value={form.cost} onChange={handleInputChange} placeholder="Cost" required />
              <input className="border rounded px-3 py-2" name="treatment" value={form.treatment} onChange={handleInputChange} placeholder="Treatment" required />
              <input
                className="border rounded px-3 py-2"
                type="datetime-local"
                name="nextAppointmentDate"
                value={form.nextAppointmentDate}
                onChange={handleInputChange}
                placeholder="Next Appointment Date"
              />
              <input
                className="border rounded px-3 py-2"
                name="files"
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleInputChange}
              />
              {form.files && form.files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.files.map((file, idx) => (
                    <div key={idx} className="text-xs text-gray-600 border p-1 rounded">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          <div className="flex gap-2 justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editing ? 'Update' : 'Add'}</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incidents.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No incidents found.</div>
        ) : (
          incidents.map((i) => (
            <div key={i.id} className="bg-gradient-to-br from-pink-100 via-white to-blue-200 shadow-lg rounded-xl p-4 flex flex-col gap-2 border border-gray-200">
              <div className="font-bold text-lg">{i.title}</div>
              <div><b>Description:</b> {i.description}</div>
              <div><b>Comments:</b> {i.comments}</div>
              <div><b>Appointment Date:</b> {i.appointmentDate}</div>
              <div><b>Status:</b> {i.status}</div>
              <div><b>Patient ID:</b> {i.patientId}</div>
              {i.status && i.status.toLowerCase() !== 'scheduled' && (
                <>
                  <div><b>Cost:</b> {i.cost}₹</div>
                  <div><b>Treatment:</b> {i.treatment}</div>
                  <div><b>Next Appointment:</b> {i.nextAppointmentDate}</div>
                  {i.files && i.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {i.files.map((file, idx) => (
                        <div key={idx} className="border rounded p-1 text-xs cursor-pointer text-blue-700 hover:underline" onClick={() => openFileInNewTab(file)}>
                          {file.name}
                          {file.data && file.data.startsWith('data:image') && (
                            <img src={file.data} alt={file.name} className="w-12 h-12 object-cover inline ml-2" />
                          )}
                          {file.data && file.data.startsWith('data:application/pdf') && (
                            <span className="ml-2">[PDF]</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="flex gap-2 mt-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(i)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(i.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Incidents;
