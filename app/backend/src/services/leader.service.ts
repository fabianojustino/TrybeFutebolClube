import ILeader from '../interfaces/ILeader';
import Matches from '../database/models/match';
/* import Teams from '../database/models/team'; */

export default class LeaderService implements ILeader<Matches> {
  private _leaders: unknown[] | unknown | undefined;
  private _queryHome: string;
  private _queryAway: string;

  get leaders() {
    return this._leaders;
  }

  get queryHome() {
    this._queryHome = `SELECT      
    t.team_name as name,
    count(m.home_team) as totalGames,
    CAST(sum(m.home_team_goals > m.away_team_goals) AS UNSIGNED)as totalVictories,
    CAST(sum(m.home_team_goals = m.away_team_goals) AS UNSIGNED) as totalDraws,
    CAST(sum(m.home_team_goals < m.away_team_goals) AS UNSIGNED) as totalLosses,
    CAST(sum(m.home_team_goals)AS UNSIGNED) as goalsFavor,
    CAST(sum(m.away_team_goals)AS UNSIGNED) as goalsOwn,
    CAST(sum(m.home_team_goals - m.away_team_goals)AS SIGNED) as goalsBalance  
    FROM matches m    
    INNER JOIN teams t
    ON m.home_team = t.id
    WHERE m.in_progress = false
    GROUP BY m.home_team
    ORDER BY totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;
    return this._queryHome;
  }

  get queryAway() {
    this._queryAway = `SELECT      
    t.team_name as name,
    count(m.away_team) as totalGames,
    CAST(sum(m.away_team_goals > m.home_team_goals) AS UNSIGNED)as totalVictories,
    CAST(sum(m.away_team_goals = m.home_team_goals) AS UNSIGNED) as totalDraws,
    CAST(sum(m.away_team_goals < m.home_team_goals) AS UNSIGNED) as totalLosses,
    CAST(sum(m.away_team_goals)AS UNSIGNED) as goalsFavor,
    CAST(sum(m.home_team_goals)AS UNSIGNED) as goalsOwn,
    CAST(sum(m.away_team_goals - m.home_team_goals)AS SIGNED) as goalsBalance  
    FROM matches m    
    INNER JOIN teams t
    ON m.away_team = t.id
    WHERE m.in_progress = false
    GROUP BY m.away_team
    ORDER BY totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;
    return this._queryAway;
  }

  static formatResult(item: any) {
    return {
      name: item.name,
      totalPoints: item.totalVictories * 3 + item.totalDraws,
      totalGames: item.totalGames,
      totalVictories: item.totalVictories,
      totalDraws: item.totalDraws,
      totalLosses: item.totalLosses,
      goalsFavor: item.goalsFavor,
      goalsOwn: item.goalsOwn,
      goalsBalance: item.goalsBalance,
      efficiency: (
        (Math.floor(item.totalVictories * 3
           + item.totalDraws) / (item.totalGames * 3)) * 100).toFixed(2),
    };
  }

  preparedResult(prevResult: any) {
    const results = prevResult[0]
      .map((item: any) => LeaderService.formatResult(item))
      .sort((a: any, b: any) => b.totalPoints - a.totalPoints);

    this._leaders = results;
    return this.leaders;
  }

  async list(team: string): Promise<unknown | unknown[] | undefined> {
    const equipe = team.replace('/', '') === 'home' ? this.queryHome : this.queryAway;

    const queryResult = await Matches.sequelize?.query(equipe);
    if (queryResult) return this.preparedResult(queryResult);
    return [];
  }
}
