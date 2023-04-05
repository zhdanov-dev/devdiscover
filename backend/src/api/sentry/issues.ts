import express from 'express';
import SentryAPIClient from '../../util/SentryAPIClient';

import User from '../../models/User';
import axios from 'axios';

var natural = require('natural');

const router = express.Router();

router.get('/', async (req, res) => {
	const { project, userId } = req.query;
	const user = await User.findOne({ where: { id: userId } });
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/projects/${user.externalSlug}/${project}/issues/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});

router.get('/events', async (req, res) => {
	const { issueId, userId } = req.query;
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/issues/${issueId}/events/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});

router.get('/issue', async (req, res) => {
	const { issueId, userId } = req.query;
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/issues/${issueId}/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});

router.delete('/delete', async (req, res) => {
	const { issueId, userId } = req.query;
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/issues/${issueId}/`;
	await axios({
		method: 'DELETE',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});

router.get('/latest', async (req, res) => {
	const { issueId, userId } = req.query;
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/issues/${issueId}/events/latest/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});

router.get('/oldest', async (req, res) => {
	const { issueId, userId } = req.query;
	const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
	const path = `/issues/${issueId}/events/oldest/`;
	await axios({
		method: 'GET',
		url: `${process.env.SENTRY_URL}/api/0${path}`,
		headers: { Authorization: `Bearer ${token}` },
	}).then(resp => res.send(resp.data));
});

router.get('/natural', async (req, res) => {
	const { str } = req.query;
	const tokenizerArr = String(str).split(' ');
	const stemArr: string[] = [];
	let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	let arr_num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	tokenizerArr.forEach((word: string) => {
		const a = 'ошибк'
		const b	= 'проблем'
		const c = natural.PorterStemmerRu.stem(word)
		if (
			(natural.LevenshteinDistance(a, c) <= 2 ||
			natural.LevenshteinDistance(b, c) <= 2)
		)
			stemArr.push(word);
	});
	if (stemArr.length > 0) {
		tokenizerArr.forEach((word: string) => {
			if (
				arr_en.includes(word[0]) || arr_num.includes(Number(word[0]))
			)
				stemArr.push(natural.PorterStemmerRu.stem(word));
		});
	}
	res.send({ value: stemArr });

});

export default router;
