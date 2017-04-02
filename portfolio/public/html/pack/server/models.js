module.exports = {
	highlight: {
		name: {type: String, unique: true},
		type: String,
		background: String,
		i18n: String,//Object
		content: Array,
		contentName: String
	},
	articles: {
		name: String,
		type: String,
		header: String,//Object
		sections: String,//Object
		footer: String,//Object
		i18n: String//Object
	}
};
