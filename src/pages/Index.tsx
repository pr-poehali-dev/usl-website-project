import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import {
  TEAMS, PLAYERS, INITIAL_MATCHES, getTeam, formatHour,
  getActiveGroup, getNextGroup, minutesUntilGroupChange, PLAYER_NAMES,
  type Match, type Division, type Group,
} from '@/data/usl-data';

type NavSection = 'live' | 'stats' | 'schedule' | 'projects' | 'about' | 'news';

const NAV_ITEMS: { id: NavSection; label: string; icon: string }[] = [
  { id: 'live',     label: 'Live',     icon: 'Radio'     },
  { id: 'stats',    label: 'Stats',    icon: 'BarChart3' },
  { id: 'schedule', label: 'Schedule', icon: 'Calendar'  },
  { id: 'projects', label: 'Projects', icon: 'Layers'    },
  { id: 'about',    label: 'About',    icon: 'Info'      },
  { id: 'news',     label: 'News',     icon: 'Newspaper' },
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
    `${team?.shortName} earns a corner`,
    `Offside called against ${team?.shortName}`,
    `${player} — dangerous chance`,
    `${team?.shortName} pressing through the left flank`,
    `Foul in midfield`,
    `${player} — free kick outside the box`,
    `${team?.shortName} — shot over the bar`,
    `Goalkeeper ${team?.shortName} denies the attempt`,
  ];
  return events[rnd(0, events.length - 1)];
}

const EVENT_BADGE: Record<string, { label: string; cls: string }> = {
  goal:         { label: 'GOAL', cls: 'bg-[#00f6ac22] text-[#00f6ac]' },
  yellow:       { label: 'YC',   cls: 'bg-yellow-500/20 text-yellow-400' },
  red:          { label: 'RC',   cls: 'bg-red-500/20 text-red-400' },
  save:         { label: 'SAVE', cls: 'bg-blue-500/20 text-blue-400' },
  miss:         { label: 'MISS', cls: 'bg-[#1a1a1a] text-[#444]' },
  penalty:      { label: 'PEN',  cls: 'bg-orange-500/20 text-orange-400' },
  substitution: { label: 'SUB',  cls: 'bg-[#1a1a1a] text-[#444]' },
};

