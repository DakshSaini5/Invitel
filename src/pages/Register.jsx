import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserPlus, Link as LinkIcon, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referredBy: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralFound, setReferralFound] = useState(false);

  // 1. Catch the Referral Code from the URL on load
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      setFormData(prev => ({ ...prev, referredBy: refCode }));
      setReferralFound(true);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- MOCK BACKEND LOGIC ---
    setTimeout(() => {
      // 1. Create the new user's profile
      const newUserProfile = {
        name: formData.name,
        email: formData.email,
        friendsInvited: 0,
        totalDonations: 0, // They can donate next
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase(),
        location: "Global Data",
        referralCode: `${formData.name.substring(0, 4).toUpperCase()}-${Math.floor(Math.random() * 90 + 10)}`
      };

      // 2. Simulate saving New User to DB
      localStorage.setItem('userProfile', JSON.stringify(newUserProfile));

      // 3. Simulate rewarding the Referrer (If backend existed)
      if (formData.referredBy) {
        console.log(`[SYSTEM] Alerting DB: Add 500 XP to User with code ${formData.referredBy}`);
        console.log(`[SYSTEM] Alerting DB: Increase ${formData.referredBy}'s friendsInvited by 1`);
        // In a real app, this would be an API call: await api.post('/referrals/claim', { code: formData.referredBy })
      }

      setIsSubmitting(false);
      
      // 4. Push them directly to the Dashboard to see their new empty profile
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="register-page-wrapper">
      {/* Ambient Background Glows */}
      <div className="ambient-glow glow-purple"></div>
      <div className="ambient-glow glow-blue"></div>

      <motion.div 
        className="register-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="register-header">
          <div className="brand-logo">INVITEL<span>.IO</span></div>
          <h1>JOIN THE NETWORK</h1>
          <p>Track your impact. Elevate your rank. Change the world.</p>
        </div>

        {/* Dynamic Referral Banner */}
        {referralFound && (
          <motion.div 
            className="referral-success-banner"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Zap size={20} color="#FFD600" />
            <div>
              <strong>INVITATION ACCEPTED!</strong>
              <p>Code <b>{formData.referredBy}</b> applied. Your inviter will receive 500 Impact XP upon your registration.</p>
            </div>
          </motion.div>
        )}

        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>FULL NAME</label>
            <input 
              type="text" 
              name="name" 
              placeholder="e.g. Sarah Jenkins" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input 
              type="email" 
              name="email" 
              placeholder="sarah@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>SECURE PASSWORD</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group referral-group">
            <label><LinkIcon size={14}/> REFERRAL CODE (OPTIONAL)</label>
            <input 
              type="text" 
              name="referredBy" 
              placeholder="Enter invite code..." 
              value={formData.referredBy}
              onChange={handleChange}
              className={referralFound ? 'locked-input' : ''}
              readOnly={referralFound} // Lock it if it came from the URL
            />
          </div>

          <button type="submit" className="submit-register-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="loading-pulse">INITIALIZING ACCOUNT...</span>
            ) : (
              <>CREATE ACCOUNT <ArrowRight size={18}/></>
            )}
          </button>
        </form>

        <div className="security-badge">
          <ShieldCheck size={14} />
          <span>Your data is encrypted and never sold to third parties.</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;