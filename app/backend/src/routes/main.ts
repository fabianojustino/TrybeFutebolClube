// AUTH
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';

// TEAM
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

const authService = new AuthService();
const authController = new AuthController(authService);

const teamService = new TeamService();
const teamController = new TeamController(teamService);

export { authController, teamController };
