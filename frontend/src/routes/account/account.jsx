import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaInfoCircle } from 'react-icons/fa';
import MainNavigation from '../../components/mainnavigation';
import MainFooter from '../../components/MainFooter';
import axios from 'axios';
import '../../assets/accountPage.css'; // Reuse the same CSS for styling
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [localPart, setLocalPart] = useState('');
  const [userInfo, setUserInfo] = useState({ fname: '', lname: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/login', { state: { from: '/account' } });
          return;
        }

        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const { email, fname, lname } = response.data;
        const localPartOfEmail = email.split('@')[0]; // Extract the local part of the email
        setLocalPart(localPartOfEmail);
        setUserInfo({ fname, lname, email });
      } catch (error) {
        console.error('Failed to fetch user data. Redirecting to login...', error);
        navigate('/login', { state: { from: '/account' } });
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="carbon-footprint-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainNavigation />

      <main className="carbon-main" style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="display-3 fw-bold mb-3">Welcome</h1>
                <h1 className="display-3 fw-bold mb-3">{localPart} to your account overview</h1>
              </div>
              <div className="col-lg-6 text-center">
                <FaUserCircle className="display-1 pulse-animation" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="content-container">
          <div className="row">
            {/* Account Overview Card */}
            <div className="col-md-6 d-flex">
              <section className="content-card flex-grow-1">
                <div className="card-left">
                  <FaUserCircle className="section-icon" size={60} />
                </div>
                <div className="card-right">
                  <h2 className="section-title">Account Overview</h2>
                  <p className="section-text">
                    This is your account dashboard where you can view and manage your personal information, track your carbon footprint, and explore ways to reduce your environmental impact.
                  </p>
                  <p className="section-text">
                    Use the navigation bar to access different sections of your account, including your carbon footprint calculator and other tools.
                  </p>
                </div>
              </section>
            </div>

            {/* Personal Information Card */}
            <div className="col-md-6 d-flex">
              <section className="content-card flex-grow-1">
                <div className="card-left">
                  <FaInfoCircle className="section-icon" size={60} />
                </div>
                <div className="card-right">
                  <h2 className="section-title">Personal Information</h2>
                  <p className="section-text">
                    <strong>First Name:</strong> {userInfo.fname || 'N/A'}
                  </p>
                  <p className="section-text">
                    <strong>Last Name:</strong> {userInfo.lname || 'N/A'}
                  </p>
                  <p className="section-text">
                    <strong>Email:</strong> {userInfo.email || 'N/A'}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default AccountPage;