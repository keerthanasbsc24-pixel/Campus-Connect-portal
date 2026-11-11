

import { useState } from 'react';

export default function StudentPortal({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('notices');

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      subject: 'CS3301 Full Stack',
      title: 'Lab Assignment 2: React State',
      status: 'Pending',
      date: 'Sept 15, 2026'
    },
    {
      id: 2,
      subject: 'CS3302 DBMS',
      title: 'ER Diagram Project Report',
      status: 'Submitted',
      date: 'Sept 01, 2026'
    }
  ]);

  const notices = [
    {
      title: 'Mid-Term Exam Schedule Released',
      department: 'SOCSE',
      date: 'Sept 10, 2026'
    },
    {
      title: 'Hackathon Registration Open',
      department: 'RVU Tech Club',
      date: 'Sept 20, 2026'
    }
  ];

  const submitAssignment = (id) => {
    setAssignments((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: 'Submitted' }
          : item
      )
    );
  };

  const undoAssignment = (id) => {
    setAssignments((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: 'Pending' }
          : item
      )
    );
  };

  return (
    <div className="student-page" id="student-portal-view">

      <div className="student-header">
        <div>
          <h2>👨‍🎓 Student Portal View</h2>
          <p>Welcome, RVU Student</p>
        </div>

        <button
          className="back-campus"
          onClick={onBackToHome}
        >
          ← Back to Main Campus View
        </button>
      </div>

      <div className="student-tabs">
        <button
          className={activeTab === 'notices' ? 'active' : ''}
          onClick={() => setActiveTab('notices')}
        >
          Notices & Events
        </button>

        <button
          className={activeTab === 'assignments' ? 'active' : ''}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>

        <button
          className={activeTab === 'attendance' ? 'active' : ''}
          onClick={() => setActiveTab('attendance')}
        >
          Track Attendance
        </button>

        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      <div className="student-content">

        {activeTab === 'notices' && (
          <>
            <h3>📢 Campus Notices & Events</h3>

            {notices.map((notice, index) => (
              <div className="notice-row" key={index}>
                <div>
                  <h4>{notice.title}</h4>
                  <p>
                    {notice.department} • {notice.date}
                  </p>
                </div>

                <button onClick={() => alert(notice.title)}>
                  View Details
                </button>
              </div>
            ))}
          </>
        )}

        {activeTab === 'assignments' && (
          <>
            <h3>📚 My Assignments</h3>

            {assignments.map((assignment) => (
              <div className="notice-row" key={assignment.id}>
                <div>
                  <h4>{assignment.title}</h4>
                  <p>
                    {assignment.subject} • {assignment.date}
                  </p>
                  <p>
                    Status: <strong>{assignment.status}</strong>
                  </p>
                </div>

                {assignment.status === 'Pending' ? (
                  <button onClick={() => submitAssignment(assignment.id)}>
                    Submit
                  </button>
                ) : (
                  <button onClick={() => undoAssignment(assignment.id)}>
                    Undo
                  </button>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === 'attendance' && (
          <>
            <h3>📊 Track Attendance</h3>

            <div className="attendance-box">
              <h2>85%</h2>
              <p>Overall Attendance</p>
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <h3>👤 Student Profile</h3>

            <div className="profile-box">
              <p><strong>Name:</strong> RVU Student</p>
              <p><strong>Program:</strong> Bsc(Hons) CSE</p>
              <p><strong>University:</strong> RV University</p>
            </div>
          </>
        )}

      </div>

    </div>
  );
}
