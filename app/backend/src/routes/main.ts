// AUTH
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';

const authService = new AuthService();
const authController = new AuthController(authService);

// TEAM
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

export { authController, teamController };
