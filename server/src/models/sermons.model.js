// sermons-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const mongooseClient = app.get('mongooseClient')
	const { Schema } = mongooseClient
	const sermons = new Schema(
		{
			title: {
				type: String,
				required: true
			},
			datePreached: {
				type: Date
			},
			description: {
				type: String
			},
			scripture: {
				type: String
			},
			audio: {
				type: String
			},
			video: {
				type: String
			},
			seriesId: {
				type: Schema.Types.ObjectId,
				ref: 'series',
				required: true
			},
			authorId: { type: Schema.Types.ObjectId, ref: 'users' }
		},
		{
			timestamps: true
		}
	)

	return mongooseClient.model('sermons', sermons)
}
