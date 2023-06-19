export const validators = {
	title: (title: string) => (title.length < 1 ? 'Your title is too short!' : null),
	description: (description: string) => {
		const wordCount = description.split(/\s+/).length;
		return wordCount < 25 ? 'Your description should be at least 25 words' : null;
	},
	eventDate: (eventDate: string) => (eventDate.length < 1 ? 'Please select a date!' : null),
	marketplace: (marketplace: string) =>
		marketplace.length < 1 ? 'Please select a marketplace!' : null,
	email: (email: string) => {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return !pattern.test(email) ? 'Please enter a valid email!' : null;
	},
	website: (website: string) => {
		const pattern = /^((http|https):\/\/|www\.)[^ "]+$/;
		return !pattern.test(website) ? 'Please enter a valid website!' : null;
	},
	marketplaceUrl: (marketplaceUrl: string) => {
		if (!marketplaceUrl) {
			return null;
		}
		const pattern = /^((http|https):\/\/|www\.)[^ "]+$/;
		return !pattern.test(marketplaceUrl) ? 'Please enter a valid website!' : null;
	},
	scAddress: (scAddress: string) => {
		if (!scAddress) {
			return null;
		}

		return scAddress.length < 1 || scAddress.length > 30
			? 'Please enter a valid smart contract!'
			: null;
	},
	twitter: (twitter: string) => {
		const pattern = /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}$/;
		return !pattern.test(twitter) ? 'Please enter a valid Twitter Profile URL!' : null;
	},
	discord: (discord: string) => {
		if (!discord) {
			return null;
		}
		const pattern = /^(https?:\/\/)?(www\.)?discord\.gg\/[A-Za-z0-9]+$/;
		return discord.length > 0 && !pattern.test(discord)
			? 'Please enter a valid Discord invite link!'
			: null;
	},
	checkbox: (checkbox: boolean) => {
		return !checkbox ? 'Please accept TOS to continue' : null;
	}
};
