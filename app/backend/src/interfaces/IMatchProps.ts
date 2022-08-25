export default interface IMatchProps {
  id?: number;
  teamHome?: any;
  teamAway?: any;
  teamName?: string;
  dataValues?: IMatchProps;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}
