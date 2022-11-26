import TeamModel from '../models/TeamsModel';

class TeamService {
  static async getAll(): Promise<void> {
    const response = await TeamModel.findAll();
    console.log(response);
  }
}

export default TeamService;

// LoginService.login({
//   email: 'admin@admin.com',
//   password: 'secret_admin',
// }).then((res) => console.log(res));
