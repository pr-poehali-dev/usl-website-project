export type Division = 'D1' | 'D2';
export type Group = 'A' | 'B' | 'C' | 'D';

export interface Team {
  id: string;
  name: string;
  shortName: string;
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
  isGoalkeeper: boolean;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  saves?: number;
  cleanSheets?: number;
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
  { id: 'd1-a1', name: 'California',     shortName: 'CAL', division: 'D1', group: 'A', wins: 8, draws: 2, losses: 2,  goalsFor: 28, goalsAgainst: 12, points: 26 },
  { id: 'd1-a2', name: 'Texas',          shortName: 'TEX', division: 'D1', group: 'A', wins: 7, draws: 3, losses: 2,  goalsFor: 24, goalsAgainst: 14, points: 24 },
  { id: 'd1-a3', name: 'Florida',        shortName: 'FLA', division: 'D1', group: 'A', wins: 5, draws: 4, losses: 3,  goalsFor: 19, goalsAgainst: 16, points: 19 },
  { id: 'd1-a4', name: 'Ohio',           shortName: 'OHI', division: 'D1', group: 'A', wins: 2, draws: 2, losses: 8,  goalsFor: 11, goalsAgainst: 25, points: 8  },
  // D1 Group B
  { id: 'd1-b1', name: 'New York',       shortName: 'NYK', division: 'D1', group: 'B', wins: 9, draws: 1, losses: 2,  goalsFor: 31, goalsAgainst: 10, points: 28 },
  { id: 'd1-b2', name: 'Illinois',       shortName: 'ILL', division: 'D1', group: 'B', wins: 6, draws: 4, losses: 2,  goalsFor: 22, goalsAgainst: 15, points: 22 },
  { id: 'd1-b3', name: 'Georgia',        shortName: 'GEO', division: 'D1', group: 'B', wins: 4, draws: 3, losses: 5,  goalsFor: 17, goalsAgainst: 20, points: 15 },
  { id: 'd1-b4', name: 'Michigan',       shortName: 'MCH', division: 'D1', group: 'B', wins: 1, draws: 1, losses: 10, goalsFor: 8,  goalsAgainst: 30, points: 4  },
  // D1 Group C
  { id: 'd1-c1', name: 'Washington',     shortName: 'WAS', division: 'D1', group: 'C', wins: 7, draws: 2, losses: 3,  goalsFor: 25, goalsAgainst: 13, points: 23 },
  { id: 'd1-c2', name: 'Colorado',       shortName: 'COL', division: 'D1', group: 'C', wins: 6, draws: 3, losses: 3,  goalsFor: 21, goalsAgainst: 16, points: 21 },
  { id: 'd1-c3', name: 'Arizona',        shortName: 'ARI', division: 'D1', group: 'C', wins: 4, draws: 2, losses: 6,  goalsFor: 15, goalsAgainst: 22, points: 14 },
  { id: 'd1-c4', name: 'Nevada',         shortName: 'NEV', division: 'D1', group: 'C', wins: 1, draws: 3, losses: 8,  goalsFor: 9,  goalsAgainst: 28, points: 6  },
  // D1 Group D
  { id: 'd1-d1', name: 'Oregon',         shortName: 'ORE', division: 'D1', group: 'D', wins: 8, draws: 2, losses: 2,  goalsFor: 27, goalsAgainst: 11, points: 26 },
  { id: 'd1-d2', name: 'Virginia',       shortName: 'VIR', division: 'D1', group: 'D', wins: 6, draws: 3, losses: 3,  goalsFor: 20, goalsAgainst: 15, points: 21 },
  { id: 'd1-d3', name: 'Minnesota',      shortName: 'MIN', division: 'D1', group: 'D', wins: 3, draws: 4, losses: 5,  goalsFor: 14, goalsAgainst: 19, points: 13 },
  { id: 'd1-d4', name: 'Missouri',       shortName: 'MIS', division: 'D1', group: 'D', wins: 1, draws: 1, losses: 10, goalsFor: 7,  goalsAgainst: 31, points: 4  },
  // D2 Group A
  { id: 'd2-a1', name: 'Pennsylvania',   shortName: 'PEN', division: 'D2', group: 'A', wins: 7, draws: 3, losses: 2,  goalsFor: 26, goalsAgainst: 13, points: 24 },
  { id: 'd2-a2', name: 'Tennessee',      shortName: 'TEN', division: 'D2', group: 'A', wins: 6, draws: 2, losses: 4,  goalsFor: 22, goalsAgainst: 17, points: 20 },
  { id: 'd2-a3', name: 'Indiana',        shortName: 'IND', division: 'D2', group: 'A', wins: 4, draws: 3, losses: 5,  goalsFor: 16, goalsAgainst: 20, points: 15 },
  { id: 'd2-a4', name: 'Kentucky',       shortName: 'KEN', division: 'D2', group: 'A', wins: 1, draws: 2, losses: 9,  goalsFor: 9,  goalsAgainst: 27, points: 5  },
  // D2 Group B
  { id: 'd2-b1', name: 'North Carolina', shortName: 'NCA', division: 'D2', group: 'B', wins: 8, draws: 1, losses: 3,  goalsFor: 29, goalsAgainst: 14, points: 25 },
  { id: 'd2-b2', name: 'Maryland',       shortName: 'MAR', division: 'D2', group: 'B', wins: 5, draws: 4, losses: 3,  goalsFor: 18, goalsAgainst: 15, points: 19 },
  { id: 'd2-b3', name: 'Wisconsin',      shortName: 'WIS', division: 'D2', group: 'B', wins: 3, draws: 3, losses: 6,  goalsFor: 13, goalsAgainst: 21, points: 12 },
  { id: 'd2-b4', name: 'Iowa',           shortName: 'IOW', division: 'D2', group: 'B', wins: 2, draws: 2, losses: 8,  goalsFor: 11, goalsAgainst: 26, points: 8  },
  // D2 Group C
  { id: 'd2-c1', name: 'Utah',           shortName: 'UTA', division: 'D2', group: 'C', wins: 9, draws: 0, losses: 3,  goalsFor: 32, goalsAgainst: 12, points: 27 },
  { id: 'd2-c2', name: 'New Mexico',     shortName: 'NMX', division: 'D2', group: 'C', wins: 6, draws: 3, losses: 3,  goalsFor: 21, goalsAgainst: 16, points: 21 },
  { id: 'd2-c3', name: 'Idaho',          shortName: 'IDA', division: 'D2', group: 'C', wins: 3, draws: 3, losses: 6,  goalsFor: 14, goalsAgainst: 22, points: 12 },
  { id: 'd2-c4', name: 'Montana',        shortName: 'MON', division: 'D2', group: 'C', wins: 0, draws: 4, losses: 8,  goalsFor: 8,  goalsAgainst: 30, points: 4  },
  // D2 Group D
  { id: 'd2-d1', name: 'Oklahoma',       shortName: 'OKL', division: 'D2', group: 'D', wins: 7, draws: 2, losses: 3,  goalsFor: 24, goalsAgainst: 14, points: 23 },
  { id: 'd2-d2', name: 'Kansas',         shortName: 'KAN', division: 'D2', group: 'D', wins: 6, draws: 2, losses: 4,  goalsFor: 20, goalsAgainst: 16, points: 20 },
  { id: 'd2-d3', name: 'Nebraska',       shortName: 'NEB', division: 'D2', group: 'D', wins: 3, draws: 4, losses: 5,  goalsFor: 15, goalsAgainst: 20, points: 13 },
  { id: 'd2-d4', name: 'Arkansas',       shortName: 'ARK', division: 'D2', group: 'D', wins: 1, draws: 2, losses: 9,  goalsFor: 8,  goalsAgainst: 28, points: 5  },
];

