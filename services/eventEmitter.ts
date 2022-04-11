import Events from 'events'
// Initialize event emitter
const eventEmitter = new Events()

const emitter = {
	on: (e: any, fn: any) => eventEmitter.on(e, fn),
	once: (e: any, fn: any) => eventEmitter.once(e, fn),
	off: (e: any, fn: any) => eventEmitter.off(e, fn),
	emit: (e: any, fn: any) => eventEmitter.emit(e, fn),
}

// prevent new properties being added
Object.freeze(emitter)

export default emitter
