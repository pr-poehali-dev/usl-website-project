import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import {
  TEAMS, PLAYERS, INITIAL_MATCHES, getTeam, formatTime, PLAYER_NAMES,
  type Match, type Division,
} from '@/data/usl-data';

type NavSection = 'live' | 'stats' | 'schedule' | 'projects' | 'about' | 'news';

const NAV_ITEMS: { id: NavSection; label: string; icon: string }[] = [
  { id: 'live',     label: 'Live',        icon: 'Radio'     },
  { id: 'stats',    label: 'Stats',       icon: 'BarChart3' },
  { id: 'schedule', label: 'Schedule',    icon: 'Calendar'  },
  { id: 'projects', label: 'Projects',    icon: 'Layers'    },
  { id: 'about',    label: 'About',       icon: 'Info'      },
  { id: 'news',     label: 'News',        icon: 'Newspaper' },
];

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLiveEvent(match: Match): string {
  const home = getTeam(match.homeTeamId);
  const away = getTeam(match.awayTeamId);
  const team = Math.random() > 0.5 ? home : away;
  const player = PLAYER_NAMES[rnd(0, PLAYER_NAMES.length - 1)];
  const events = [
    `${team?.shortName} — shot on target`,
    `${player} receives a yellow card`,
    `${team?.shortName} — corner kick`,
    `Offside called against ${team?.shortName}`,
    `${player} — dangerous chance`,
    `${team?.shortName} pressing through the left flank`,
    `Foul in midfield`,
    `${player} — free kick near the box`,
    `${team?.shortName} — shot over the bar`,
    `Goalkeeper ${team?.shortName} makes a save`,
  ];
  return events[rnd(0, events.length - 1)];
}

const EVENT_ICONS: Record<string, string> = {
  goal: 'G',
  yellow: 'Y',
  red: 'R',
  save: 'S',
  miss: '-',
  substitution: 'SUB',
  penalty: 'P',
};

