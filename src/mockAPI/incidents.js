export const incidents=[
    {
      "id": "i1",
      "patientId": "p1",
      "title": "Toothache",
      "description": "Upper molar pain",
      "comments": "Sensitive to cold",
      "appointmentDate": "2025-07-01T10:00:00",
      "cost": 80,
      "status": "Completed",
      "files": [
        { "name": "invoice.pdf", "url": "base64-invoice1" },
        { "name": "xray.png", "url": "base64-xray1" }
      ]
    },
    {
      "id": "i2",
      "patientId": "p1",
      "title": "Cavity Filling",
      "description": "Small cavity on lower right premolar",
      "comments": "",
      "appointmentDate": "2025-07-15T11:30:00",
      "cost": 120,
      "status": "Pending",
      "files": []
    },
    {
      "id": "i3",
      "patientId": "p2",
      "title": "Gum Infection",
      "description": "Swelling and bleeding in gums",
      "comments": "Diabetic patient, handle carefully",
      "appointmentDate": "2025-07-02T14:00:00",
      "cost": 150,
      "status": "Completed",
      "files": [
        { "name": "gum-report.jpg", "url": "base64-gumreport" }
      ]
    },
    {
      "id": "i4",
      "patientId": "p2",
      "title": "Routine Cleaning",
      "description": "Scheduled dental cleaning",
      "comments": "Recommend every 6 months",
      "appointmentDate": "2025-08-10T10:00:00",
      "cost": 60,
      "status": "Scheduled",
      "files": []
    },
    {
      "id": "i5",
      "patientId": "p3",
      "title": "Wisdom Tooth Extraction",
      "description": "Lower left impacted tooth",
      "comments": "Patient anxious, mild sedation used",
      "appointmentDate": "2025-07-10T09:00:00",
      "cost": 300,
      "status": "Completed",
      "files": [
        { "name": "xray-before.png", "url": "base64-wisdomxray" },
        { "name": "post-op.pdf", "url": "base64-postop" }
      ]
    },
    {
      "id": "i6",
      "patientId": "p3",
      "title": "Braces Consultation",
      "description": "Orthodontic consultation for alignment",
      "comments": "Follow-up in 2 weeks",
      "appointmentDate": "2025-07-22T16:00:00",
      "cost": 100,
      "status": "Pending",
      "files": []
    }
];