export type Division = 'D1' | 'D2';
export type Group = 'A' | 'B' | 'C' | 'D';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  state: string;
  division: Division;
  group: Group;
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
  { id: 'd1-a1', name: 'California FC',      shortName: 'CAL', state: 'California',   division: 'D1', group: 'A', wins: 8, draws: 2, losses: 2, goalsFor: 28, goalsAgainst: 12, points: 26 },
  { id: 'd1-a2', name: 'Texas United',        shortName: 'TEX', state: 'Texas',        division: 'D1', group: 'A', wins: 7, draws: 3, losses: 2, goalsFor: 24, goalsAgainst: 14, points: 24 },
  { id: 'd1-a3', name: 'Florida SC',          shortName: 'FLA', state: 'Florida',      division: 'D1', group: 'A', wins: 5, draws: 4, losses: 3, goalsFor: 19, goalsAgainst: 16, points: 19 },
  { id: 'd1-a4', name: 'Ohio FC',             shortName: 'OHI', state: 'Ohio',         division: 'D1', group: 'A', wins: 2, draws: 2, losses: 8, goalsFor: 11, goalsAgainst: 25, points: 8  },
  // D1 Group B
  { id: 'd1-b1', name: 'New York Athletic',   shortName: 'NYA', state: 'New York',     division: 'D1', group: 'B', wins: 9, draws: 1, losses: 2, goalsFor: 31, goalsAgainst: 10, points: 28 },
  { id: 'd1-b2', name: 'Illinois SC',         shortName: 'ILL', state: 'Illinois',     division: 'D1', group: 'B', wins: 6, draws: 4, losses: 2, goalsFor: 22, goalsAgainst: 15, points: 22 },
  { id: 'd1-b3', name: 'Georgia United',      shortName: 'GEO', state: 'Georgia',      division: 'D1', group: 'B', wins: 4, draws: 3, losses: 5, goalsFor: 17, goalsAgainst: 20, points: 15 },
  { id: 'd1-b4', name: 'Michigan FC',         shortName: 'MIC', state: 'Michigan',     division: 'D1', group: 'B', wins: 1, draws: 1, losses: 10, goalsFor: 8, goalsAgainst: 30, points: 4  },
  // D1 Group C
  { id: 'd1-c1', name: 'Washington SC',       shortName: 'WAS', state: 'Washington',   division: 'D1', group: 'C', wins: 7, draws: 2, losses: 3, goalsFor: 25, goalsAgainst: 13, points: 23 },
  { id: 'd1-c2', name: 'Colorado FC',         shortName: 'COL', state: 'Colorado',     division: 'D1', group: 'C', wins: 6, draws: 3, losses: 3, goalsFor: 21, goalsAgainst: 16, points: 21 },
  { id: 'd1-c3', name: 'Arizona United',      shortName: 'ARI', state: 'Arizona',      division: 'D1', group: 'C', wins: 4, draws: 2, losses: 6, goalsFor: 15, goalsAgainst: 22, points: 14 },
  { id: 'd1-c4', name: 'Nevada SC',           shortName: 'NEV', state: 'Nevada',       division: 'D1', group: 'C', wins: 1, draws: 3, losses: 8, goalsFor: 9,  goalsAgainst: 28, points: 6  },
  // D1 Group D
  { id: 'd1-d1', name: 'Oregon FC',           shortName: 'ORE', state: 'Oregon',       division: 'D1', group: 'D', wins: 8, draws: 2, losses: 2, goalsFor: 27, goalsAgainst: 11, points: 26 },
  { id: 'd1-d2', name: 'Virginia United',     shortName: 'VIR', state: 'Virginia',     division: 'D1', group: 'D', wins: 6, draws: 3, losses: 3, goalsFor: 20, goalsAgainst: 15, points: 21 },
  { id: 'd1-d3', name: 'Minnesota SC',        shortName: 'MIN', state: 'Minnesota',    division: 'D1', group: 'D', wins: 3, draws: 4, losses: 5, goalsFor: 14, goalsAgainst: 19, points: 13 },
  { id: 'd1-d4', name: 'Missouri FC',         shortName: 'MIS', state: 'Missouri',     division: 'D1', group: 'D', wins: 1, draws: 1, losses: 10, goalsFor: 7, goalsAgainst: 31, points: 4  },
  // D2 Group A
  { id: 'd2-a1', name: 'Pennsylvania FC',     shortName: 'PEN', state: 'Pennsylvania', division: 'D2', group: 'A', wins: 7, draws: 3, losses: 2, goalsFor: 26, goalsAgainst: 13, points: 24 },
  { id: 'd2-a2', name: 'Tennessee United',    shortName: 'TEN', state: 'Tennessee',    division: 'D2', group: 'A', wins: 6, draws: 2, losses: 4, goalsFor: 22, goalsAgainst: 17, points: 20 },
  { id: 'd2-a3', name: 'Indiana SC',          shortName: 'IND', state: 'Indiana',      division: 'D2', group: 'A', wins: 4, draws: 3, losses: 5, goalsFor: 16, goalsAgainst: 20, points: 15 },
  { id: 'd2-a4', name: 'Kentucky FC',         shortName: 'KEN', state: 'Kentucky',     division: 'D2', group: 'A', wins: 1, draws: 2, losses: 9, goalsFor: 9,  goalsAgainst: 27, points: 5  },
  // D2 Group B
  { id: 'd2-b1', name: 'North Carolina SC',   shortName: 'NCA', state: 'N. Carolina',  division: 'D2', group: 'B', wins: 8, draws: 1, losses: 3, goalsFor: 29, goalsAgainst: 14, points: 25 },
  { id: 'd2-b2', name: 'Maryland United',     shortName: 'MAR', state: 'Maryland',     division: 'D2', group: 'B', wins: 5, draws: 4, losses: 3, goalsFor: 18, goalsAgainst: 15, points: 19 },
  { id: 'd2-b3', name: 'Wisconsin FC',        shortName: 'WIS', state: 'Wisconsin',    division: 'D2', group: 'B', wins: 3, draws: 3, losses: 6, goalsFor: 13, goalsAgainst: 21, points: 12 },
  { id: 'd2-b4', name: 'Iowa SC',             shortName: 'IOW', state: 'Iowa',         division: 'D2', group: 'B', wins: 2, draws: 2, losses: 8, goalsFor: 11, goalsAgainst: 26, points: 8  },
  // D2 Group C
  { id: 'd2-c1', name: 'Utah FC',             shortName: 'UTA', state: 'Utah',         division: 'D2', group: 'C', wins: 9, draws: 0, losses: 3, goalsFor: 32, goalsAgainst: 12, points: 27 },
  { id: 'd2-c2', name: 'New Mexico United',   shortName: 'NMX', state: 'New Mexico',   division: 'D2', group: 'C', wins: 6, draws: 3, losses: 3, goalsFor: 21, goalsAgainst: 16, points: 21 },
  { id: 'd2-c3', name: 'Idaho SC',            shortName: 'IDA', state: 'Idaho',        division: 'D2', group: 'C', wins: 3, draws: 3, losses: 6, goalsFor: 14, goalsAgainst: 22, points: 12 },
  { id: 'd2-c4', name: 'Montana FC',          shortName: 'MON', state: 'Montana',      division: 'D2', group: 'C', wins: 0, draws: 4, losses: 8, goalsFor: 8,  goalsAgainst: 30, points: 4  },
  // D2 Group D
  { id: 'd2-d1', name: 'Oklahoma SC',         shortName: 'OKL', state: 'Oklahoma',     division: 'D2', group: 'D', wins: 7, draws: 2, losses: 3, goalsFor: 24, goalsAgainst: 14, points: 23 },
  { id: 'd2-d2', name: 'Kansas United',       shortName: 'KAN', state: 'Kansas',       division: 'D2', group: 'D', wins: 6, draws: 2, losses: 4, goalsFor: 20, goalsAgainst: 16, points: 20 },
  { id: 'd2-d3', name: 'Nebraska FC',         shortName: 'NEB', state: 'Nebraska',     division: 'D2', group: 'D', wins: 3, draws: 4, losses: 5, goalsFor: 15, goalsAgainst: 20, points: 13 },
  { id: 'd2-d4', name: 'Arkansas SC',         shortName: 'ARK', state: 'Arkansas',     division: 'D2', group: 'D', wins: 1, draws: 2, losses: 9, goalsFor: 8,  goalsAgainst: 28, points: 5  },
];

