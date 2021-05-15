import * as randomWords from 'random-words';

export const randomString = async () => {
	const words = await randomWords(15);
	return words.join('');
};
