import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

export const host =
	process.env.NODE_ENV === 'production'
		? 'https://churchcms.now.sh'
		: 'http://localhost:3030'

// console.log('API_HOST is: ', host)
// console.log('ENVIRONMENT is: ', process.env.NODE_ENV)
// console.log('ENV is: ', process.env)

const socket = io(host, { transports: ['websocket'] })

const feathersClient = feathers()
	.configure(socketio(socket))
	.configure(auth({ storage: window.localStorage }))

export default feathersClient