function MatchCard({ match, expanded, onToggle }: {
  match: Match;
  expanded: boolean;
  onToggle: () => void;
}) {
  const home = getTeam(match.homeTeamId);
  const away = getTeam(match.awayTeamId);

  return (
    <div
      className={`bg-[#0a0a0a] border transition-all duration-200 cursor-pointer ${
        match.status === 'live'
          ? 'border-[#00f6ac33] hover:border-[#00f6ac66]'
          : 'border-[#1a1a1a] hover:border-[#2a2a2a]'
      }`}
      onClick={onToggle}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            {match.status === 'live' && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            )}
            <span className={`font-mono text-[10px] tracking-widest ${
              match.status === 'live' ? 'text-red-400' :
              match.status === 'upcoming' ? 'text-[#00f6ac]' : 'text-[#333]'
            }`}>
              {match.status === 'live' ? `${match.minute}'` :
               match.status === 'upcoming' ? formatTime(match.scheduledTime) : 'FT'}
            </span>
          </div>
          <span className="font-mono text-[#222] text-[10px]">
            {match.division} · GRP {match.group}
          </span>
          {match.status === 'live' && (
            <span className="ml-auto font-mono text-[10px] text-[#333]">
              {match.shots[0]}–{match.shots[1]} shots
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="font-body text-white font-medium text-sm truncate">{home?.name}</span>
          </div>

          <div className="shrink-0 px-4 text-center">
            {match.status === 'upcoming' ? (
              <span className="font-display text-[#333] text-lg font-bold">vs</span>
            ) : (
              <span className={`font-display text-xl font-bold ${match.status === 'live' ? 'text-[#00f6ac]' : 'text-white'}`}>
                {match.homeScore} — {match.awayScore}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
            <span className="font-body text-white font-medium text-sm truncate text-right">{away?.name}</span>
          </div>
        </div>

        {match.status === 'live' && (
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-[#444] text-[10px] shrink-0 w-8">{match.possession[0]}%</span>
            <div className="flex-1 bg-[#111] h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00f6ac99] rounded-full transition-all duration-1000"
                style={{ width: `${match.possession[0]}%` }}
              />
            </div>
            <span className="font-mono text-[#444] text-[10px] shrink-0 w-8 text-right">{match.possession[1]}%</span>
          </div>
        )}
      </div>

      {expanded && match.events.length > 0 && (
        <div className="border-t border-[#111] px-4 py-3 space-y-1.5">
          <div className="font-mono text-[10px] text-[#333] tracking-widest mb-2">MATCH EVENTS</div>
          {match.events.map((ev, i) => {
            const evHome = getTeam(match.homeTeamId);
            const evAway = getTeam(match.awayTeamId);
            const teamName = ev.teamId === match.homeTeamId ? evHome?.shortName : evAway?.shortName;
            return (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="font-mono text-[#00f6ac] w-8 shrink-0">{ev.minute}'</span>
                <span className={`font-mono text-[10px] px-1 py-0.5 shrink-0 ${
                  ev.type === 'goal' ? 'bg-[#00f6ac22] text-[#00f6ac]' :
                  ev.type === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                  ev.type === 'red' ? 'bg-red-500/20 text-red-400' :
                  'bg-[#1a1a1a] text-[#444]'
                }`}>
                  {EVENT_ICONS[ev.type] || ev.type.toUpperCase()}
                </span>
                <span className="font-body text-[#555]">{ev.playerName}</span>
                <span className="font-mono text-[#333] text-[10px] ml-auto">{teamName}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<NavSection>('live');
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [liveLog, setLiveLog] = useState<{ id: number; text: string; time: string }[]>([]);
  const [ticker, setTicker] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsDiv, setStatsDiv] = useState<Division>('D1');
  const [scheduleDiv, setScheduleDiv] = useState<Division>('D1');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const addLiveEvent = useCallback(() => {
    const liveMatches = matches.filter(m => m.status === 'live');
    if (!liveMatches.length) return;
    const match = liveMatches[rnd(0, liveMatches.length - 1)];
    const event = generateLiveEvent(match);
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setLiveLog(prev => [{ id: Date.now(), text: event, time: now }, ...prev.slice(0, 24)]);
    setTicker(t => t + 1);
  }, [matches]);

  const tickMatches = useCallback(() => {
    setMatches(prev => prev.map(m => {
      if (m.status !== 'live') return m;
      const newMinute = Math.min(m.minute + 1, 50);
      let newHomeScore = m.homeScore;
      let newAwayScore = m.awayScore;
      if (Math.random() < 0.035) {
        if (Math.random() > 0.5) newHomeScore++;
        else newAwayScore++;
      }
      const newStatus: Match['status'] = newMinute >= 50 ? 'finished' : 'live';
      return { ...m, minute: newMinute, homeScore: newHomeScore, awayScore: newAwayScore, status: newStatus };
    }));
  }, []);

  useEffect(() => {
    const matchTick = setInterval(tickMatches, 3000);
    const eventTick = setInterval(addLiveEvent, 4500);
    return () => { clearInterval(matchTick); clearInterval(eventTick); };
  }, [tickMatches, addLiveEvent]);

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const finishedMatches = matches.filter(m => m.status === 'finished');

  const tickerItems = [
    ...liveMatches.map(m => {
      const h = getTeam(m.homeTeamId);
      const a = getTeam(m.awayTeamId);
      return `LIVE ${h?.shortName} ${m.homeScore}:${m.awayScore} ${a?.shortName} ${m.minute}'`;
    }),
    ...finishedMatches.slice(0, 5).map(m => {
      const h = getTeam(m.homeTeamId);
      const a = getTeam(m.awayTeamId);
      return `FT ${h?.shortName} ${m.homeScore}:${m.awayScore} ${a?.shortName}`;
    }),
    'USL D1 / D2 · 32 CLUBS · SEASON 2025',
  ];

  return (
    <div className="min-h-screen bg-[#020202] font-body scan-effect">

      {/* TICKER */}
      <div className="bg-[#00f6ac] h-9 overflow-hidden flex items-center select-none">
        <div className="bg-[#020202] text-[#00f6ac] font-display text-xs font-bold px-4 h-full flex items-center shrink-0 z-10 tracking-[0.2em] border-r border-[#00f6ac33]">
          USL
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="flex gap-16 whitespace-nowrap animate-ticker" key={ticker % 10}>
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[#020202] font-mono text-xs font-semibold tracking-wide shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b border-[#111] bg-[#050505] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('live')}>
            <div className="w-10 h-10 bg-[#00f6ac] flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-[#020202] text-sm tracking-widest">USL</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-base leading-none tracking-[0.15em]">
                UNIVERSAL SOCCER
              </div>
              <div className="font-mono text-[10px] text-[#00f6ac] tracking-[0.35em] uppercase mt-0.5">
                League Platform
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 font-display text-sm tracking-wider transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#00f6ac] text-[#020202] font-bold'
                    : 'text-[#555] hover:text-white hover:bg-[#0d0d0d]'
                }`}
              >
                {item.id === 'live' && liveMatches.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#0d0d0d] border border-[#1f1f1f] px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f6ac] animate-pulse" />
              <span className="font-mono text-[#00f6ac] text-xs tracking-wide">{liveMatches.length} LIVE</span>
            </div>
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#050505] border-t border-[#111] grid grid-cols-3 gap-px bg-[#111]">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex flex-col items-center gap-1 py-3 font-display text-xs tracking-wider transition-all bg-[#050505] ${
                  activeSection === item.id ? 'text-[#00f6ac]' : 'text-[#444]'
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* ===== LIVE ===== */}
        {activeSection === 'live' && (
          <div className="animate-slide-up">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider">
                LIVE <span style={{ color: '#00f6ac', textShadow: '0 0 30px #00f6ac44' }}>MATCHES</span>
              </h1>
              {liveMatches.length > 0 && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-red-400 text-xs font-bold tracking-wide">
                    {liveMatches.length} IN PROGRESS
                  </span>
                </div>
              )}
            </div>

            <div className="grid xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                {liveMatches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[#00f6ac] mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f6ac] animate-pulse" />
                      ON AIR
                    </div>
                    <div className="space-y-2">
                      {liveMatches.map(match => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          expanded={expandedMatch === match.id}
                          onToggle={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {upcomingMatches.length > 0 && (
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-[#444] mb-3">UPCOMING</div>
                    <div className="space-y-2">
                      {upcomingMatches.map(match => (
                        <MatchCard key={match.id} match={match} expanded={false} onToggle={() => {}} />
                      ))}
                    </div>
                  </div>
                )}

                {finishedMatches.length > 0 && (
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-[#333] mb-3">FINISHED</div>
                    <div className="space-y-2">
                      {finishedMatches.slice(0, 6).map(match => (
                        <MatchCard key={match.id} match={match} expanded={false} onToggle={() => {}} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Live feed */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col">
                <div className="border-b border-[#1a1a1a] p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f6ac] animate-pulse" />
                    <span className="font-display text-xs tracking-[0.25em] text-[#00f6ac]">LIVE FEED</span>
                  </div>
                  <span className="font-mono text-[#222] text-xs">{liveLog.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 min-h-[400px] max-h-[600px]">
                  {liveLog.length === 0 ? (
                    <div className="text-[#222] font-mono text-xs text-center mt-16">
                      <div className="text-2xl mb-3">—</div>
                      Waiting for events...
                    </div>
                  ) : (
                    liveLog.map(ev => (
                      <div
                        key={ev.id}
                        className="flex items-start gap-3 py-2.5 border-b border-[#0d0d0d] animate-fade-in"
                      >
                        <span className="font-mono text-[#2a2a2a] text-[10px] shrink-0 mt-0.5 w-16">{ev.time}</span>
                        <span className="font-body text-[#888] text-xs leading-relaxed">{ev.text}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== STATS ===== */}
        {activeSection === 'stats' && (
          <div className="animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider">
                STATI<span style={{ color: '#00f6ac' }}>STICS</span>
              </h1>
              <div className="flex gap-1">
                {(['D1', 'D2'] as Division[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setStatsDiv(d)}
                    className={`px-6 py-2.5 font-display text-sm tracking-wider transition-all ${
                      statsDiv === d
                        ? 'bg-[#00f6ac] text-[#020202] font-bold'
                        : 'bg-[#0d0d0d] text-[#444] hover:text-white border border-[#1a1a1a]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#00f6ac] mb-4">
                STANDINGS · {statsDiv}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(['A', 'B', 'C', 'D'] as const).map(group => {
                  const groupTeams = TEAMS
                    .filter(t => t.division === statsDiv && t.group === group)
                    .sort((a, b) => b.points - a.points);
                  return (
                    <div key={group} className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
                      <div className="border-b border-[#1a1a1a] px-4 py-2.5 bg-[#0d0d0d]">
                        <span className="font-display text-xs tracking-[0.3em] text-[#555]">GROUP {group}</span>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#0f0f0f]">
                            {['#', 'Club', 'P', 'W', 'D', 'L', 'GF', 'GA', 'Pts'].map(h => (
                              <th key={h} className={`py-2 px-2 font-mono text-[10px] text-[#2a2a2a] font-normal ${h === 'Club' ? 'text-left px-3' : 'text-center'} ${h === '#' ? 'pl-4' : ''} ${h === 'Pts' ? 'text-[#00f6ac]' : ''}`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {groupTeams.map((team, idx) => (
                            <tr key={team.id} className={`border-b border-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors ${idx === 0 ? 'bg-[#00f6ac08]' : ''}`}>
                              <td className="py-2.5 pl-4 pr-2 font-mono text-[#2a2a2a] text-xs">{idx + 1}</td>
                              <td className="py-2.5 px-3">
                                <div>
                                  <div className={`font-body text-xs font-medium ${idx === 0 ? 'text-[#00f6ac]' : 'text-white'}`}>{team.name}</div>
                                  <div className="font-mono text-[#222] text-[9px]">{team.state}</div>
                                </div>
                              </td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#333] text-xs">{team.wins + team.draws + team.losses}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-white text-xs">{team.wins}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#333] text-xs">{team.draws}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#333] text-xs">{team.losses}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#444] text-xs">{team.goalsFor}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#333] text-xs">{team.goalsAgainst}</td>
                              <td className="py-2.5 px-2 text-center">
                                <span className={`font-display font-bold text-sm ${idx === 0 ? 'text-[#00f6ac]' : 'text-white'}`}>{team.points}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#00f6ac] mb-4">
                TOP SCORERS · {statsDiv}
              </div>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#111]">
                      {['#', 'Player', 'Club', 'Pos', 'G', 'A', 'G+A', 'YC', 'Min', 'KPI'].map(h => (
                        <th key={h} className={`py-3 px-3 font-mono text-[10px] text-[#2a2a2a] font-normal ${['#', 'Player', 'Club', 'Pos'].includes(h) ? 'text-left' : 'text-center'} ${h === 'G' || h === 'KPI' ? 'text-[#00f6ac]' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLAYERS
                      .filter(p => {
                        const team = getTeam(p.teamId);
                        return team?.division === statsDiv;
                      })
                      .sort((a, b) => b.goals - a.goals)
                      .map((player, idx) => {
                        const team = getTeam(player.teamId);
                        const posColors: Record<string, string> = {
                          FWD: '#f87171', MID: '#60a5fa', DEF: '#4ade80', GK: '#facc15'
                        };
                        const kpi = ((player.goals * 2 + player.assists * 1.5 + (player.saves || 0) * 0.5) / Math.max(player.minutesPlayed / 90, 1)).toFixed(1);
                        return (
                          <tr key={player.id} className={`border-b border-[#0a0a0a] hover:bg-[#0d0d0d] transition-colors ${idx === 0 ? 'bg-[#00f6ac08]' : ''}`}>
                            <td className="py-3 px-3 font-mono text-[#2a2a2a] text-xs">{idx + 1}</td>
                            <td className="py-3 px-3 font-body text-white font-medium text-sm">{player.name}</td>
                            <td className="py-3 px-3">
                              <span className="font-mono text-[#444] text-xs">{team?.shortName}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-mono text-xs font-bold" style={{ color: posColors[player.position] }}>
                                {player.position}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="font-display font-bold text-[#00f6ac] text-base">{player.goals}</span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-white text-sm">{player.assists}</td>
                            <td className="py-3 px-3 text-center font-mono text-[#666] text-sm">{player.goals + player.assists}</td>
                            <td className="py-3 px-3 text-center">
                              <span className={`font-mono text-xs ${player.yellowCards >= 4 ? 'text-yellow-400' : 'text-[#333]'}`}>
                                {player.yellowCards}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-[#333] text-xs">{player.minutesPlayed}'</td>
                            <td className="py-3 px-3 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <div className="h-1 rounded-full bg-[#00f6ac]" style={{ width: `${Math.min(parseFloat(kpi) / 5 * 32, 32)}px`, minWidth: '4px' }} />
                                <span className="font-mono text-white text-xs">{kpi}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== SCHEDULE ===== */}
        {activeSection === 'schedule' && (
          <div className="animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider">
                  SCHE<span style={{ color: '#00f6ac' }}>DULE</span>
                </h1>
                <p className="font-mono text-[#333] text-xs mt-1 tracking-wide">
                  UPDATED DAILY · 24H HORIZON · KICKOFFS ON THE HOUR
                </p>
              </div>
              <div className="flex gap-1">
                {(['D1', 'D2'] as Division[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setScheduleDiv(d)}
                    className={`px-6 py-2.5 font-display text-sm tracking-wider transition-all ${
                      scheduleDiv === d
                        ? 'bg-[#00f6ac] text-[#020202] font-bold'
                        : 'bg-[#0d0d0d] text-[#444] hover:text-white border border-[#1a1a1a]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(['A', 'B', 'C', 'D'] as const).map(group => {
                const groupMatches = matches
                  .filter(m => m.division === scheduleDiv && m.group === group)
                  .sort((a, b) => {
                    const order = { live: 0, upcoming: 1, finished: 2 };
                    return order[a.status] - order[b.status];
                  });

                return (
                  <div key={group} className="bg-[#0a0a0a] border border-[#1a1a1a]">
                    <div className="border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
                      <span className="font-display text-sm tracking-[0.2em] text-white">
                        GROUP {group}
                      </span>
                      <span className="font-mono text-[10px] text-[#00f6ac]">
                        {groupMatches.filter(m => m.status === 'live').length > 0 ? 'LIVE' : ''}
                      </span>
                    </div>
                    <div className="divide-y divide-[#0d0d0d]">
                      {groupMatches.map(match => {
                        const home = getTeam(match.homeTeamId);
                        const away = getTeam(match.awayTeamId);
                        return (
                          <div
                            key={match.id}
                            className={`px-4 py-3 flex items-center gap-3 ${match.status === 'live' ? 'bg-[#00f6ac08]' : ''}`}
                          >
                            <div className="w-14 shrink-0">
                              {match.status === 'live' ? (
                                <div className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                  <span className="font-mono text-red-400 text-xs font-bold">{match.minute}'</span>
                                </div>
                              ) : match.status === 'upcoming' ? (
                                <span className="font-mono text-[#00f6ac] text-xs">
                                  {formatTime(match.scheduledTime)}
                                </span>
                              ) : (
                                <span className="font-mono text-[#2a2a2a] text-xs">FT</span>
                              )}
                            </div>
                            <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                <span className="font-body text-xs text-white truncate">{home?.name}</span>
                              </div>
                              <div className="shrink-0 font-display text-sm font-bold w-14 text-center">
                                {match.status === 'upcoming' ? (
                                  <span className="text-[#222]">vs</span>
                                ) : (
                                  <span style={{ color: match.status === 'live' ? '#00f6ac' : '#ffffff' }}>
                                    {match.homeScore}:{match.awayScore}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end">
                                <span className="font-body text-xs text-white truncate text-right">{away?.name}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== PROJECTS ===== */}
        {activeSection === 'projects' && (
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-8">
              PROJ<span style={{ color: '#00f6ac' }}>ECTS</span>
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'USL Academy', desc: 'Youth development program connecting clubs with the next generation of American soccer talent.', icon: 'GraduationCap', tag: 'DEVELOPMENT' },
                { title: 'USL Analytics', desc: 'Advanced performance data platform providing clubs with in-depth player and team metrics.', icon: 'BarChart2', tag: 'TECHNOLOGY' },
                { title: 'USL Media', desc: 'Official broadcast and content partner — delivering match coverage across all platforms.', icon: 'Tv2', tag: 'MEDIA' },
                { title: 'USL Community', desc: 'Fan engagement initiative bringing supporters closer to the clubs and the game.', icon: 'Users', tag: 'COMMUNITY' },
                { title: 'USL Pro Scout', desc: 'Scouting network connecting clubs and agents for talent identification across the country.', icon: 'Search', tag: 'SCOUTING' },
                { title: 'USL Cup', desc: 'Season-end knockout tournament featuring the top club from each group across both divisions.', icon: 'Trophy', tag: 'TOURNAMENT' },
              ].map((proj, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 hover:border-[#00f6ac33] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-[#00f6ac11] flex items-center justify-center group-hover:bg-[#00f6ac22] transition-all">
                      <Icon name={proj.icon} size={18} className="text-[#00f6ac]" />
                    </div>
                    <span className="font-mono text-[9px] text-[#222] tracking-widest">{proj.tag}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide mb-2">{proj.title}</h3>
                  <p className="font-body text-[#444] text-sm leading-relaxed">{proj.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-[#333] text-xs font-mono group-hover:text-[#00f6ac] transition-all group-hover:gap-3">
                    <span>LEARN MORE</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {activeSection === 'about' && (
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-8">
              ABOUT <span style={{ color: '#00f6ac' }}>USL</span>
            </h1>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#00f6ac] mb-4">MISSION</div>
                  <p className="font-body text-[#666] leading-relaxed text-sm">
                    Universal Soccer League is a professional soccer competition built on transparency, competition, 
                    and development. With two divisions across 32 clubs representing states and districts 
                    throughout the USA, USL provides a structured platform for clubs to compete at the highest level.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '32', label: 'Clubs' },
                    { value: '2', label: 'Divisions' },
                    { value: '8', label: 'Groups' },
                    { value: '480+', label: 'Matches per season' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 text-center">
                      <div className="font-display text-3xl font-bold" style={{ color: '#00f6ac' }}>{stat.value}</div>
                      <div className="font-body text-[#333] text-sm mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Competition Format', desc: 'Two divisions of 16 clubs each, divided into four groups of four. Each group stage runs continuously, with matches scheduled on the hour throughout the day.' },
                  { title: 'Points System', desc: 'Win — 3 points, Draw — 1 point, Loss — 0 points. Group leaders advance to the USL Cup knockout stage at the end of the season.' },
                  { title: 'Player KPI', desc: 'Every registered player receives a performance index calculated from goals, assists, defensive actions, and minutes played per 90.' },
                  { title: 'Live Coverage', desc: 'Every match is covered in real time with full statistics, possession tracking, shot counts, and a continuous event feed.' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 flex gap-4">
                    <div className="w-0.5 bg-[#00f6ac] shrink-0" />
                    <div>
                      <h3 className="font-display text-sm font-bold text-white tracking-wide mb-1.5">{item.title}</h3>
                      <p className="font-body text-[#444] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== NEWS ===== */}
        {activeSection === 'news' && (
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-8">
              SPORT<span style={{ color: '#00f6ac' }}>S NEWS</span>
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { date: 'Today', tag: 'FIFA', title: 'FIFA raises prize fund for 2026 World Cup to record $1 billion', preview: 'Host nations USA, Canada and Mexico set to benefit from expanded tournament revenue.' },
                { date: 'Today', tag: 'PREMIER LEAGUE', title: 'Manchester City manager extends contract through 2027', preview: 'Club confirms long-term commitment with squad rebuild planned for summer window.' },
                { date: 'Yesterday', tag: 'CHAMPIONS LEAGUE', title: 'Real Madrid through to semi-finals after extra time', preview: 'Late goal in the 118th minute sealed a dramatic aggregate win at the Bernabeu.' },
                { date: 'Yesterday', tag: 'MLS', title: 'Inter Miami top the Eastern Conference standings', preview: 'Five-game winning run puts Miami three points clear heading into the international break.' },
                { date: '2 days ago', tag: 'TRANSFERS', title: 'Juventus confirm €85m signing of Brazilian midfielder', preview: 'Deal agreed ahead of summer, player to join on July 1 on a four-year contract.' },
                { date: '3 days ago', tag: 'BUNDESLIGA', title: 'Bayern Munich clinch title with four games remaining', preview: 'A 3-0 win over Dortmund mathematically confirmed a 13th consecutive Bundesliga crown.' },
              ].map((news, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00f6ac33] transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  <div className="h-0.5 bg-[#1a1a1a] group-hover:bg-[#00f6ac] transition-all duration-300" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] text-[#00f6ac] tracking-[0.2em]">{news.tag}</span>
                      <span className="font-mono text-[9px] text-[#222]">{news.date}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-white tracking-wide leading-snug mb-3 group-hover:text-[#00f6ac] transition-colors duration-200">
                      {news.title}
                    </h3>
                    <p className="font-body text-[#333] text-xs leading-relaxed">{news.preview}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-[#222] text-xs font-mono group-hover:text-[#00f6ac] transition-all group-hover:gap-2.5">
                      <span>READ MORE</span>
                      <Icon name="ChevronRight" size={11} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#0d0d0d] mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#00f6ac] flex items-center justify-center">
              <span className="font-display font-bold text-[#020202] text-[10px] tracking-widest">USL</span>
            </div>
            <span className="font-mono text-[#222] text-xs">Universal Soccer League © 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f6ac] animate-pulse" />
            <span className="font-mono text-[#00f6ac] text-xs tracking-wide">LIVE PLATFORM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
