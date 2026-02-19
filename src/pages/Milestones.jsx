import React, { useState } from 'react';
import LiquidProgressBar from '../components/LiquidProgressBar';
import { Lock, Unlock, Target, Gift, X, QrCode, Zap, CheckCircle, Award, ExternalLink } from 'lucide-react';
import './Milestones.css';

const Milestones = () => {
  // Set to 2500 so you can test unlocking the high-tier certificate
  const [userXP, setUserXP] = useState(2500); 
  
  const [redeemedItems, setRedeemedItems] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);

  const rewards = [
    {
      id: 1,
      title: "Starbucks Coffee Voucher",
      target: 200,
      color: "#fde047", // Yellow
      desc: "A free coffee to fuel your next networking session.",
      type: "qr"
    },
    {
      id: 2,
      title: "500 Bonus XP Drop",
      target: 500,
      color: "#86efac", // Green
      desc: "Instantly boost your rank with a raw XP injection!",
      type: "points",
      bonusXP: 500
    },
    {
      id: 3,
      title: "VIP Event Pass",
      target: 1000,
      color: "#93c5fd", // Blue
      desc: "Exclusive access to the annual charity gala. Scan at the door.",
      type: "qr"
    },
    {
      id: 4,
      title: "LinkedIn Impact Certificate",
      target: 2000,
      color: "#60a5fa", // LinkedIn Blue-ish
      desc: "A verified credential recognizing your environmental and societal contributions.",
      type: "certificate"
    },
    {
      id: 5,
      title: "Exclusive Impact Hoodie",
      target: 3500,
      color: "#f9a8d4", // Pink
      desc: "Premium physical merchandise shipped directly to you.",
      type: "locked" 
    }
  ];

  const handleRedeemClick = (reward) => setSelectedReward(reward);

  const confirmRedemption = () => {
    if (!selectedReward) return;

    if (selectedReward.type === 'points') {
      setUserXP(prev => prev + selectedReward.bonusXP);
    }

    setRedeemedItems([...redeemedItems, selectedReward.id]);
    setSelectedReward(null); 
  };

  const closeModal = () => setSelectedReward(null);

  return (
    <div className="milestones-wrapper">
      <div className="milestones-header">
        <h1>UNLOCK PROGRESS</h1>
        <p>Track your Impact XP and see how close you are to the next Loot Drop.</p>
        <div className="current-xp-badge">
          <Target size={24} /> YOU HAVE: {userXP} XP
        </div>
      </div>

      <div className="milestones-list">
        {rewards.map((reward) => {
          const isUnlocked = userXP >= reward.target;
          const isRedeemed = redeemedItems.includes(reward.id);
          const xpNeeded = reward.target - userXP;

          return (
            <div key={reward.id} className={`milestone-card ${isUnlocked ? 'unlocked-card' : 'locked-card'} ${isRedeemed ? 'is-redeemed' : ''}`}>
              
              <div className="milestone-status" style={{ backgroundColor: isUnlocked ? reward.color : '#e0e0e0' }}>
                {isUnlocked ? <Unlock size={28} color="#000" /> : <Lock size={28} color="#888" />}
              </div>

              <div className="milestone-content">
                <div className="milestone-text">
                  <h2>{reward.title}</h2>
                  <p>{reward.desc}</p>
                </div>

                <div className="milestone-progress">
                  {isUnlocked ? (
                    isRedeemed ? (
                      <div className="redeemed-alert">
                        <CheckCircle size={20} /> REWARD CLAIMED
                      </div>
                    ) : (
                      <button 
                        className="unlocked-alert redeem-btn" 
                        onClick={() => handleRedeemClick(reward)}
                        style={{ backgroundColor: reward.color }}
                      >
                        <Gift size={20} /> REDEEM REWARD NOW
                      </button>
                    )
                  ) : (
                    <>
                      <div className="xp-missing-alert">
                        <strong>{xpNeeded} XP NEEDED</strong> to unlock this reward.
                      </div>
                      {/* Note: Ensure LiquidProgressBar exists or replace with standard <progress> if needed */}
                      <LiquidProgressBar 
                        progress={userXP} 
                        target={reward.target} 
                        color={reward.color} 
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- REDEMPTION MODAL --- */}
      {selectedReward && (
        <div className="brutalist-modal-overlay" onClick={closeModal}>
          <div className="brutalist-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}><X size={24} /></button>
            
            <h2 className="modal-title">CLAIM REWARD</h2>
            <p className="modal-subtitle">You are about to redeem: <strong>{selectedReward.title}</strong></p>

            <div className="modal-visual-box" style={{ backgroundColor: selectedReward.color }}>
              
              {selectedReward.type === 'qr' ? (
                <div className="qr-wrapper" style={{ background: '#fff', border: '4px solid #000', padding: '15px', borderRadius: '8px' }}>
                  <p style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <QrCode size={18}/> SCAN AT VENUE
                  </p>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=INVITEL_${selectedReward.id}_USER123&color=000000&bgcolor=ffffff`} 
                    alt="Scan to Redeem" 
                    style={{ width: '150px', height: '150px', display: 'block' }}
                  />
                </div>
              ) : selectedReward.type === 'points' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', fontFamily: 'Space Grotesk' }}>
                  <Zap size={48} color="#000" />
                  <h2 style={{ fontSize: '2.5rem', margin: 0, textShadow: '2px 2px 0px #fff' }}>+{selectedReward.bonusXP} XP</h2>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>Added directly to your balance.</p>
                </div>
              ) : selectedReward.type === 'certificate' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', fontFamily: 'Space Grotesk', textAlign: 'center' }}>
                  <Award size={56} color="#000" />
                  <h2 style={{ fontSize: '1.5rem', margin: '10px 0 0 0', textShadow: '2px 2px 0px #fff', textTransform: 'uppercase' }}>
                    Official Credential
                  </h2>
                  <p style={{ fontWeight: 'bold', margin: 0, padding: '0 10px' }}>
                    A verified certificate of your environmental & societal impact.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', fontFamily: 'Space Grotesk' }}>
                  <Gift size={48} color="#000" />
                  <p style={{ fontWeight: 'bold', margin: 0 }}>Physical item. Check email for details.</p>
                </div>
              )}

            </div>

            <button className="confirm-redeem-btn" onClick={confirmRedemption}>
              {selectedReward.type === 'certificate' ? (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  CLAIM & ADD TO LINKEDIN <ExternalLink size={18} />
                </span>
              ) : 'CONFIRM & CLAIM NOW'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Milestones;