import React, { useState, useEffect } from 'react';
import { 
  Shield, Mail, Calendar, MapPin, Award, Zap, 
  LogOut, Settings, Star, FileText, TrendingUp, Share2, X, Download, Trophy, 
  Archive, Ticket, ExternalLink, QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Profile.css';

// --- SUB-COMPONENT: MILESTONE SHARE CARD ---
const MilestoneCard = ({ isOpen, onClose, user, rank }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="share-card-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="share-card-inner" style={{ backgroundColor: rank.color }}>
            <div className="share-card-content">
              <button className="close-share" onClick={onClose}><X size={20}/></button>
              <div className="share-header">
                <span className="brand-tag">INVITEL<span>.IO</span></span>
                <Trophy size={24} />
              </div>
              
              <div className="share-body">
                <div className="share-avatar-ring">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
                </div>
                <h2 className="share-name">{user.name.toUpperCase()}</h2>
                <div className="share-rank-badge">
                  <Star size={14} fill="#fff" />
                  <span>OFFICIAL {rank.name}</span>
                </div>
                <p className="share-stat-line">
                  Generating <b>{rank.multi}x</b> impact and saved <b>₹{(user.friendsInvited * 450).toLocaleString()}</b> in NGO ad-spend.
                </p>
              </div>

              <div className="share-footer">
                <div className="qr-sim">
                  <div className="qr-box">
                    <QrCode size={34} color="#000" />
                  </div>
                  <span>SCAN TO JOIN</span>
                </div>
                <div className="share-url">invite.io/{user.referralCode}</div>
              </div>
            </div>
          </div>
          
          <div className="share-actions">
            <button className="action-btn download" onClick={() => window.print()}>
              <Download size={18} /> SAVE AS JPG
            </button>
            <button className="action-btn social">
              <Share2 size={18} /> POST TO STORY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- MAIN PROFILE COMPONENT ---
const Profile = () => {
  const [showShareCard, setShowShareCard] = useState(false);
  const [user, setUser] = useState({
    name: "MARCUS V.",
    email: "marcus.v@hero.io",
    friendsInvited: 8, 
    totalDonations: 12500,
    joinedDate: "JAN 2026",
    location: "Mumbai, IN",
    referralCode: "MARC-26"
  });

  // Simulated Inventory from Redemptions (Normally fetched from DB)
  const unlockedItems = [
    { 
      id: 101, title: "LinkedIn Impact Certificate", type: "certificate", 
      date: "FEB 2026", color: "#60a5fa", icon: <Award size={24}/> 
    },
    { 
      id: 102, title: "VIP Event Pass", type: "qr", 
      date: "FEB 2026", color: "#93c5fd", icon: <Ticket size={24}/> 
    },
    { 
      id: 103, title: "Starbucks Voucher", type: "qr", 
      date: "JAN 2026", color: "#fde047", icon: <QrCode size={24}/> 
    }
  ];

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUser(prev => ({ ...prev, ...JSON.parse(savedProfile) }));
    }
  }, []);

  const getRankData = (friends) => {
    if (friends >= 20) return { name: "LEGEND", color: "#FFD600", multi: 2.5, perk: "Physical Metal Card", icon: <Star size={16}/> };
    if (friends >= 10) return { name: "GUARDIAN", color: "#22C55E", multi: 2.0, perk: "Early Mission Access", icon: <Award size={16}/> };
    if (friends >= 5) return { name: "CATALYST", color: "#A855F7", multi: 1.5, perk: "5% Partner Discount", icon: <Zap size={16}/> };
    return { name: "SEED", color: "#EC4899", multi: 1.0, perk: "Digital Badge", icon: <TrendingUp size={16}/> };
  };

  const rank = getRankData(user.friendsInvited);
  const adSpendSaved = user.friendsInvited * 450;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        
        {/* LEFT COLUMN: HERO ID CARD */}
        <div className="profile-id-card" style={{ borderColor: rank.color }}>
          <div className="id-photo-wrapper" style={{ backgroundColor: rank.color }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User Avatar" />
            <div className="status-dot"></div>
          </div>
          <h2 className="user-display-name">{user.name}</h2>
          
          <div className="rank-display-pill" style={{ backgroundColor: rank.color }}>
            {rank.icon} <span>{rank.name} RANK</span>
          </div>
          
          <div className="id-stats-row">
            <div className="id-stat">
              <label>MULTIPLIER</label>
              <p>{rank.multi}x</p>
            </div>
            <div className="id-stat">
              <label>LEVEL</label>
              <p>24</p>
            </div>
          </div>

          <div className="perk-highlight">
            <label>ACTIVE PERK</label>
            <p>{rank.perk}</p>
          </div>

          <div className="profile-actions">
            <button className="share-trigger-btn" onClick={() => setShowShareCard(true)}>
              <Share2 size={20} />
              <span>GENERATE SHARE CARD</span>
            </button>

            <button className="terminate-btn">
              <LogOut size={18}/>
              <span>TERMINATE SESSION</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: RECORDS & SETTINGS */}
        <div className="profile-data-column">
          
          {/* 1. CAREER RECORDS */}
          <div className="data-card impact-card-bg">
            <h3 className="card-title"><Award size={20}/> CAREER RECORDS</h3>
            <div className="records-grid">
              <div className="record-box">
                <Zap size={24} color="#A855F7" />
                <h4>₹{user.totalDonations.toLocaleString()}</h4>
                <p>Total Contribution</p>
              </div>
              <div className="record-box">
                <TrendingUp size={24} color="#22C55E" />
                <h4>+₹{adSpendSaved.toLocaleString()}</h4>
                <p>Bonus Revenue (Ad-Savings)</p>
              </div>
              <div className="record-box">
                <FileText size={24} color="#FFD600" />
                <h4>{Math.floor(user.totalDonations / 500)}</h4>
                <p>Verified Receipts</p>
              </div>
              <div className="record-box">
                <Shield size={24} color="#EC4899" />
                <h4>100%</h4>
                <p>Trust Score</p>
              </div>
            </div>
          </div>

          {/* 2. THE VAULT (NEW INVENTORY SECTION) */}
          <div className="data-card vault-card-bg">
            <h3 className="card-title"><Archive size={20}/> SECURE VAULT</h3>
            <p className="vault-subtitle">Your claimed rewards and official credentials.</p>
            
            <div className="vault-grid">
              {unlockedItems.map((item) => (
                <div key={item.id} className="vault-item" style={{ '--item-color': item.color }}>
                  <div className="vault-item-icon" style={{ backgroundColor: item.color }}>
                    {item.icon}
                  </div>
                  <div className="vault-item-details">
                    <h4>{item.title}</h4>
                    <span>CLAIMED: {item.date}</span>
                  </div>
                  <button className="vault-action-btn" style={{ backgroundColor: item.type === 'certificate' ? '#000' : '#fff', color: item.type === 'certificate' ? '#fff' : '#000' }}>
                    {item.type === 'certificate' ? <ExternalLink size={18}/> : <QrCode size={18}/>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. ACCOUNT SECURITY */}
          <div className="data-card shadow-card">
            <h3 className="card-title"><Shield size={20}/> ACCOUNT SECURITY</h3>
            <div className="info-list">
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <label>EMAIL ADDRESS</label>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="info-item">
                <Calendar size={18} />
                <div>
                  <label>MEMBER SINCE</label>
                  <p>{user.joinedDate}</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <label>REGION</label>
                  <p>{user.location}</p>
                </div>
              </div>
            </div>
          </div>

          <button className="settings-btn"><Settings size={18}/> EDIT PROFILE SETTINGS</button>
        </div>
      </div>

      <MilestoneCard 
        isOpen={showShareCard} 
        onClose={() => setShowShareCard(false)} 
        user={user} 
        rank={rank} 
      />
    </div>
  );
};

export default Profile;