export type Division = 'D1' | 'D2';
export type Group = 'A' | 'B' | 'C' | 'D';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  division: Division;
  group: Group;
  logo: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number;
  saves?: number;
  tackles?: number;
  keyPasses?: number;
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow' | 'red' | 'substitution' | 'penalty' | 'miss' | 'save';
  teamId: string;
  playerName: string;
  description: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'upcoming' | 'finished';
  minute: number;
  division: Division;
  group: Group;
  scheduledTime: string;
  events: MatchEvent[];
  possession: [number, number];
  shots: [number, number];
  corners: [number, number];
}

export const TEAMS: Team[] = [
  // D1 Group A
  { id: 'd1-a1', name: 'FC Storm', shortName: 'STM', city: 'Москва', division: 'D1', group: 'A', logo: '⚡', wins: 8, draws: 2, losses: 2, goalsFor: 28, goalsAgainst: 12, points: 26 },
  { id: 'd1-a2', name: 'Titan FC', shortName: 'TIT', city: 'Санкт-Петербург', division: 'D1', group: 'A', logo: '🔱', wins: 7, draws: 3, losses: 2, goalsFor: 24, goalsAgainst: 14, points: 24 },
  { id: 'd1-a3', name: 'Dynamo Red', shortName: 'DRD', city: 'Казань', division: 'D1', group: 'A', logo: '🔴', wins: 5, draws: 4, losses: 3, goalsFor: 19, goalsAgainst: 16, points: 19 },
  { id: 'd1-a4', name: 'Iron Eagles', shortName: 'IRE', city: 'Новосибирск', division: 'D1', group: 'A', logo: '🦅', wins: 2, draws: 2, losses: 8, goalsFor: 11, goalsAgainst: 25, points: 8 },
  // D1 Group B
  { id: 'd1-b1', name: 'Phoenix FC', shortName: 'PHX', city: 'Екатеринбург', division: 'D1', group: 'B', logo: '🔥', wins: 9, draws: 1, losses: 2, goalsFor: 31, goalsAgainst: 10, points: 28 },
  { id: 'd1-b2', name: 'Cosmos United', shortName: 'CSM', city: 'Краснодар', division: 'D1', group: 'B', logo: '🌌', wins: 6, draws: 4, losses: 2, goalsFor: 22, goalsAgainst: 15, points: 22 },
  { id: 'd1-b3', name: 'Silver Wolves', shortName: 'SLW', city: 'Ростов', division: 'D1', group: 'B', logo: '🐺', wins: 4, draws: 3, losses: 5, goalsFor: 17, goalsAgainst: 20, points: 15 },
  { id: 'd1-b4', name: 'Blue Ocean', shortName: 'BOC', city: 'Воронеж', division: 'D1', group: 'B', logo: '🌊', wins: 1, draws: 1, losses: 10, goalsFor: 8, goalsAgainst: 30, points: 4 },
  // D1 Group C
  { id: 'd1-c1', name: 'Thunder FC', shortName: 'THU', city: 'Уфа', division: 'D1', group: 'C', logo: '⛈️', wins: 7, draws: 2, losses: 3, goalsFor: 25, goalsAgainst: 13, points: 23 },
  { id: 'd1-c2', name: 'Red Force', shortName: 'RDF', city: 'Самара', division: 'D1', group: 'C', logo: '💪', wins: 6, draws: 3, losses: 3, goalsFor: 21, goalsAgainst: 16, points: 21 },
  { id: 'd1-c3', name: 'Arctic FC', shortName: 'ARC', city: 'Пермь', division: 'D1', group: 'C', logo: '❄️', wins: 4, draws: 2, losses: 6, goalsFor: 15, goalsAgainst: 22, points: 14 },
  { id: 'd1-c4', name: 'Nomad FC', shortName: 'NMD', city: 'Омск', division: 'D1', group: 'C', logo: '🏕️', wins: 1, draws: 3, losses: 8, goalsFor: 9, goalsAgainst: 28, points: 6 },
  // D1 Group D
  { id: 'd1-d1', name: 'Gold Rush', shortName: 'GLD', city: 'Нижний Новгород', division: 'D1', group: 'D', logo: '🥇', wins: 8, draws: 2, losses: 2, goalsFor: 27, goalsAgainst: 11, points: 26 },
  { id: 'd1-d2', name: 'Dark Knights', shortName: 'DKN', city: 'Челябинск', division: 'D1', group: 'D', logo: '⚔️', wins: 6, draws: 3, losses: 3, goalsFor: 20, goalsAgainst: 15, points: 21 },
  { id: 'd1-d3', name: 'Vortex FC', shortName: 'VRT', city: 'Тюмень', division: 'D1', group: 'D', logo: '🌀', wins: 3, draws: 4, losses: 5, goalsFor: 14, goalsAgainst: 19, points: 13 },
  { id: 'd1-d4', name: 'Horizon FC', shortName: 'HRZ', city: 'Томск', division: 'D1', group: 'D', logo: '🌅', wins: 1, draws: 1, losses: 10, goalsFor: 7, goalsAgainst: 31, points: 4 },
  // D2 Group A
  { id: 'd2-a1', name: 'Rising Stars', shortName: 'RST', city: 'Ярославль', division: 'D2', group: 'A', logo: '⭐', wins: 7, draws: 3, losses: 2, goalsFor: 26, goalsAgainst: 13, points: 24 },
  { id: 'd2-a2', name: 'Green Valley', shortName: 'GVL', city: 'Иркутск', division: 'D2', group: 'A', logo: '🌿', wins: 6, draws: 2, losses: 4, goalsFor: 22, goalsAgainst: 17, points: 20 },
  { id: 'd2-a3', name: 'Storm Riders', shortName: 'SRI', city: 'Хабаровск', division: 'D2', group: 'A', logo: '🏄', wins: 4, draws: 3, losses: 5, goalsFor: 16, goalsAgainst: 20, points: 15 },
  { id: 'd2-a4', name: 'Wild Bears', shortName: 'WBR', city: 'Тула', division: 'D2', group: 'A', logo: '🐻', wins: 1, draws: 2, losses: 9, goalsFor: 9, goalsAgainst: 27, points: 5 },
  // D2 Group B
  { id: 'd2-b1', name: 'Night Hawks', shortName: 'NHW', city: 'Калуга', division: 'D2', group: 'B', logo: '🦅', wins: 8, draws: 1, losses: 3, goalsFor: 29, goalsAgainst: 14, points: 25 },
  { id: 'd2-b2', name: 'Stone FC', shortName: 'STO', city: 'Владивосток', division: 'D2', group: 'B', logo: '🪨', wins: 5, draws: 4, losses: 3, goalsFor: 18, goalsAgainst: 15, points: 19 },
  { id: 'd2-b3', name: 'Lucky Stars', shortName: 'LST', city: 'Брянск', division: 'D2', group: 'B', logo: '🌟', wins: 3, draws: 3, losses: 6, goalsFor: 13, goalsAgainst: 21, points: 12 },
  { id: 'd2-b4', name: 'Rapid FC', shortName: 'RAP', city: 'Курск', division: 'D2', group: 'B', logo: '💨', wins: 2, draws: 2, losses: 8, goalsFor: 11, goalsAgainst: 26, points: 8 },
  // D2 Group C
  { id: 'd2-c1', name: 'King Lions', shortName: 'KLN', city: 'Белгород', division: 'D2', group: 'C', logo: '🦁', wins: 9, draws: 0, losses: 3, goalsFor: 32, goalsAgainst: 12, points: 27 },
  { id: 'd2-c2', name: 'Spark FC', shortName: 'SPK', city: 'Кострома', division: 'D2', group: 'C', logo: '✨', wins: 6, draws: 3, losses: 3, goalsFor: 21, goalsAgainst: 16, points: 21 },
  { id: 'd2-c3', name: 'Forest FC', shortName: 'FOR', city: 'Архангельск', division: 'D2', group: 'C', logo: '🌲', wins: 3, draws: 3, losses: 6, goalsFor: 14, goalsAgainst: 22, points: 12 },
  { id: 'd2-c4', name: 'Sand Dunes', shortName: 'SDN', city: 'Астрахань', division: 'D2', group: 'C', logo: '🏜️', wins: 0, draws: 4, losses: 8, goalsFor: 8, goalsAgainst: 30, points: 4 },
  // D2 Group D
  { id: 'd2-d1', name: 'Iron Wolves', shortName: 'IWL', city: 'Пенза', division: 'D2', group: 'D', logo: '🐺', wins: 7, draws: 2, losses: 3, goalsFor: 24, goalsAgainst: 14, points: 23 },
  { id: 'd2-d2', name: 'Blue Fire', shortName: 'BLF', city: 'Саратов', division: 'D2', group: 'D', logo: '🔵', wins: 6, draws: 2, losses: 4, goalsFor: 20, goalsAgainst: 16, points: 20 },
  { id: 'd2-d3', name: 'Thunder Birds', shortName: 'TBD', city: 'Ульяновск', division: 'D2', group: 'D', logo: '🐦', wins: 3, draws: 4, losses: 5, goalsFor: 15, goalsAgainst: 20, points: 13 },
  { id: 'd2-d4', name: 'Cloud Nine', shortName: 'CLN', city: 'Набережные Челны', division: 'D2', group: 'D', logo: '☁️', wins: 1, draws: 2, losses: 9, goalsFor: 8, goalsAgainst: 28, points: 5 },
];

