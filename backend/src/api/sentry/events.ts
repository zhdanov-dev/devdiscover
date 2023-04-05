import express from 'express';
import SentryAPIClient from '../../util/SentryAPIClient';

import User from '../../models/User';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
	const { project, userId } = req.query;
	const user = await User.findOne({ where: { id: userId } });
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/projects/${user.externalSlug}/${project}/events/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` }
	}).then(resp => res.send(resp.data));
});

router.get('/event', async (req, res) => {
	const { project, eventId, userId } = req.query;
	const user = await User.findOne({ where: { id: userId } });
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/projects/${user.externalSlug}/${project}/events/${eventId}/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});


export default router;