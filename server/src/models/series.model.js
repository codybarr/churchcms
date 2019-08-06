// series-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const mongooseClient = app.get('mongooseClient')
	const { Schema } = mongooseClient
	const series = new Schema(
		{
			title: {
				type: String,
				required: true
			},
			description: {
				type: String
			},
			image: {
				type: String,
				default: 'https://dummyimage.com/1280x720/ccc/aaa'
			},
			// sermons: [{
			//   type: Schema.Types.ObjectId, ref: 'sermons'
			// }],
			authorId: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		},
		{
			timestamps: true
		}
	)

	return mongooseClient.model('series', series)
}
