import { Column, HasMany, HasOne,	Model, Table } from 'sequelize-typescript';
import SentryInstallation from './SentryInstallation';
import Token from './Token';

@Table({ tableName: 'user' })
export default class User extends Model {
	@Column
	email: string;

	@Column
	password: string;

	@Column
	sub: string;

	@Column
	externalSlug: string;

	@HasOne(() => Token)
	token: Token;

	@HasMany(() => SentryInstallation)
	sentryInstallations: SentryInstallation[];
}
