// pages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const mongooseClient = app.get('mongooseClient')
	const { Schema } = mongooseClient
	const pages = new Schema(
		{
			title: { type: String, required: true },
			slug: { type: String, required: true },
			showInNavbar: { type: Boolean, required: true },
			image: { type: String },
			content: { type: String },
			authorId: { type: Schema.Types.ObjectId, ref: 'users' }
		},
		{
			timestamps: true
		}
	)

	return mongooseClient.model('pages', pages)
}
