import React, { useEffect, useState } from 'react';
import { getAllPatientInfo } from '../../utils/getPatientInfo.js';

const PATIENTS_KEY = 'patients';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', dob: '', contact: '', healthInfo: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setPatients(getAllPatientInfo());
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ name: '', dob: '', contact: '', healthInfo: '' });
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (patient) => {
    setForm({ name: patient.name, dob: patient.dob, contact: patient.contact, healthInfo: patient.healthInfo, id: patient.id });
    setEditing(patient.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(updated));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editing) {
      updated = patients.map((p) => (p.id === editing ? { ...form, id: editing } : p));
    } else {
      const newId = 'p' + (Math.max(0, ...patients.map(p => parseInt(p.id.replace('p', '')))) + 1);
      updated = [...patients, { ...form, id: newId }];
    }
    setPatients(updated);
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(updated));
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', dob: '', contact: '', healthInfo: '' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', dob: '', contact: '', healthInfo: '' });
  };

  return (
    <div className="p-6 bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Patients Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-br from-amber-200 via-white to-blue-200 text-black px-4 py-2 rounded shadow hover:brightness-95"
          onClick={handleAdd}
        >
          Add Patient
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 max-w-md mx-auto mb-6 bg-white p-4 rounded shadow">
          <input
            className="border rounded px-3 py-2"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />
          <input
            className="border rounded px-3 py-2"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
            placeholder="DOB (YYYY-MM-DD)"
            required
          />
          <input
            className="border rounded px-3 py-2"
            name="contact"
            value={form.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            required
          />
          <input
            className="border rounded px-3 py-2"
            name="healthInfo"
            value={form.healthInfo}
            onChange={handleInputChange}
            placeholder="Health Info"
            required
          />
          <div className="flex gap-2 justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editing ? 'Update' : 'Add'}
            </button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {editing && (
            <div className="text-xs text-gray-500 mt-2">Editing patient ID: {editing}</div>
          )}
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No patients found.</div>
        ) : (
          patients.map((p) => (
            <div key={p.id} className="bg-gradient-to-br from-pink-100 via-white to-blue-200 shadow-lg rounded-xl p-4 flex flex-col gap-2 border border-gray-200">
              <div className="font-bold text-lg">{p.name}</div>
              <div><b>DOB:</b> {p.dob}</div>
              <div><b>Contact:</b> {p.contact}</div>
              <div><b>Health Info:</b> {p.healthInfo}</div>
              <div className="flex gap-2 mt-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(p)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;