export const PLAYERS: Player[] = [
  // Goalkeepers
  { id: 'gk1', name: 'V. Kazakov',    teamId: 'd1-a1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1080, saves: 54, cleanSheets: 7 },
  { id: 'gk2', name: 'R. Holloway',   teamId: 'd1-b1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 990,  saves: 61, cleanSheets: 9 },
  { id: 'gk3', name: 'T. Barnes',     teamId: 'd1-c1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1020, saves: 48, cleanSheets: 6 },
  { id: 'gk4', name: 'M. Ortega',     teamId: 'd1-d1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 1080, saves: 44, cleanSheets: 8 },
  { id: 'gk5', name: 'J. Reeves',     teamId: 'd2-a1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 2, redCards: 0, minutesPlayed: 950,  saves: 52, cleanSheets: 5 },
  { id: 'gk6', name: 'C. Patel',      teamId: 'd2-b1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 1010, saves: 58, cleanSheets: 7 },
  { id: 'gk7', name: 'B. Novak',      teamId: 'd2-c1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1080, saves: 39, cleanSheets: 9 },
  { id: 'gk8', name: 'D. Crane',      teamId: 'd2-d1', isGoalkeeper: true,  goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 960,  saves: 47, cleanSheets: 6 },
  // Field players D1
  { id: 'p1',  name: 'M. Torres',     teamId: 'd1-a1', isGoalkeeper: false, goals: 14, assists: 6,  yellowCards: 2, redCards: 0, minutesPlayed: 980,  keyPasses: 28 },
  { id: 'p2',  name: 'J. Williams',   teamId: 'd1-b1', isGoalkeeper: false, goals: 13, assists: 4,  yellowCards: 3, redCards: 0, minutesPlayed: 940,  tackles: 31   },
  { id: 'p3',  name: 'D. Mason',      teamId: 'd1-d1', isGoalkeeper: false, goals: 12, assists: 8,  yellowCards: 1, redCards: 0, minutesPlayed: 1020, keyPasses: 35 },
  { id: 'p4',  name: 'K. Larsen',     teamId: 'd1-c1', isGoalkeeper: false, goals: 8,  assists: 11, yellowCards: 4, redCards: 0, minutesPlayed: 1100, keyPasses: 42 },
  { id: 'p5',  name: 'R. Antonov',    teamId: 'd1-a2', isGoalkeeper: false, goals: 6,  assists: 9,  yellowCards: 2, redCards: 0, minutesPlayed: 990,  keyPasses: 38 },
  { id: 'p6',  name: 'S. Petrov',     teamId: 'd1-b1', isGoalkeeper: false, goals: 2,  assists: 5,  yellowCards: 5, redCards: 1, minutesPlayed: 850,  tackles: 68   },
  { id: 'p7',  name: 'I. Fedorov',    teamId: 'd1-d1', isGoalkeeper: false, goals: 3,  assists: 3,  yellowCards: 3, redCards: 0, minutesPlayed: 1080, tackles: 72   },
  { id: 'p8',  name: 'N. Baranov',    teamId: 'd1-c2', isGoalkeeper: false, goals: 10, assists: 5,  yellowCards: 2, redCards: 0, minutesPlayed: 900,  keyPasses: 22 },
  { id: 'p9',  name: 'G. Tikhonov',   teamId: 'd1-b2', isGoalkeeper: false, goals: 5,  assists: 10, yellowCards: 1, redCards: 0, minutesPlayed: 1050, keyPasses: 45 },
  { id: 'p10', name: 'L. Cross',      teamId: 'd1-a3', isGoalkeeper: false, goals: 7,  assists: 3,  yellowCards: 3, redCards: 0, minutesPlayed: 870,  tackles: 28   },
  { id: 'p11', name: 'H. Rivera',     teamId: 'd1-b3', isGoalkeeper: false, goals: 5,  assists: 6,  yellowCards: 2, redCards: 0, minutesPlayed: 920,  keyPasses: 30 },
  // Field players D2
  { id: 'p12', name: 'O. Zaitsev',    teamId: 'd2-a1', isGoalkeeper: false, goals: 11, assists: 3,  yellowCards: 2, redCards: 0, minutesPlayed: 920,  keyPasses: 18 },
  { id: 'p13', name: 'E. Sherbakov',  teamId: 'd2-b1', isGoalkeeper: false, goals: 9,  assists: 6,  yellowCards: 3, redCards: 0, minutesPlayed: 960,  tackles: 24   },
  { id: 'p14', name: 'A. Sokolov',    teamId: 'd2-c1', isGoalkeeper: false, goals: 7,  assists: 12, yellowCards: 1, redCards: 0, minutesPlayed: 1040, keyPasses: 50 },
  { id: 'p15', name: 'P. Kuznetsov',  teamId: 'd2-d1', isGoalkeeper: false, goals: 1,  assists: 4,  yellowCards: 4, redCards: 0, minutesPlayed: 1010, tackles: 65   },
  { id: 'p16', name: 'T. Maksimov',   teamId: 'd2-c1', isGoalkeeper: false, goals: 15, assists: 4,  yellowCards: 3, redCards: 1, minutesPlayed: 870,  keyPasses: 20 },
  { id: 'p17', name: 'B. Walsh',      teamId: 'd2-a2', isGoalkeeper: false, goals: 8,  assists: 5,  yellowCards: 2, redCards: 0, minutesPlayed: 940,  keyPasses: 26 },
  { id: 'p18', name: 'C. Nguyen',     teamId: 'd2-b2', isGoalkeeper: false, goals: 6,  assists: 7,  yellowCards: 1, redCards: 0, minutesPlayed: 980,  tackles: 33   },
  { id: 'p19', name: 'F. Adams',      teamId: 'd2-d2', isGoalkeeper: false, goals: 5,  assists: 8,  yellowCards: 2, redCards: 0, minutesPlayed: 860,  keyPasses: 31 },
];

export const PLAYER_NAMES = [
  'Torres', 'Williams', 'Mason', 'Larsen', 'Antonov',
  'Petrov', 'Fedorov', 'Kazakov', 'Baranov', 'Tikhonov',
  'Zaitsev', 'Sherbakov', 'Sokolov', 'Kuznetsov', 'Maksimov',
  'Johnson', 'Smith', 'Davis', 'Martinez', 'Wilson',
  'Cross', 'Rivera', 'Walsh', 'Nguyen', 'Adams',
];

/**
 * Round-robin: 4 команды → 6 уникальных пар
 * Каждые 6 часов — новая группа играет свои 6 матчей
 * Итого: 24 часа / 4 группы × 6 матчей = 1 матч в час на группу
 */
export const ROUND_ROBIN_PAIRS: [number, number][] = [
  [0, 1], [2, 3],
  [0, 2], [1, 3],
  [0, 3], [1, 2],
];

function rndInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Текущая активная группа (меняется каждые 6 часов UTC) */
export function getActiveGroup(): Group {
  const hour = new Date().getUTCHours();
  const groups: Group[] = ['A', 'B', 'C', 'D'];
  return groups[Math.floor(hour / 6)];
}

export function getNextGroup(): Group {
  const groups: Group[] = ['A', 'B', 'C', 'D'];
  const idx = groups.indexOf(getActiveGroup());
  return groups[(idx + 1) % 4];
}

/** Минут до конца текущей 6-часовой сессии группы */
export function minutesUntilGroupChange(): number {
  const now = new Date();
  const hour = now.getUTCHours();
  const min = now.getUTCMinutes();
  const nextBoundaryHour = (Math.floor(hour / 6) + 1) * 6;
  return (nextBoundaryHour - hour) * 60 - min;
}

/**
 * Строит расписание на ±24 часа:
 * - Прошедшие матчи в текущей сессии → finished
 * - Текущий час → live (1 матч на группу)
 * - Будущие слоты текущей + завтрашней сессии → upcoming
 */
export function buildFullSchedule(): Match[] {
  const now = new Date();
  const currentUTCHour = now.getUTCHours();
  const currentUTCMin = now.getUTCMinutes();
  const groups: Group[] = ['A', 'B', 'C', 'D'];
  const matches: Match[] = [];
  let mid = 0;

  (['D1', 'D2'] as Division[]).forEach(division => {
    groups.forEach((group, gIdx) => {
      const groupTeams = TEAMS.filter(t => t.division === division && t.group === group);
      const sessionStartHour = gIdx * 6; // UTC час начала сессии этой группы

      ROUND_ROBIN_PAIRS.forEach(([i, j], pairIdx) => {
        const slotHour = sessionStartHour + pairIdx; // UTC час этого матча

        const scheduled = new Date(now);
        scheduled.setUTCHours(slotHour, 0, 0, 0);
        // Если время уже прошло сегодня — оставляем как есть (finished)
        // Если слот в будущем — это upcoming

        let status: Match['status'];
        let minute = 0;
        let homeScore = 0;
        let awayScore = 0;

        if (slotHour === currentUTCHour) {
          minute = currentUTCMin;
          if (minute >= 50) {
            status = 'finished';
            minute = 50;
          } else {
            status = 'live';
          }
          homeScore = rndInt(0, 2);
          awayScore = rndInt(0, 2);
        } else if (slotHour < currentUTCHour) {
          status = 'finished';
          minute = 50;
          homeScore = rndInt(0, 4);
          awayScore = rndInt(0, 3);
        } else {
          status = 'upcoming';
        }

        const events: MatchEvent[] = [];
        if (status !== 'upcoming') {
          const count = rndInt(2, 5);
          const evTypes: MatchEvent['type'][] = ['goal', 'yellow', 'miss', 'save', 'goal'];
          for (let k = 0; k < count; k++) {
            events.push({
              minute: rndInt(1, status === 'live' ? Math.max(minute, 1) : 50),
              type: evTypes[rndInt(0, evTypes.length - 1)],
              teamId: Math.random() > 0.5 ? groupTeams[i]?.id : groupTeams[j]?.id,
              playerName: PLAYER_NAMES[rndInt(0, PLAYER_NAMES.length - 1)],
              description: ['Shot on goal', 'Yellow card', 'Missed chance', 'Great save', 'Goal scored'][rndInt(0, 4)],
            });
          }
          events.sort((a, b) => a.minute - b.minute);
        }

        const poss = rndInt(40, 62);
        matches.push({
          id: `${division}-${group}-p${pairIdx}-${mid++}`,
          homeTeamId: groupTeams[i]?.id,
          awayTeamId: groupTeams[j]?.id,
          homeScore, awayScore, status, minute,
          division, group,
          scheduledTime: scheduled.toISOString(),
          events,
          possession: [poss, 100 - poss],
          shots: [rndInt(2, 14), rndInt(2, 11)],
          corners: [rndInt(1, 7), rndInt(1, 6)],
        });
      });
    });
  });

  return matches;
}

export const INITIAL_MATCHES = buildFullSchedule();

export function getTeam(id: string) {
  return TEAMS.find(t => t.id === id);
}

export function formatHour(isoString: string): string {
  const d = new Date(isoString);
  const h = d.getUTCHours().toString().padStart(2, '0');
  return `${h}:00`;
}