export const PLAYERS: Player[] = [
  { id: 'p1',  name: 'M. Torres',    teamId: 'd1-a1', position: 'FWD', goals: 14, assists: 6,  yellowCards: 2, redCards: 0, minutesPlayed: 980,  rating: 8.4 },
  { id: 'p2',  name: 'J. Williams',  teamId: 'd1-b1', position: 'FWD', goals: 13, assists: 4,  yellowCards: 3, redCards: 0, minutesPlayed: 940,  rating: 8.2 },
  { id: 'p3',  name: 'D. Mason',     teamId: 'd1-d1', position: 'FWD', goals: 12, assists: 8,  yellowCards: 1, redCards: 0, minutesPlayed: 1020, rating: 8.6 },
  { id: 'p4',  name: 'K. Larsen',    teamId: 'd1-c1', position: 'MID', goals: 8,  assists: 11, yellowCards: 4, redCards: 0, minutesPlayed: 1100, rating: 8.3, keyPasses: 42 },
  { id: 'p5',  name: 'R. Antonov',   teamId: 'd1-a2', position: 'MID', goals: 6,  assists: 9,  yellowCards: 2, redCards: 0, minutesPlayed: 990,  rating: 7.9, keyPasses: 38 },
  { id: 'p6',  name: 'S. Petrov',    teamId: 'd1-b1', position: 'DEF', goals: 2,  assists: 5,  yellowCards: 5, redCards: 1, minutesPlayed: 850,  rating: 7.5, tackles: 68 },
  { id: 'p7',  name: 'I. Fedorov',   teamId: 'd1-d1', position: 'DEF', goals: 3,  assists: 3,  yellowCards: 3, redCards: 0, minutesPlayed: 1080, rating: 7.8, tackles: 72 },
  { id: 'p8',  name: 'V. Kazakov',   teamId: 'd1-a1', position: 'GK',  goals: 0,  assists: 1,  yellowCards: 1, redCards: 0, minutesPlayed: 1080, rating: 8.0, saves: 54 },
  { id: 'p9',  name: 'N. Baranov',   teamId: 'd1-c2', position: 'FWD', goals: 10, assists: 5,  yellowCards: 2, redCards: 0, minutesPlayed: 900,  rating: 7.9 },
  { id: 'p10', name: 'G. Tikhonov',  teamId: 'd1-b2', position: 'MID', goals: 5,  assists: 10, yellowCards: 1, redCards: 0, minutesPlayed: 1050, rating: 8.1, keyPasses: 45 },
  { id: 'p11', name: 'O. Zaitsev',   teamId: 'd2-a1', position: 'FWD', goals: 11, assists: 3,  yellowCards: 2, redCards: 0, minutesPlayed: 920,  rating: 8.0 },
  { id: 'p12', name: 'E. Sherbakov', teamId: 'd2-b1', position: 'FWD', goals: 9,  assists: 6,  yellowCards: 3, redCards: 0, minutesPlayed: 960,  rating: 7.8 },
  { id: 'p13', name: 'A. Sokolov',   teamId: 'd2-c1', position: 'MID', goals: 7,  assists: 12, yellowCards: 1, redCards: 0, minutesPlayed: 1040, rating: 8.5, keyPasses: 50 },
  { id: 'p14', name: 'P. Kuznetsov', teamId: 'd2-d1', position: 'DEF', goals: 1,  assists: 4,  yellowCards: 4, redCards: 0, minutesPlayed: 1010, rating: 7.6, tackles: 65 },
  { id: 'p15', name: 'T. Maksimov',  teamId: 'd2-c1', position: 'FWD', goals: 15, assists: 4,  yellowCards: 3, redCards: 1, minutesPlayed: 870,  rating: 8.7 },
];

