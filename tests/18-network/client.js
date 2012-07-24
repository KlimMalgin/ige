var Client = IgeClass.extend({
	classId: 'Client',

	init: function () {
		// Load our textures
		var self = this;

		this.obj = [];
		this.gameTexture = {};

		// Enable networking
		ige.addComponent(IgeSocketIoComponent);

		// Implement our game methods
		this.implement(ClientNetworkEvents);

		ige.createFrontBuffer(true);

		// Ask the engine to start
		ige.start(function (success) {
			// Check if the engine started successfully
			if (success) {
				// Start the networking (you can do this elsewhere if it
				// makes sense to connect to the server later on rather
				// than before the scene etc are created... maybe you want
				// a splash screen or a menu first? Then connect after you've
				// got a username or something?
				ige.network.start('http://localhost:2000', function () {
					// Define network command listeners
					ige.network.define('test', self._onTest);

					// Send the server a test message
					ige.network.send('test', {moo: 'Some test data!'});
				});
			}
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }