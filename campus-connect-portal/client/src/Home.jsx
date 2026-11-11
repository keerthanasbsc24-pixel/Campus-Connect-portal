
import React, { useEffect, useState } from 'react';

const API_URL = 'https://campus-connect-portal-4tpx.onrender.com/clubs';

export default function Home({ onLogin, onRegister, onStudent }) {
  const [clubs, setClubs] = useState([]);
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');

  // GET - Fetch all clubs
  const fetchClubs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Unable to fetch clubs');

      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // POST - Add a new club
  const addClub = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clubName,
          description: clubDescription
        })
      });

      if (!response.ok) throw new Error('Unable to add club');

      setClubName('');
      setClubDescription('');
      await fetchClubs();

      alert('Club added successfully!');
    } catch (error) {
      alert('Unable to add club');
      console.error(error);
    }
  };

  // GET - View one club
  const viewClub = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Club not found');

      const club = await response.json();
      alert(`Club Name: ${club.name}\nDescription: ${club.description}`);
    } catch (error) {
      alert('Unable to view club');
    }
  };

  // PUT - Edit a club
  const editClub = async (club) => {
    const name = prompt('Enter new club name:', club.name);
    if (name === null) return;

    const description = prompt(
      'Enter new club description:',
      club.description
    );
    if (description === null) return;

    if (!name.trim() || !description.trim()) {
      alert('Name and description are required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${club._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });

      if (!response.ok) throw new Error('Unable to update club');

      await fetchClubs();
      alert('Club updated successfully!');
    } catch (error) {
      alert('Unable to update club');
    }
  };

  // DELETE - Remove a club
  const deleteClub = async (id) => {
    if (!window.confirm('Are you sure you want to delete this club?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Unable to delete club');

      await fetchClubs();
      alert('Club deleted successfully!');
    } catch (error) {
      alert('Unable to delete club');
    }
  };

  return (
    <div className="home-page">

      <header className="top-header">
        <div className="rv-logo">
          <span className="rv-circle">RV</span>
          <div>
            <b>RV UNIVERSITY®</b>
            <small>School of Computer Science & Engineering</small>
          </div>
        </div>

        <div className="header-buttons">
          <button onClick={onLogin}>Login</button>
          <button onClick={onRegister}>Register</button>
        </div>
      </header>

      <section className="hero">
        <span className="course-label">
          CS3301 - FULL STACK DEVELOPMENT
        </span>

        <h1>CAMPUS CONNECT PORTAL</h1>

        <p>
          Connecting Students, Faculty, and Administrators on a Single Digital
          <br /> Platform.
        </p>

        <button onClick={onStudent}>
          Explore User Portals →
        </button>
      </section>

      <section className="highlights">
        <h2>Campus Life & Portal Highlights</h2>
        <p>
          Experience academic management simplified through modern technology.
        </p>

        <div className="campus-carousel">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNf9ODT13TLTfxZSmFUFu2JvYioZkW0kyBHhKKk8XutQ&s=10"
            alt="RV University Campus"
          />

          <button className="arrow left" aria-label="Previous image">‹</button>
          <button className="arrow right" aria-label="Next image">›</button>
        </div>
      </section>

      {/* EXPLORE COLLEGE CLUBS */}
      <section className="clubs-section">

        <h2>Explore College Clubs</h2>
        <p>Discover different clubs and connect with your interests.</p>

        <div className="clubs-container">

          {clubs.map((club) => (
            <div className="club-card" key={club._id}>

              <h3>{club.name}</h3>
              <p>{club.description}</p>

              <div className="club-buttons">
                <button
                  className="view-btn"
                  onClick={() => viewClub(club._id)}
                >
                  View
                </button>

                <button
                  className="edit-btn"
                  onClick={() => editClub(club)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteClub(club._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

        {/* ADD CLUB FORM */}
        <form className="add-club-form" onSubmit={addClub}>

          <h3>Add a New Club</h3>

          <div className="add-club-fields">
            <input
              type="text"
              placeholder="Enter club name"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Enter club description"
              value={clubDescription}
              onChange={(e) => setClubDescription(e.target.value)}
              required
            />

            <button type="submit">Add Club</button>
          </div>

        </form>

      </section>

      <section className="portal-section">
        <h3>Choose Your Portal View</h3>

        <div className="portal-cards">

          <div className="portal-card student">
            <h4>🎓 Student Portal</h4>
            <p>• View Notices & Events</p>
            <p>• Submit Assignments</p>
            <p>• Track Attendance</p>
            <p>• Update Profile</p>
            <button onClick={onStudent}>Access Student Portal</button>
          </div>

          <div className="portal-card faculty">
            <h4>👨‍🏫 Faculty Portal</h4>
            <p>• Post Notices & Events</p>
            <p>• Create Assignments</p>
            <p>• Mark Attendance</p>
            <p>• View Student Progress</p>
            <button onClick={onLogin}>Access Faculty Portal</button>
          </div>

          <div className="portal-card admin">
            <h4>👨‍💼 Admin Portal</h4>
            <p>• Manage Users</p>
            <p>• Manage Notices & Events</p>
            <p>• View System Reports</p>
            <button onClick={onLogin}>Access Admin Portal</button>
          </div>

        </div>
      </section>

    </div>
  );
}
