import { Sequelize } from 'sequelize-typescript';
import SentryInstallation from './SentryInstallation';
import Token from './Token';
import User from './User';

const sequelizeConfig = {
	host: 'localhost',
	port: 5432,
};

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
	dialect: 'postgres',
	logging: false,
	models: ['./User', './Token', './SentryInstallation'],
	...sequelizeConfig,
});

sequelize.addModels([User, Token, SentryInstallation]);

export { sequelize };
