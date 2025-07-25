import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    console.log('📤 Sending feedback:', formData);

    try {
      const res = await axios.post('http://localhost:5000/api/feedback', formData);
      console.log('✅ Server response:', res.data);
      setStatus('✅ Feedback sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('❌ Error sending feedback:', err);
      setStatus('❌ Failed to send feedback. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem' }}>
      <h2>Send Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Send Feedback</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Feedback;
