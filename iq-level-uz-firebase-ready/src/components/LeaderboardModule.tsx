import React, { useState } from 'react';
import { UserProfile, LeaderboardUser } from '../types';
import { Trophy, Gift, Clock, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LeaderboardModuleProps {
  currentUser: UserProfile;
}

const GENERATED_50_LEADERS: LeaderboardUser[] = [
  { id: 'l-1', name: 'Sherzodbek_Genius', avatar: '👑', city: 'Toshkent', iqScore: 148, duelRating: 1680, rank: 1, weeklyMinutes: 24, weeklyPoints: 92 },
  { id: 'l-2', name: 'Zilola_AI', avatar: '💎', city: 'Samarqand', iqScore: 144, duelRating: 1610, rank: 2, weeklyMinutes: 18, weeklyPoints: 85 },
  { id: 'l-3', name: 'Bekzod_Cyber', avatar: '⚡', city: "Farg'ona", iqScore: 141, duelRating: 1575, rank: 3, weeklyMinutes: 15, weeklyPoints: 78 },
  { id: 'l-4', name: 'Malika_Math', avatar: '🚀', city: 'Buxoro', iqScore: 139, duelRating: 1540, rank: 4, weeklyMinutes: 12, weeklyPoints: 64 },
  { id: 'l-5', name: 'Jasur_Master', avatar: '🧠', city: 'Andijon', iqScore: 136, duelRating: 1490, rank: 5, weeklyMinutes: 9, weeklyPoints: 55 },
  { id: 'l-6', name: 'Dilorom_Logic', avatar: '🎯', city: 'Xorazm', iqScore: 133, duelRating: 1460, rank: 6, weeklyMinutes: 8, weeklyPoints: 48 },
  { id: 'l-7', name: 'Ulugbek_Pro', avatar: '⚡', city: 'Namangan', iqScore: 131, duelRating: 1420, rank: 7, weeklyMinutes: 7, weeklyPoints: 42 },
  { id: 'l-8', name: 'Shahnoza_Star', avatar: '👑', city: 'Qashqadaryo', iqScore: 128, duelRating: 1390, rank: 8, weeklyMinutes: 6, weeklyPoints: 39 },
  { id: 'l-9', name: 'Temur_Invictus', avatar: '🧠', city: 'Navoiy', iqScore: 126, duelRating: 1360, rank: 9, weeklyMinutes: 5, weeklyPoints: 35 },
  { id: 'l-10', name: 'Otabek_Cyber', avatar: '💎', city: 'Jizzax', iqScore: 124, duelRating: 1320, rank: 10, weeklyMinutes: 5, weeklyPoints: 30 },
  { id: 'l-11', name: 'Rayhona_Brain', avatar: '✨', city: 'Toshkent', iqScore: 122, duelRating: 1310, rank: 11, weeklyMinutes: 5, weeklyPoints: 29 },
  { id: 'l-12', name: 'Sanjar_Speed', avatar: '⚡', city: 'Sirdaryo', iqScore: 121, duelRating: 1295, rank: 12, weeklyMinutes: 4, weeklyPoints: 28 },
  { id: 'l-13', name: 'Madina_Math', avatar: '🌸', city: 'Surxondaryo', iqScore: 119, duelRating: 1280, rank: 13, weeklyMinutes: 4, weeklyPoints: 27 },
  { id: 'l-14', name: 'Javohir_Neo', avatar: '🕶️', city: 'Toshkent vil.', iqScore: 118, duelRating: 1270, rank: 14, weeklyMinutes: 4, weeklyPoints: 26 },
  { id: 'l-15', name: 'Nodira_Logic', avatar: '💎', city: 'Qoraqalpog\'iston', iqScore: 117, duelRating: 1260, rank: 15, weeklyMinutes: 4, weeklyPoints: 25 },
  { id: 'l-16', name: 'Bobur_Shah', avatar: '👑', city: 'Andijon', iqScore: 116, duelRating: 1250, rank: 16, weeklyMinutes: 4, weeklyPoints: 24 },
  { id: 'l-17', name: 'Gulnoza_IQ', avatar: '🎯', city: 'Samarqand', iqScore: 115, duelRating: 1240, rank: 17, weeklyMinutes: 3, weeklyPoints: 23 },
  { id: 'l-18', name: 'Akrom_Logic', avatar: '🚀', city: 'Buxoro', iqScore: 114, duelRating: 1230, rank: 18, weeklyMinutes: 3, weeklyPoints: 22 },
  { id: 'l-19', name: 'Kamila_Star', avatar: '⭐', city: 'Toshkent', iqScore: 113, duelRating: 1220, rank: 19, weeklyMinutes: 3, weeklyPoints: 21 },
  { id: 'l-20', name: 'Sardor_Quantum', avatar: '🔮', city: "Farg'ona", iqScore: 112, duelRating: 1210, rank: 20, weeklyMinutes: 3, weeklyPoints: 20 },
  { id: 'l-21', name: 'Dilshod_Mind', avatar: '🧠', city: 'Namangan', iqScore: 111, duelRating: 1200, rank: 21, weeklyMinutes: 3, weeklyPoints: 19 },
  { id: 'l-22', name: 'Feruza_Pro', avatar: '💡', city: 'Navoiy', iqScore: 110, duelRating: 1190, rank: 22, weeklyMinutes: 3, weeklyPoints: 18 },
  { id: 'l-23', name: 'Rustam_Tech', avatar: '💻', city: 'Xorazm', iqScore: 109, duelRating: 1180, rank: 23, weeklyMinutes: 3, weeklyPoints: 17 },
  { id: 'l-24', name: 'Sabina_Cyber', avatar: '✨', city: 'Toshkent', iqScore: 108, duelRating: 1170, rank: 24, weeklyMinutes: 2, weeklyPoints: 16 },
  { id: 'l-25', name: 'Anvar_Smart', avatar: '🎯', city: 'Qashqadaryo', iqScore: 107, duelRating: 1160, rank: 25, weeklyMinutes: 2, weeklyPoints: 15 },
  { id: 'l-26', name: 'Sevara_Ace', avatar: '💎', city: 'Jizzax', iqScore: 106, duelRating: 1150, rank: 26, weeklyMinutes: 2, weeklyPoints: 14 },
  { id: 'l-27', name: 'Davron_IQ', avatar: '⚡', city: 'Samarqand', iqScore: 105, duelRating: 1140, rank: 27, weeklyMinutes: 2, weeklyPoints: 13 },
  { id: 'l-28', name: 'Maftuna_Genius', avatar: '👑', city: 'Buxoro', iqScore: 104, duelRating: 1130, rank: 28, weeklyMinutes: 2, weeklyPoints: 12 },
  { id: 'l-29', name: 'Mansur_Logic', avatar: '🧠', city: 'Andijon', iqScore: 103, duelRating: 1120, rank: 29, weeklyMinutes: 2, weeklyPoints: 11 },
  { id: 'l-30', name: 'Shohruh_Pilot', avatar: '🚀', city: 'Toshkent', iqScore: 102, duelRating: 1110, rank: 30, weeklyMinutes: 2, weeklyPoints: 10 },
  { id: 'l-31', name: 'Zuhra_Thinker', avatar: '🌟', city: 'Surxondaryo', iqScore: 101, duelRating: 1100, rank: 31, weeklyMinutes: 2, weeklyPoints: 10 },
  { id: 'l-32', name: 'Farrux_Vector', avatar: '🏹', city: "Farg'ona", iqScore: 100, duelRating: 1090, rank: 32, weeklyMinutes: 2, weeklyPoints: 9 },
  { id: 'l-33', name: 'Asal_Insight', avatar: '🍯', city: 'Namangan', iqScore: 99, duelRating: 1080, rank: 33, weeklyMinutes: 2, weeklyPoints: 9 },
  { id: 'l-34', name: 'Shohid_Matrix', avatar: '🧩', city: 'Toshkent', iqScore: 98, duelRating: 1070, rank: 34, weeklyMinutes: 1, weeklyPoints: 8 },
  { id: 'l-35', name: 'Nafisa_Explorer', avatar: '🧭', city: 'Xorazm', iqScore: 97, duelRating: 1060, rank: 35, weeklyMinutes: 1, weeklyPoints: 8 },
  { id: 'l-36', name: 'Iskandar_Rex', avatar: '🦖', city: 'Qashqadaryo', iqScore: 96, duelRating: 1050, rank: 36, weeklyMinutes: 1, weeklyPoints: 7 },
  { id: 'l-37', name: 'Aziza_Logic', avatar: '💡', city: 'Buxoro', iqScore: 95, duelRating: 1040, rank: 37, weeklyMinutes: 1, weeklyPoints: 7 },
  { id: 'l-38', name: 'Muhriddin_Uz', avatar: '🇺🇿', city: 'Samarqand', iqScore: 94, duelRating: 1030, rank: 38, weeklyMinutes: 1, weeklyPoints: 6 },
  { id: 'l-39', name: 'Gulbahor_Art', avatar: '🎨', city: 'Jizzax', iqScore: 93, duelRating: 1020, rank: 39, weeklyMinutes: 1, weeklyPoints: 6 },
  { id: 'l-40', name: 'Laziz_Runner', avatar: '🏃', city: 'Toshkent vil.', iqScore: 92, duelRating: 1010, rank: 40, weeklyMinutes: 1, weeklyPoints: 5 },
  { id: 'l-41', name: 'Nilufar_Lotus', avatar: '🪷', city: 'Navoiy', iqScore: 91, duelRating: 1000, rank: 41, weeklyMinutes: 1, weeklyPoints: 5 },
  { id: 'l-42', name: 'Shavkat_Apex', avatar: '⛰️', city: 'Andijon', iqScore: 90, duelRating: 990, rank: 42, weeklyMinutes: 1, weeklyPoints: 4 },
  { id: 'l-43', name: 'Diyora_Spark', avatar: '⚡', city: 'Toshkent', iqScore: 89, duelRating: 980, rank: 43, weeklyMinutes: 1, weeklyPoints: 4 },
  { id: 'l-44', name: 'Jahongir_Sky', avatar: '🌌', city: 'Sirdaryo', iqScore: 88, duelRating: 970, rank: 44, weeklyMinutes: 1, weeklyPoints: 3 },
  { id: 'l-45', name: 'Zarina_Quest', avatar: '🗺️', city: 'Buxoro', iqScore: 87, duelRating: 960, rank: 45, weeklyMinutes: 1, weeklyPoints: 3 },
  { id: 'l-46', name: 'Islombek_Code', avatar: '💻', city: "Farg'ona", iqScore: 86, duelRating: 950, rank: 46, weeklyMinutes: 1, weeklyPoints: 2 },
  { id: 'l-47', name: 'Mohira_Quest', avatar: '🧭', city: 'Surxondaryo', iqScore: 85, duelRating: 940, rank: 47, weeklyMinutes: 1, weeklyPoints: 2 },
  { id: 'l-48', name: 'Mirzo_Smart', avatar: '🧠', city: 'Namangan', iqScore: 84, duelRating: 930, rank: 48, weeklyMinutes: 1, weeklyPoints: 1 },
  { id: 'l-49', name: 'Shahzoda_Star', avatar: '⭐', city: 'Qoraqalpog\'iston', iqScore: 83, duelRating: 920, rank: 49, weeklyMinutes: 1, weeklyPoints: 1 },
  { id: 'l-50', name: 'Umidbek_Seeker', avatar: '🔍', city: 'Xorazm', iqScore: 82, duelRating: 910, rank: 50, weeklyMinutes: 1, weeklyPoints: 1 },
];

export const LeaderboardModule: React.FC<LeaderboardModuleProps> = ({ currentUser }) => {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'daily' | 'all'>('weekly');
  const [scopeFilter, setScopeFilter] = useState<'top10' | 'top50'>('top10');

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-mono text-xs font-bold text-slate-400">#{rank}</span>;
  };

  const getUnvonBadge = (iqScore: number) => {
    if (iqScore >= 120) {
      return { title: 'Daho', icon: '👑', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/40' };
    }
    if (iqScore >= 100) {
      return { title: 'Mantiq Ustasi', icon: '⚡', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/40' };
    }
    return { title: 'Izlanuvchi', icon: '🎯', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/40' };
  };

  const userIq = currentUser.bestIq || currentUser.iqScore || 0;
  const userMinutes = Math.floor((currentUser.weeklyTimeSpentSeconds || 320) / 60);
  const userPoints = Math.round(userIq * 0.45);

  const hasMetPoints = userPoints >= 40;
  const hasMetTime = userMinutes >= 5;
  const isEligible = hasMetPoints && hasMetTime;

  let currentUserRank = 6;
  if (userIq >= 148) currentUserRank = 1;
  else if (userIq >= 144) currentUserRank = 2;
  else if (userIq >= 140) currentUserRank = 3;
  else if (userIq >= 130) currentUserRank = 5;

  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-4 animate-fade-in">
      {/* Top Banner with Weekly Prizes */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-amber-400/40 shadow-2xl text-center relative overflow-hidden">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/15 border border-amber-400 flex items-center justify-center text-amber-400 mb-2">
          <Gift className="w-6 h-6 animate-pulse" />
        </div>

        <h2 className="text-xl font-display font-bold text-white tracking-wide">
          HAFTALIK TOP-3 SOVG'ALARI
        </h2>
        <p className="text-xs text-amber-300 font-mono mt-0.5">
          Har yakshanba Telegram Stars va sovg'alar yuboriladi
        </p>

        {/* 3 Prize Podiums */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-700/80">
            <div className="text-2xl">🥈</div>
            <div className="text-xs font-bold text-slate-200">2-O'rin</div>
            <div className="text-xs font-mono font-bold text-cyan-400 mt-1">10 Stars</div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-400/60 scale-105 shadow-lg shadow-amber-400/10">
            <div className="text-3xl">🥇</div>
            <div className="text-xs font-bold text-amber-300">1-O'rin</div>
            <div className="text-xs font-mono font-extrabold text-amber-400 mt-1">15 Stars / Gift</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-700/80">
            <div className="text-2xl">🥉</div>
            <div className="text-xs font-bold text-slate-200">3-O'rin</div>
            <div className="text-xs font-mono font-bold text-purple-400 mt-1">5 Stars</div>
          </div>
        </div>

        {/* Mandatory Qualification Criteria */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-1.5 text-xs">
          <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sovg'a Olish Shartlari (Majburiy):</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              {hasMetPoints ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="text-slate-300">
                Min. 40+ ochko: <strong className="font-mono text-cyan-300">{userPoints} ball</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {hasMetTime ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="text-slate-300">
                Min. 5 minut faollik: <strong className="font-mono text-cyan-300">{userMinutes} min</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Scope Tabs */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          {/* Time Filter */}
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800">
            {[
              { id: 'weekly', label: 'Haftalik' },
              { id: 'daily', label: 'Kunlik' },
              { id: 'all', label: 'Barchasi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playCyberClick();
                  setTimeFilter(tab.id as any);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeFilter === tab.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TOP 10 vs TOP 50 Switcher */}
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-cyan-500/30">
            {[
              { id: 'top10', label: 'TOP 10' },
              { id: 'top50', label: 'TOP 50 (Barchasi)' },
            ].map((scope) => (
              <button
                key={scope.id}
                onClick={() => {
                  soundManager.playCyberClick();
                  setScopeFilter(scope.id as any);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  scopeFilter === scope.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {scope.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User's Own Rank Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-400/50 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs">
            #{currentUserRank}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xl">{currentUser.avatar}</div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{currentUser.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono">(Siz)</span>
                {userIq > 0 && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full border ${getUnvonBadge(userIq).border} ${getUnvonBadge(userIq).bg} ${getUnvonBadge(userIq).color} font-bold`}>
                    {getUnvonBadge(userIq).icon} {getUnvonBadge(userIq).title}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">
                Vaqt: {userMinutes} min · Ochko: {userPoints}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold font-mono text-amber-400">
            {isEligible ? 'Sovg\'aga Da\'vogar ✅' : 'Kvalifikatsiya kutilmoqda'}
          </div>
          <div className="text-[10px] text-slate-400">{userIq > 0 ? `${userIq} IQ` : 'Test topshiring'}</div>
        </div>
      </div>

      {/* Leaderboard List Header */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-mono">
        <span>O'yinchilar: {scopeFilter === 'top10' ? '10 ta' : '50 ta'}</span>
        <span>Haftalik Ochko / Reyting</span>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {GENERATED_50_LEADERS.slice(0, scopeFilter === 'top10' ? 10 : 50).map((leader) => {
          const badge = getUnvonBadge(leader.iqScore);
          return (
            <div
              key={leader.id}
              className={`p-3 rounded-2xl bg-slate-900/80 border transition-all flex items-center justify-between hover:border-cyan-500/40 ${
                leader.rank <= 3
                  ? 'border-amber-400/40 shadow-md shadow-amber-400/5 bg-slate-900'
                  : 'border-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 flex items-center justify-center">
                  {getRankBadge(leader.rank)}
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-lg">
                  {leader.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{leader.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${badge.border} ${badge.bg} ${badge.color} font-semibold font-mono`}>
                      {badge.icon} {badge.title}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                    <span>📍 {leader.city}</span>
                    <span>·</span>
                    <span className="text-cyan-400">{leader.iqScore} IQ</span>
                    <span>·</span>
                    <span>{leader.weeklyMinutes} min faol</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold font-display text-amber-400">
                  {leader.weeklyPoints} <span className="text-[10px] font-normal text-slate-400">ochko</span>
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  {leader.rank === 1 ? '🎁 15 Stars' : leader.rank === 2 ? '⭐ 10 Stars' : leader.rank === 3 ? '⭐ 5 Stars' : `#${leader.rank}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function displayList(list: LeaderboardUser[]) {
  return list;
}
