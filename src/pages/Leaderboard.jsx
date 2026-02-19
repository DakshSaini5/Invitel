import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Flame, ChevronUp } from 'lucide-react';
import { RANK_TIERS } from '../data/mockData';
import './Leaderboard.css';

// Simulated Live Leaderboard Data
const LEADERBOARD_DATA = [
  { id: 1, name: "Arjun S.", points: 15420, rank: RANK_TIERS.AMBASSADOR, trend: "up", avatar: "Arjun" },
  { id: 2, name: "Priya K.", points: 12100, rank: RANK_TIERS.GALAXY, trend: "up", avatar: "Priya" },
  { id: 3, name: "Sarah J.", points: 9850, rank: RANK_TIERS.GALAXY, trend: "same", avatar: "Sarah" },
  { id: 4, name: "Leo V.", points: 7400, rank: RANK_TIERS.SUPERNOVA, trend: "up", avatar: "Leo" },
  { id: 5, name: "You (The North Star)", points: 2450, rank: RANK_TIERS.SUPERNOVA, trend: "up", avatar: "You", isCurrentUser: true },
  { id: 6, name: "Rahul M.", points: 1200, rank: RANK_TIERS.NOVA, trend: "down", avatar: "Rahul" },
  { id: 7, name: "Nina W.", points: 850, rank: RANK_TIERS.NOVA, trend: "up", avatar: "Nina" },
];

const Leaderboard = () => {
  const topThree = LEADERBOARD_DATA.slice(0, 3);
  const restOfBoard = LEADERBOARD_DATA.slice(3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div className="leaderboard-container">
      {/* Ambient Background Glows for that "Pretty" aesthetic */}
      <div className="ambient-glow glow-blue"></div>
      <div className="ambient-glow glow-purple"></div>

      {/* Header Section */}
      <motion.div 
        className="leaderboard-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="neo-title">
          GLOBAL <span className="gradient-text">RANKINGS</span>
        </h1>
        <p className="subtitle">The top impact drivers shaping the universe.</p>
      </motion.div>

      {/* Top 3 Podium Section */}
      <div className="podium-container">
        {topThree.map((user, index) => (
          <motion.div 
            key={user.id}
            className={`podium-card rank-${index + 1}`}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, type: "spring", bounce: 0.4 }}
            style={{ 
              '--rank-color': user.rank.color,
              boxShadow: `0 20px 40px -10px ${user.rank.color}40` 
            }}
          >
            <div className="podium-badge" style={{ background: `linear-gradient(135deg, ${user.rank.color}, #ffffff)` }}>
              {index === 0 ? <Crown size={24} color="#000" /> : 
               index === 1 ? <Medal size={20} color="#000" /> : 
               <Trophy size={18} color="#000" />}
            </div>
            
            <div className="avatar-wrapper" style={{ background: `linear-gradient(135deg, ${user.rank.color}, transparent)` }}>
              <img 
                className="podium-avatar" 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} 
                alt={user.name} 
              />
            </div>
            
            <h3>{user.name}</h3>
            <div className="tier-tag" style={{ color: user.rank.color, background: `${user.rank.color}15` }}>
              {user.rank.name}
            </div>
            <div className="points-display">
              <Flame size={16} color={user.rank.color} />
              <span>{user.points.toLocaleString()} pts</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rest of the Leaderboard (List) */}
      <motion.div 
        className="leaderboard-list"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {restOfBoard.map((user, index) => (
          <motion.div 
            key={user.id} 
            variants={itemVariants}
            className={`list-row ${user.isCurrentUser ? 'current-user-row' : ''}`}
            whileHover={{ scale: 1.015, x: 8 }}
            style={{ '--hover-color': user.rank.color }}
          >
            <div className="row-rank">#{index + 4}</div>
            
            <div className="row-user-info">
              <img 
                className="row-avatar" 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} 
                alt={user.name} 
                style={{ border: `2px solid ${user.rank.color}50` }}
              />
              <div className="row-name">
                <h4>{user.name}</h4>
                <span className="row-tier" style={{ color: user.rank.color }}>
                  {user.rank.name}
                </span>
              </div>
            </div>

            <div className="row-stats">
              <div className="trend-indicator">
                {user.trend === 'up' && <ChevronUp size={18} color="#10b981" />}
              </div>
              <div className="row-points">
                <strong>{user.points.toLocaleString()}</strong> <span className="pts-label">pts</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Leaderboard;