export const PLAYERS: Player[] = [
  { id: 'p1', name: 'А. Воронов', teamId: 'd1-a1', position: 'FWD', goals: 14, assists: 6, yellowCards: 2, redCards: 0, minutesPlayed: 980, rating: 8.4 },
  { id: 'p2', name: 'М. Садиков', teamId: 'd1-b1', position: 'FWD', goals: 13, assists: 4, yellowCards: 3, redCards: 0, minutesPlayed: 940, rating: 8.2 },
  { id: 'p3', name: 'Д. Крылов', teamId: 'd1-d1', position: 'FWD', goals: 12, assists: 8, yellowCards: 1, redCards: 0, minutesPlayed: 1020, rating: 8.6 },
  { id: 'p4', name: 'К. Ларин', teamId: 'd1-c1', position: 'MID', goals: 8, assists: 11, yellowCards: 4, redCards: 0, minutesPlayed: 1100, rating: 8.3, keyPasses: 42 },
  { id: 'p5', name: 'Р. Антонов', teamId: 'd1-a2', position: 'MID', goals: 6, assists: 9, yellowCards: 2, redCards: 0, minutesPlayed: 990, rating: 7.9, keyPasses: 38 },
  { id: 'p6', name: 'С. Петров', teamId: 'd1-b1', position: 'DEF', goals: 2, assists: 5, yellowCards: 5, redCards: 1, minutesPlayed: 850, rating: 7.5, tackles: 68 },
  { id: 'p7', name: 'И. Фёдоров', teamId: 'd1-d1', position: 'DEF', goals: 3, assists: 3, yellowCards: 3, redCards: 0, minutesPlayed: 1080, rating: 7.8, tackles: 72 },
  { id: 'p8', name: 'В. Казаков', teamId: 'd1-a1', position: 'GK', goals: 0, assists: 1, yellowCards: 1, redCards: 0, minutesPlayed: 1080, rating: 8.0, saves: 54 },
  { id: 'p9', name: 'Н. Баранов', teamId: 'd1-c2', position: 'FWD', goals: 10, assists: 5, yellowCards: 2, redCards: 0, minutesPlayed: 900, rating: 7.9 },
  { id: 'p10', name: 'Г. Тихонов', teamId: 'd1-b2', position: 'MID', goals: 5, assists: 10, yellowCards: 1, redCards: 0, minutesPlayed: 1050, rating: 8.1, keyPasses: 45 },
  { id: 'p11', name: 'О. Зайцев', teamId: 'd2-a1', position: 'FWD', goals: 11, assists: 3, yellowCards: 2, redCards: 0, minutesPlayed: 920, rating: 8.0 },
  { id: 'p12', name: 'Е. Щербаков', teamId: 'd2-b1', position: 'FWD', goals: 9, assists: 6, yellowCards: 3, redCards: 0, minutesPlayed: 960, rating: 7.8 },
  { id: 'p13', name: 'А. Соколов', teamId: 'd2-c1', position: 'MID', goals: 7, assists: 12, yellowCards: 1, redCards: 0, minutesPlayed: 1040, rating: 8.5, keyPasses: 50 },
  { id: 'p14', name: 'П. Кузнецов', teamId: 'd2-d1', position: 'DEF', goals: 1, assists: 4, yellowCards: 4, redCards: 0, minutesPlayed: 1010, rating: 7.6, tackles: 65 },
  { id: 'p15', name: 'Т. Максимов', teamId: 'd2-c1', position: 'FWD', goals: 15, assists: 4, yellowCards: 3, redCards: 1, minutesPlayed: 870, rating: 8.7 },
];