export const PLAYER_NAMES = [
  'Torres', 'Williams', 'Mason', 'Larsen', 'Antonov',
  'Petrov', 'Fedorov', 'Kazakov', 'Baranov', 'Tikhonov',
  'Zaitsev', 'Sherbakov', 'Sokolov', 'Kuznetsov', 'Maksimov',
  'Johnson', 'Smith', 'Davis', 'Martinez', 'Wilson',
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Возвращает ближайший прошедший «ровный час» для live-матча,
 * и следующие ровные часы для upcoming-матчей.
 * Матч длится 50 минут, поэтому live = текущий час ещё идёт если now.minute < 50.
 */
function buildSchedule(): Match[] {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Определяем, какой матч сейчас live (начало в currentHour:00, идёт если минута < 50)
  const isCurrentHourLive = currentMinute < 50;
  const liveStartHour = isCurrentHourLive ? currentHour : (currentHour + 1) % 24;
  const liveMinute = isCurrentHourLive ? currentMinute : 0;

  // Пары матчей для каждой группы: index 0 = live candidate, остальные upcoming/finished
  const groupPairs: [string, string, Division, Group][] = [
    // D1
    ['d1-a1', 'd1-a2', 'D1', 'A'],
    ['d1-a3', 'd1-a4', 'D1', 'A'],
    ['d1-b1', 'd1-b2', 'D1', 'B'],
    ['d1-b3', 'd1-b4', 'D1', 'B'],
    ['d1-c1', 'd1-c2', 'D1', 'C'],
    ['d1-c3', 'd1-c4', 'D1', 'C'],
    ['d1-d1', 'd1-d2', 'D1', 'D'],
    ['d1-d3', 'd1-d4', 'D1', 'D'],
    // D2
    ['d2-a1', 'd2-a2', 'D2', 'A'],
    ['d2-a3', 'd2-a4', 'D2', 'A'],
    ['d2-b1', 'd2-b2', 'D2', 'B'],
    ['d2-b3', 'd2-b4', 'D2', 'B'],
    ['d2-c1', 'd2-c2', 'D2', 'C'],
    ['d2-c3', 'd2-c4', 'D2', 'C'],
    ['d2-d1', 'd2-d2', 'D2', 'D'],
    ['d2-d3', 'd2-d4', 'D2', 'D'],
  ];

  // D1 live = первая пара D1 по алфавиту группы (группа A, пара 0)
  // D2 live = первая пара D2 (группа A, пара 0)
  // Итого 2 live матча на платформе
  const liveIndexes = new Set([0, 8]); // D1 Group A first pair, D2 Group A first pair

  return groupPairs.map(([homeId, awayId, division, group], index) => {
    const isLive = liveIndexes.has(index);

    let status: Match['status'];
    let minute = 0;
    let homeScore = 0;
    let awayScore = 0;
    let scheduledHour: number;

    if (isLive) {
      status = 'live';
      minute = liveMinute;
      homeScore = randomInt(0, 2);
      awayScore = randomInt(0, 2);
      scheduledHour = isCurrentHourLive ? currentHour : (currentHour + 1) % 24;
    } else {
      // Distribute: some finished (before current hour), some upcoming
      const hourOffset = index - (index > 8 ? 8 : 0); // normalize within division
      const assignedHour = (currentHour - 3 + hourOffset) % 24;

      if (assignedHour < currentHour - 1 || (index % 3 === 0 && !isLive)) {
        status = 'finished';
        minute = 50;
        homeScore = randomInt(0, 4);
        awayScore = randomInt(0, 3);
        scheduledHour = (currentHour - randomInt(1, 5) + 24) % 24;
      } else {
        status = 'upcoming';
        scheduledHour = (currentHour + randomInt(1, 10)) % 24;
      }
    }

    const scheduled = new Date(now);
    scheduled.setHours(scheduledHour, 0, 0, 0);

    const events: MatchEvent[] = [];
    if (status === 'live' || status === 'finished') {
      const numEvents = randomInt(2, 5);
      const evTypes: MatchEvent['type'][] = ['goal', 'yellow', 'miss', 'save', 'goal'];
      for (let i = 0; i < numEvents; i++) {
        events.push({
          minute: randomInt(1, status === 'live' ? minute || 1 : 50),
          type: evTypes[randomInt(0, evTypes.length - 1)],
          teamId: Math.random() > 0.5 ? homeId : awayId,
          playerName: PLAYER_NAMES[randomInt(0, PLAYER_NAMES.length - 1)],
          description: ['Shot on goal', 'Yellow card', 'Missed chance', 'Great save', 'Goal scored'][randomInt(0, 4)],
        });
      }
      events.sort((a, b) => a.minute - b.minute);
    }

    const poss = randomInt(40, 62);

    return {
      id: `match-${index}`,
      homeTeamId: homeId,
      awayTeamId: awayId,
      homeScore,
      awayScore,
      status,
      minute,
      division,
      group,
      scheduledTime: scheduled.toISOString(),
      events,
      possession: [poss, 100 - poss],
      shots: [randomInt(3, 14), randomInt(2, 11)],
      corners: [randomInt(1, 7), randomInt(1, 6)],
    };
  });
}

export const INITIAL_MATCHES = buildSchedule();

export function getTeam(id: string) {
  return TEAMS.find(t => t.id === id);
}

export function formatTime(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}