function MatchCard({ match, expanded, onToggle }: {
  match: Match; expanded: boolean; onToggle: () => void;
}) {
  const home = getTeam(match.homeTeamId);
  const away = getTeam(match.awayTeamId);
  if (!home || !away) return null;

  return (
    <div
      onClick={onToggle}
      className={`bg-[#0a0a0a] border transition-all duration-200 cursor-pointer ${
        match.status === 'live'
          ? 'border-[#00f6ac33] hover:border-[#00f6ac66]'
          : 'border-[#1a1a1a] hover:border-[#252525]'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            {match.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
            <span className={`font-mono text-[10px] tracking-widest ${
              match.status === 'live' ? 'text-red-400' :
              match.status === 'upcoming' ? 'text-[#00f6ac]' : 'text-[#2a2a2a]'
            }`}>
              {match.status === 'live' ? `${match.minute}'` :
               match.status === 'upcoming' ? formatHour(match.scheduledTime) : 'FT'}
            </span>
          </div>
          <span className="font-mono text-[#1e1e1e] text-[10px]">{match.division} · GRP {match.group}</span>
          {match.status === 'live' && (
            <span className="ml-auto font-mono text-[10px] text-[#2a2a2a]">{match.shots[0]}–{match.shots[1]} shots</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="flex-1 font-body text-white font-medium text-sm truncate">{home.name}</span>
          <div className="shrink-0 w-20 text-center">
            {match.status === 'upcoming' ? (
              <span className="font-display text-[#2a2a2a] text-lg font-bold">vs</span>
            ) : (
              <span className={`font-display text-xl font-bold ${match.status === 'live' ? 'text-[#00f6ac]' : 'text-white'}`}>
                {match.homeScore} — {match.awayScore}
              </span>
            )}
          </div>
          <span className="flex-1 font-body text-white font-medium text-sm truncate text-right">{away.name}</span>
        </div>
        {match.status === 'live' && (
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[#2a2a2a] text-[10px] w-7">{match.possession[0]}%</span>
            <div className="flex-1 bg-[#111] h-px rounded-full overflow-hidden">
              <div className="h-full bg-[#00f6ac88] rounded-full transition-all duration-1000" style={{ width: `${match.possession[0]}%` }} />
            </div>
            <span className="font-mono text-[#2a2a2a] text-[10px] w-7 text-right">{match.possession[1]}%</span>
          </div>
        )}
      </div>
      {expanded && match.events.length > 0 && (
        <div className="border-t border-[#0f0f0f] px-4 py-3 space-y-1.5">
          <div className="font-mono text-[9px] text-[#2a2a2a] tracking-[0.3em] mb-2">MATCH EVENTS</div>
          {match.events.map((ev, i) => {
            const badge = EVENT_BADGE[ev.type] || { label: ev.type.toUpperCase(), cls: 'bg-[#1a1a1a] text-[#444]' };
            const tName = ev.teamId === match.homeTeamId ? home.shortName : away.shortName;
            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="font-mono text-[#00f6ac] w-7 shrink-0 text-right">{ev.minute}'</span>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 shrink-0 ${badge.cls}`}>{badge.label}</span>
                <span className="font-body text-[#555] truncate">{ev.playerName}</span>
                <span className="font-mono text-[#2a2a2a] text-[10px] ml-auto shrink-0">{tName}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GroupSessionBanner() {
  const [minsLeft, setMinsLeft] = useState(minutesUntilGroupChange());
  const activeGroup = getActiveGroup();
  const nextGroup = getNextGroup();
  useEffect(() => {
    const t = setInterval(() => setMinsLeft(minutesUntilGroupChange()), 60000);
    return () => clearInterval(t);
  }, []);
  const hrs = Math.floor(minsLeft / 60);
  const mins = minsLeft % 60;
  return (
    <div className="flex flex-wrap items-center gap-4 bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-2.5 mb-6 text-xs">
      <span className="font-mono text-[#2a2a2a] tracking-widest">ACTIVE SESSION</span>
      <span className="font-display font-bold text-[#00f6ac] tracking-wider">GROUP {activeGroup}</span>
      <span className="text-[#1a1a1a]">·</span>
      <span className="font-mono text-[#333]">NEXT: GROUP {nextGroup}</span>
      <span className="ml-auto font-mono text-[#2a2a2a]">
        {hrs > 0 ? `${hrs}h ` : ''}{mins}m remaining
      </span>
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
  const [scheduleGroup, setScheduleGroup] = useState<Group>(getActiveGroup());
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const addLiveEvent = useCallback(() => {
    const live = matches.filter(m => m.status === 'live');
    if (!live.length) return;
    const match = live[rnd(0, live.length - 1)];
    const event = generateLiveEvent(match);
    const now = new Date();
    const time = `${now.getUTCHours().toString().padStart(2,'0')}:${now.getUTCMinutes().toString().padStart(2,'0')} UTC`;
    setLiveLog(prev => [{ id: Date.now(), text: event, time }, ...prev.slice(0, 29)]);
    setTicker(t => t + 1);
  }, [matches]);

  const tickMatches = useCallback(() => {
    setMatches(prev => prev.map(m => {
      if (m.status !== 'live') return m;
      const newMin = Math.min(m.minute + 1, 50);
      let hs = m.homeScore, as = m.awayScore;
      if (Math.random() < 0.03) { if (Math.random() > 0.5) hs++; else as++; }
      const newStatus: Match['status'] = newMin >= 50 ? 'finished' : 'live';
      return { ...m, minute: newMin, homeScore: hs, awayScore: as, status: newStatus };
    }));
  }, []);

  useEffect(() => {
    const t1 = setInterval(tickMatches, 3000);
    const t2 = setInterval(addLiveEvent, 5000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [tickMatches, addLiveEvent]);

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const finishedMatches = matches.filter(m => m.status === 'finished');

  const tickerItems = [
    ...liveMatches.map(m => {
      const h = getTeam(m.homeTeamId); const a = getTeam(m.awayTeamId);
      return `LIVE  ${h?.shortName} ${m.homeScore}:${m.awayScore} ${a?.shortName}  ${m.minute}'`;
    }),
    ...finishedMatches.slice(0, 6).map(m => {
      const h = getTeam(m.homeTeamId); const a = getTeam(m.awayTeamId);
      return `FT  ${h?.shortName} ${m.homeScore}:${m.awayScore} ${a?.shortName}`;
    }),
    'USL D1 / D2  ·  32 CLUBS  ·  SEASON 2025',
  ];

  const scheduleMatches = matches
    .filter(m => m.division === scheduleDiv && m.group === scheduleGroup)
    .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());

  return (
    <div className="min-h-screen bg-[#020202] font-body scan-effect">

      {/* TICKER */}
      <div className="bg-[#00f6ac] h-9 overflow-hidden flex items-center select-none">
        <div className="bg-[#020202] text-[#00f6ac] font-display text-xs font-bold px-4 h-full flex items-center shrink-0 tracking-[0.2em] border-r border-[#00f6ac22]">
          USL
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-16 whitespace-nowrap animate-ticker" key={ticker % 10}>
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[#020202] font-mono text-xs font-semibold tracking-wide shrink-0">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="border-b border-[#111] bg-[#050505] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveSection('live')}>
            <div className="w-10 h-10 bg-[#00f6ac] flex items-center justify-center">
              <span className="font-display font-bold text-[#020202] text-xs tracking-widest">USL</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-white text-base leading-none tracking-[0.12em]">
                UNIVERSAL SOCCER LEAGUE
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 font-display text-sm tracking-wider transition-all duration-150 ${
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
            <div className="hidden md:flex items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f6ac] animate-pulse" />
              <span className="font-mono text-[#00f6ac] text-xs">{liveMatches.length} LIVE</span>
            </div>
            <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#111] grid grid-cols-3 gap-px bg-[#111]">
            {NAV_ITEMS.map(item => (
              <button key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex flex-col items-center gap-1 py-3 font-display text-xs tracking-wider bg-[#050505] ${
                  activeSection === item.id ? 'text-[#00f6ac]' : 'text-[#444]'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* ══ LIVE ══ */}
        {activeSection === 'live' && (
          <div className="animate-slide-up">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider">
                LIVE <span style={{ color: '#00f6ac', textShadow: '0 0 30px #00f6ac33' }}>MATCHES</span>
              </h1>
              {liveMatches.length > 0 && (
                <div className="flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-red-400 text-xs font-bold">{liveMatches.length} IN PROGRESS</span>
                </div>
              )}
            </div>
            <GroupSessionBanner />
            <div className="grid xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-5">
                {liveMatches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-[#00f6ac] mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f6ac] animate-pulse" /> ON AIR NOW
                    </div>
                    <div className="space-y-2">
                      {liveMatches.map(m => (
                        <MatchCard key={m.id} match={m}
                          expanded={expandedMatch === m.id}
                          onToggle={() => setExpandedMatch(expandedMatch === m.id ? null : m.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {upcomingMatches.length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.3em] text-[#2a2a2a] mb-3">UPCOMING</div>
                    <div className="space-y-2">
                      {upcomingMatches.slice(0, 6).map(m => <MatchCard key={m.id} match={m} expanded={false} onToggle={() => {}} />)}
                    </div>
                  </div>
                )}
                {finishedMatches.length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.3em] text-[#1e1e1e] mb-3">FINISHED</div>
                    <div className="space-y-2">
                      {finishedMatches.slice(0, 6).map(m => <MatchCard key={m.id} match={m} expanded={false} onToggle={() => {}} />)}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] flex flex-col">
                <div className="border-b border-[#1a1a1a] p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f6ac] animate-pulse" />
                    <span className="font-display text-xs tracking-[0.2em] text-[#00f6ac]">LIVE FEED</span>
                  </div>
                  <span className="font-mono text-[#1e1e1e] text-xs">{liveLog.length}</span>
                </div>
                <div className="overflow-y-auto p-4 min-h-[400px] max-h-[560px]">
                  {liveLog.length === 0 ? (
                    <div className="text-[#1e1e1e] font-mono text-xs text-center mt-16">Waiting for events...</div>
                  ) : liveLog.map(ev => (
                    <div key={ev.id} className="flex gap-3 py-2.5 border-b border-[#0d0d0d] animate-fade-in">
                      <span className="font-mono text-[#222] text-[10px] shrink-0 mt-0.5 w-16">{ev.time}</span>
                      <span className="font-body text-[#666] text-xs leading-relaxed">{ev.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ STATS ══ */}
        {activeSection === 'stats' && (
          <div className="animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider">
                STATI<span style={{ color: '#00f6ac' }}>STICS</span>
              </h1>
              <div className="flex gap-1">
                {(['D1','D2'] as Division[]).map(d => (
                  <button key={d} onClick={() => setStatsDiv(d)}
                    className={`px-6 py-2.5 font-display text-sm tracking-wider transition-all ${
                      statsDiv === d ? 'bg-[#00f6ac] text-[#020202] font-bold' : 'bg-[#0d0d0d] text-[#444] hover:text-white border border-[#1a1a1a]'
                    }`}
                  >{d}</button>
                ))}
              </div>
            </div>

            {/* Standings */}
            <div className="mb-10">
              <div className="font-mono text-[9px] tracking-[0.3em] text-[#00f6ac] mb-4">STANDINGS · {statsDiv}</div>
              <div className="grid md:grid-cols-2 gap-4">
                {(['A','B','C','D'] as Group[]).map(group => {
                  const gt = TEAMS.filter(t => t.division === statsDiv && t.group === group).sort((a,b) => b.points - a.points);
                  return (
                    <div key={group} className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden">
                      <div className="border-b border-[#1a1a1a] px-4 py-2.5 bg-[#0c0c0c]">
                        <span className="font-display text-xs tracking-[0.3em] text-[#333]">GROUP {group}</span>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#0f0f0f]">
                            {['#','Club','P','W','D','L','GF','GA','Pts'].map(h => (
                              <th key={h} className={`py-2 px-2 font-mono text-[9px] font-normal text-center
                                ${h === 'Club' ? 'text-left pl-3' : ''}
                                ${h === '#' ? 'pl-4 text-left' : ''}
                                ${h === 'Pts' ? 'text-[#00f6ac]' : 'text-[#222]'}
                              `}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {gt.map((team, idx) => (
                            <tr key={team.id} className={`border-b border-[#080808] hover:bg-[#0f0f0f] transition-colors ${idx === 0 ? 'bg-[#00f6ac06]' : ''}`}>
                              <td className="py-2.5 pl-4 pr-2 font-mono text-[#222] text-xs">{idx+1}</td>
                              <td className="py-2.5 pl-3 pr-2">
                                <div className={`font-body text-xs font-medium ${idx === 0 ? 'text-[#00f6ac]' : 'text-white'}`}>{team.name}</div>
                              </td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#2a2a2a] text-xs">{team.wins+team.draws+team.losses}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-white text-xs">{team.wins}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#2a2a2a] text-xs">{team.draws}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#2a2a2a] text-xs">{team.losses}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#333] text-xs">{team.goalsFor}</td>
                              <td className="py-2.5 px-2 text-center font-mono text-[#222] text-xs">{team.goalsAgainst}</td>
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

            {/* Field players */}
            <div className="mb-8">
              <div className="font-mono text-[9px] tracking-[0.3em] text-[#00f6ac] mb-4">FIELD PLAYERS · {statsDiv}</div>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#111]">
                      {['#','Player','Club','G','A','G+A','YC','Min','KPI'].map(h => (
                        <th key={h} className={`py-3 px-3 font-mono text-[9px] font-normal text-center
                          ${['#','Player','Club'].includes(h) ? 'text-left' : ''}
                          ${h === '#' ? 'pl-4' : ''}
                          ${h === 'G' || h === 'KPI' ? 'text-[#00f6ac]' : 'text-[#222]'}
                        `}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLAYERS
                      .filter(p => !p.isGoalkeeper && getTeam(p.teamId)?.division === statsDiv)
                      .sort((a,b) => b.goals - a.goals)
                      .map((player, idx) => {
                        const team = getTeam(player.teamId);
                        const kpi = ((player.goals * 2 + player.assists * 1.5) / Math.max(player.minutesPlayed / 90, 1)).toFixed(1);
                        return (
                          <tr key={player.id} className={`border-b border-[#080808] hover:bg-[#0d0d0d] transition-colors ${idx === 0 ? 'bg-[#00f6ac06]' : ''}`}>
                            <td className="py-3 pl-4 pr-2 font-mono text-[#222] text-xs">{idx+1}</td>
                            <td className="py-3 px-3 font-body text-white font-medium text-sm">{player.name}</td>
                            <td className="py-3 px-3 font-mono text-[#333] text-xs">{team?.shortName}</td>
                            <td className="py-3 px-3 text-center">
                              <span className="font-display font-bold text-[#00f6ac] text-base">{player.goals}</span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-white text-sm">{player.assists}</td>
                            <td className="py-3 px-3 text-center font-mono text-[#444] text-sm">{player.goals+player.assists}</td>
                            <td className="py-3 px-3 text-center">
                              <span className={`font-mono text-xs ${player.yellowCards >= 4 ? 'text-yellow-400' : 'text-[#2a2a2a]'}`}>{player.yellowCards}</span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-[#222] text-xs">{player.minutesPlayed}'</td>
                            <td className="py-3 px-3 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <div className="h-px rounded-full bg-[#00f6ac]" style={{ width: `${Math.min(parseFloat(kpi)/5*36,36)}px`, minWidth: '3px' }} />
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

            {/* Goalkeepers */}
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] text-[#00f6ac] mb-4">GOALKEEPERS · {statsDiv}</div>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#111]">
                      {['#','Goalkeeper','Club','Saves','CS','YC','Min'].map(h => (
                        <th key={h} className={`py-3 px-3 font-mono text-[9px] font-normal text-center
                          ${['#','Goalkeeper','Club'].includes(h) ? 'text-left' : ''}
                          ${h === '#' ? 'pl-4' : ''}
                          ${h === 'Saves' ? 'text-[#00f6ac]' : 'text-[#222]'}
                        `}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLAYERS
                      .filter(p => p.isGoalkeeper && getTeam(p.teamId)?.division === statsDiv)
                      .sort((a,b) => (b.saves||0) - (a.saves||0))
                      .map((player, idx) => {
                        const team = getTeam(player.teamId);
                        return (
                          <tr key={player.id} className={`border-b border-[#080808] hover:bg-[#0d0d0d] transition-colors ${idx === 0 ? 'bg-[#00f6ac06]' : ''}`}>
                            <td className="py-3 pl-4 pr-2 font-mono text-[#222] text-xs">{idx+1}</td>
                            <td className="py-3 px-3 font-body text-white font-medium text-sm">{player.name}</td>
                            <td className="py-3 px-3 font-mono text-[#333] text-xs">{team?.shortName}</td>
                            <td className="py-3 px-3 text-center">
                              <span className="font-display font-bold text-[#00f6ac] text-base">{player.saves??0}</span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-white text-sm">{player.cleanSheets??0}</td>
                            <td className="py-3 px-3 text-center">
                              <span className={`font-mono text-xs ${player.yellowCards >= 2 ? 'text-yellow-400' : 'text-[#2a2a2a]'}`}>{player.yellowCards}</span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono text-[#222] text-xs">{player.minutesPlayed}'</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ SCHEDULE ══ */}
        {activeSection === 'schedule' && (
          <div className="animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider">
                  SCHE<span style={{ color: '#00f6ac' }}>DULE</span>
                </h1>
                <p className="font-mono text-[#222] text-[10px] mt-1 tracking-widest">
                  24H HORIZON · KICKOFFS ON THE HOUR · ROUND-ROBIN
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {(['D1','D2'] as Division[]).map(d => (
                  <button key={d} onClick={() => setScheduleDiv(d)}
                    className={`px-5 py-2 font-display text-sm tracking-wider transition-all ${
                      scheduleDiv === d ? 'bg-[#00f6ac] text-[#020202] font-bold' : 'bg-[#0d0d0d] text-[#444] hover:text-white border border-[#1a1a1a]'
                    }`}
                  >{d}</button>
                ))}
                {(['A','B','C','D'] as Group[]).map(g => (
                  <button key={g} onClick={() => setScheduleGroup(g)}
                    className={`px-4 py-2 font-display text-sm tracking-wider transition-all ${
                      scheduleGroup === g ? 'bg-[#00f6ac] text-[#020202] font-bold' : 'bg-[#0d0d0d] text-[#444] hover:text-white border border-[#1a1a1a]'
                    }`}
                  >GRP {g}</button>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3 mb-5 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#2a2a2a] tracking-widest">ACTIVE GROUP</span>
                <span className="font-display font-bold text-[#00f6ac]">{getActiveGroup()}</span>
              </div>
              <div className="h-3 w-px bg-[#1a1a1a]" />
              <span className="font-mono text-[#252525]">NEXT: GROUP {getNextGroup()}</span>
              <div className="ml-auto flex items-center gap-2">
                <Icon name="Clock" size={11} className="text-[#2a2a2a]" />
                <span className="font-mono text-[#2a2a2a]">{minutesUntilGroupChange()}m until switch</span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a]">
              <div className="border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
                <span className="font-display text-sm tracking-wider text-white">{scheduleDiv} · GROUP {scheduleGroup}</span>
                <span className="font-mono text-[9px] text-[#333]">{scheduleMatches.length} MATCHES · ROUND-ROBIN</span>
              </div>
              <div className="divide-y divide-[#0d0d0d]">
                {scheduleMatches.length === 0 ? (
                  <div className="px-4 py-8 text-center font-mono text-[#1e1e1e] text-xs">No matches found</div>
                ) : scheduleMatches.map((match, idx) => {
                  const home = getTeam(match.homeTeamId);
                  const away = getTeam(match.awayTeamId);
                  return (
                    <div key={match.id} className={`px-4 py-3.5 flex items-center gap-4 ${match.status === 'live' ? 'bg-[#00f6ac06]' : ''}`}>
                      <span className="font-mono text-[#1a1a1a] text-xs w-4 shrink-0">{idx+1}</span>
                      <div className="w-14 shrink-0">
                        {match.status === 'live' ? (
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="font-mono text-red-400 text-xs font-bold">{match.minute}'</span>
                          </div>
                        ) : match.status === 'upcoming' ? (
                          <span className="font-mono text-[#00f6ac] text-xs">{formatHour(match.scheduledTime)}</span>
                        ) : (
                          <span className="font-mono text-[#222] text-xs">FT</span>
                        )}
                      </div>
                      <div className="flex-1 flex items-center gap-3 min-w-0">
                        <span className="font-body text-xs text-white truncate flex-1">{home?.name}</span>
                        <span className={`font-display text-sm font-bold shrink-0 w-16 text-center ${
                          match.status === 'live' ? 'text-[#00f6ac]' : match.status === 'upcoming' ? 'text-[#222]' : 'text-white'
                        }`}>
                          {match.status === 'upcoming' ? 'vs' : `${match.homeScore} : ${match.awayScore}`}
                        </span>
                        <span className="font-body text-xs text-white truncate flex-1 text-right">{away?.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══ PROJECTS ══ */}
        {activeSection === 'projects' && (
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-8">
              PROJ<span style={{ color: '#00f6ac' }}>ECTS</span>
            </h1>
            <div className="max-w-2xl">
              <div className="bg-[#0a0a0a] border border-[#00f6ac22] overflow-hidden">
                <div className="h-px bg-[#00f6ac]" />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#00f6ac]">ANNOUNCEMENT</span>
                    <span className="font-mono text-[9px] text-[#222]">April 2025</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white tracking-wide leading-snug mb-4">
                    USL Explores Expansion Into Basketball
                  </h2>
                  <p className="font-body text-[#555] leading-relaxed mb-4">
                    Universal Soccer League is evaluating the launch of a dedicated basketball division
                    under the USL brand. The initiative, still in the early feasibility phase, would
                    replicate the league's state-based club model across two competitive divisions with
                    full group-stage and knockout formats.
                  </p>
                  <p className="font-body text-[#333] text-sm leading-relaxed">
                    A formal decision is expected in Q3 2025 following a review of market demand,
                    venue availability, and sponsorship viability across target states.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[#2a2a2a] text-xs font-mono">
                    <Icon name="ArrowRight" size={12} />
                    <span>FULL STATEMENT PENDING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ ABOUT ══ */}
        {activeSection === 'about' && (
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-8">
              ABOUT <span style={{ color: '#00f6ac' }}>USL</span>
            </h1>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6">
                  <div className="font-mono text-[9px] tracking-[0.3em] text-[#00f6ac] mb-4">MISSION</div>
                  <p className="font-body text-[#555] leading-relaxed text-sm">
                    Universal Soccer League is a professional soccer competition built on transparency,
                    competition, and development. With two divisions across 32 clubs representing states
                    throughout the USA, USL provides a structured platform for clubs to compete at the
                    highest level with full live coverage of every match.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '32',  label: 'Clubs'          },
                    { value: '2',   label: 'Divisions'       },
                    { value: '8',   label: 'Groups'          },
                    { value: '24h', label: 'Daily coverage'  },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 text-center">
                      <div className="font-display text-3xl font-bold" style={{ color: '#00f6ac' }}>{stat.value}</div>
                      <div className="font-body text-[#2a2a2a] text-sm mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Competition Format', desc: 'Two divisions of 16 clubs each, split into four groups of four. Groups rotate every 6 hours — each group plays a full round-robin (6 matches) before the next group takes over.' },
                  { title: 'Match Timing', desc: 'Every match kicks off on the hour. Each game runs 50 minutes, leaving a 10-minute window before the next fixture in the rotation begins.' },
                  { title: 'Points System', desc: 'Win — 3 points, Draw — 1, Loss — 0. Group leaders advance to the USL Cup knockout stage at the end of the season.' },
                  { title: 'Player Statistics', desc: 'Field players are tracked by goals, assists, and key passes with a KPI index per 90 minutes. Goalkeepers are evaluated separately by saves and clean sheets.' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 flex gap-4">
                    <div className="w-px bg-[#00f6ac] shrink-0" style={{ minHeight: '40px' }} />
                    <div>
                      <h3 className="font-display text-sm font-bold text-white tracking-wide mb-1.5">{item.title}</h3>
                      <p className="font-body text-[#3a3a3a] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ NEWS ══ */}
        {activeSection === 'news' && (
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-8">
              SPORT<span style={{ color: '#00f6ac' }}>S NEWS</span>
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { date: 'Today',       tag: 'FIFA',           title: 'FIFA raises 2026 World Cup prize fund to $1 billion',   preview: 'Host nations USA, Canada, and Mexico set to benefit from the record tournament revenue.' },
                { date: 'Today',       tag: 'PREMIER LEAGUE', title: 'Man City manager extends contract through 2027',         preview: 'Club confirms long-term commitment ahead of planned summer squad rebuild.' },
                { date: 'Yesterday',   tag: 'CHAMPIONS LEAGUE',title: 'Real Madrid advance after extra-time drama',            preview: 'Goal in the 118th minute sealed aggregate progress at a packed Bernabeu.' },
                { date: 'Yesterday',   tag: 'MLS',            title: 'Inter Miami lead the Eastern Conference',               preview: 'Five straight wins put Miami three points clear heading into the international break.' },
                { date: '2 days ago',  tag: 'TRANSFERS',      title: 'Juventus confirm €85m midfielder signing',             preview: 'Brazilian joins on July 1 on a four-year deal agreed ahead of the summer window.' },
                { date: '3 days ago',  tag: 'BUNDESLIGA',     title: 'Bayern clinch title with four games remaining',         preview: '3-0 against Dortmund mathematically confirmed a 13th consecutive Bundesliga crown.' },
              ].map((news, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00f6ac22] transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="h-px bg-[#1a1a1a] group-hover:bg-[#00f6ac] transition-all duration-300" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] text-[#00f6ac] tracking-[0.2em]">{news.tag}</span>
                      <span className="font-mono text-[9px] text-[#1e1e1e]">{news.date}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-white tracking-wide leading-snug mb-2.5 group-hover:text-[#00f6ac] transition-colors duration-200">
                      {news.title}
                    </h3>
                    <p className="font-body text-[#2a2a2a] text-xs leading-relaxed">{news.preview}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-[#1e1e1e] text-xs font-mono group-hover:text-[#00f6ac] transition-all group-hover:gap-2.5">
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
            <div className="w-7 h-7 bg-[#00f6ac] flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-[#020202] text-[9px] tracking-widest">USL</span>
            </div>
            <span className="font-mono text-[#1e1e1e] text-xs">Universal Soccer League © 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f6ac] animate-pulse" />
            <span className="font-mono text-[#00f6ac] text-xs tracking-widest">LIVE PLATFORM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