const MATCH_EVENTS_POOL: Omit<MatchEvent, 'teamId'>[] = [
  { minute: 0, type: 'goal', playerName: '', description: 'Гол! Удар в ближний угол' },
  { minute: 0, type: 'goal', playerName: '', description: 'Красивый гол с угла штрафной' },
  { minute: 0, type: 'goal', playerName: '', description: 'Пенальти реализован' },
  { minute: 0, type: 'yellow', playerName: '', description: 'Жёлтая карточка за грубость' },
  { minute: 0, type: 'miss', playerName: '', description: 'Удар мимо ворот' },
  { minute: 0, type: 'save', playerName: '', description: 'Вратарь тащит сложный мяч' },
];

export const PLAYER_NAMES = [
  'Воронов', 'Садиков', 'Крылов', 'Ларин', 'Антонов',
  'Петров', 'Фёдоров', 'Казаков', 'Баранов', 'Тихонов',
  'Зайцев', 'Щербаков', 'Соколов', 'Кузнецов', 'Максимов',
  'Иванов', 'Смирнов', 'Попов', 'Новиков', 'Морозов',
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMatches(): Match[] {
  const matches: Match[] = [];
  const now = new Date();

  const groupPairs = [
    ['d1-a1', 'd1-a2'], ['d1-a3', 'd1-a4'],
    ['d1-b1', 'd1-b2'], ['d1-b3', 'd1-b4'],
    ['d1-c1', 'd1-c2'], ['d1-c3', 'd1-c4'],
    ['d1-d1', 'd1-d2'], ['d1-d3', 'd1-d4'],
    ['d2-a1', 'd2-a2'], ['d2-a3', 'd2-a4'],
    ['d2-b1', 'd2-b2'], ['d2-b3', 'd2-b4'],
    ['d2-c1', 'd2-c2'], ['d2-c3', 'd2-c4'],
    ['d2-d1', 'd2-d2'], ['d2-d3', 'd2-d4'],
  ];

  groupPairs.forEach(([homeId, awayId], index) => {
    const homeTeam = TEAMS.find(t => t.id === homeId)!;
    const awayTeam = TEAMS.find(t => t.id === awayId)!;

    const hoursOffset = index * 1.5;
    const matchTime = new Date(now);
    matchTime.setHours(matchTime.getHours() - 0.5 + hoursOffset * 0.3);

    const isLive = index < 6;
    const isUpcoming = index >= 6 && index < 10;
    const isFinished = index >= 10;

    const minute = isLive ? randomInt(15, 85) : isFinished ? 90 : 0;
    const homeScore = isLive ? randomInt(0, 3) : isFinished ? randomInt(0, 4) : 0;
    const awayScore = isLive ? randomInt(0, 3) : isFinished ? randomInt(0, 4) : 0;

    const events: MatchEvent[] = [];
    if (isLive || isFinished) {
      const numEvents = randomInt(2, 6);
      for (let i = 0; i < numEvents; i++) {
        const pool = MATCH_EVENTS_POOL[randomInt(0, MATCH_EVENTS_POOL.length - 1)];
        events.push({
          minute: randomInt(1, minute || 90),
          type: pool.type,
          teamId: Math.random() > 0.5 ? homeId : awayId,
          playerName: PLAYER_NAMES[randomInt(0, PLAYER_NAMES.length - 1)],
          description: pool.description,
        });
      }
      events.sort((a, b) => a.minute - b.minute);
    }

    const upcomingTime = new Date(now);
    upcomingTime.setHours(upcomingTime.getHours() + randomInt(1, 12));

    matches.push({
      id: `match-${index}`,
      homeTeamId: homeId,
      awayTeamId: awayId,
      homeScore,
      awayScore,
      status: isLive ? 'live' : isUpcoming ? 'upcoming' : 'finished',
      minute,
      division: homeTeam.division,
      group: homeTeam.group,
      scheduledTime: isUpcoming ? upcomingTime.toISOString() : matchTime.toISOString(),
      events,
      possession: [randomInt(40, 65), 0],
      shots: [randomInt(3, 15), randomInt(2, 12)],
      corners: [randomInt(1, 8), randomInt(1, 6)],
    });
  });

  matches.forEach(m => {
    m.possession[1] = 100 - m.possession[0];
  });

  return matches;
}

export const INITIAL_MATCHES = generateMatches();

export function getTeam(id: string) {
  return TEAMS.find(t => t.id === id);
}

export function formatTime(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}
