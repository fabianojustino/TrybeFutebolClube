import ILeader from '../interfaces/ILeader';
import Matches from '../database/models/match';
/* import Teams from '../database/models/team'; */

export default class LeaderService implements ILeader<Matches> {
  private _leaders: unknown[] | unknown | undefined;
  private _queryHome: string;

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
    CAST(sum(m.home_team_goals - m.away_team_goals)AS SIGNED) as goalsBalance,
    CAST(sum((m.home_team_goals > m.away_team_goals)) AS UNSIGNED) as efficiency
    FROM matches m    
    INNER JOIN teams t
    ON m.home_team = t.id
    WHERE m.in_progress = false
    GROUP BY m.home_team
    ORDER BY totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;
    return this._queryHome;
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
    return this._leaders;
  }

  async list(): Promise<unknown | unknown[] | undefined> {
    const queryResult = await Matches.sequelize?.query(this.queryHome);
    if (queryResult) return this.preparedResult(queryResult);
    return [];
  }
}
