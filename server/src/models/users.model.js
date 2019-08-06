// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const mongooseClient = app.get('mongooseClient')
	const { Schema } = mongooseClient
	const users = new Schema(
		{
			email: { type: String, required: true, unique: true },
			password: { type: String, required: true },
			name: { type: String, required: true },
			avatar: {
				type: String,
				default:
					'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128'
			},
			role: { type: String, default: 'normal' }
		},
		{
			timestamps: true
		}
	)

	return mongooseClient.model('users', users)
}
