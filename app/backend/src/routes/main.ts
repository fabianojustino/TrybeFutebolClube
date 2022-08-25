import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';

import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

import LeaderService from '../services/leader.service';
import LeaderController from '../controllers/leader.controller';

// AUTH
const authService = new AuthService();
const authController = new AuthController(authService);

// TEAM
const teamService = new TeamService();
const teamController = new TeamController(teamService);

// MATCH
const matchService = new MatchService();
const matchController = new MatchController(matchService);

// LEADER COM O MODEL MATCH
const leaderService = new LeaderService();
const leaderController = new LeaderController(leaderService);

export { authController, teamController, matchController, leaderController };
