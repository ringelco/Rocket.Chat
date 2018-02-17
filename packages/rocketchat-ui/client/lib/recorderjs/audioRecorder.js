/* globals Recorder */
this.AudioRecorder = new class {
	start(cb) {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		window.audioContext = new AudioContext;

		const ok = stream => {
			this.startUserMedia(stream);
			return (cb != null ? cb.call(this) : undefined);
		};

		if ((navigator.getUserMedia == null)) {
			return cb(false);
		}

		return navigator.getUserMedia({audio: true}, ok, e => console.log(`No live audio input: ${ e }`));
	}

	startUserMedia(stream) {
		this.stream = stream;
		const input = window.audioContext.createMediaStreamSource(stream);
		this.recorder = new Recorder(input, {workerPath: '/recorderWorker.js'});
		return this.recorder.record();
	}

	stop(cb) {
		alert('kojas?');

		this.recorder.stop();

		if (cb != null) {
			this.getBlob(cb);
		}

		alert('kojast 1');

		this.stream.getAudioTracks()[0].stop();

		alert('kojast 2');

		this.recorder.clear();

		alert('kojast 3');

		window.audioContext.close();

		alert('kojast 4');

		delete window.audioContext;

		alert('kojast 5');

		delete this.recorder;

		alert('kojast 6');

		return delete this.stream;
		alert('kojast 7');

	}

	getBlob(cb) {

		return this.recorder.exportWAV(cb);

	}
};
