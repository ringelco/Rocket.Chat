importScripts('libmp3lame.min.js');

var mp3codec;

self.onmessage = function(e) {
	switch (e.data.cmd) {
	case 'init':
		alert("ummad mp3Worker init!!!!!!");

		if (!e.data.config) {
			e.data.config = { };
		}
		alert("ghabl az lame.init()");

		mp3codec = Lame.init();

		alert("bad az lame.init()");
		alert("mp3 Codec: " + mp3codec);


		Lame.set_mode(mp3codec, e.data.config.mode || Lame.JOINT_STEREO);
		Lame.set_num_channels(mp3codec, e.data.config.channels || 2);
		Lame.set_num_samples(mp3codec, e.data.config.samples || -1);
		Lame.set_in_samplerate(mp3codec, e.data.config.samplerate || 44100);
		Lame.set_out_samplerate(mp3codec, e.data.config.samplerate || 44100);
		Lame.set_bitrate(mp3codec, e.data.config.bitrate || 128);

		alert("Params set!@");


		Lame.init_params(mp3codec);
		alert("initiated");

		console.log('Version :', Lame.get_version() + ' / ',
			'Mode: '+Lame.get_mode(mp3codec) + ' / ',
			'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
			'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
			'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			'Output Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			'Bitlate :' +Lame.get_bitrate(mp3codec) + ' / ',
			'VBR :' + Lame.get_VBR(mp3codec));


		alert('Version :', Lame.get_version() + ' / ',
			'Mode: '+Lame.get_mode(mp3codec) + ' / ',
			'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
			'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
			'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			'Output Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			'Bitlate :' +Lame.get_bitrate(mp3codec) + ' / ',
			'VBR :' + Lame.get_VBR(mp3codec));
		break;
	case 'encode':
		var mp3data = Lame.encode_buffer_ieee_float(mp3codec, e.data.buf, e.data.buf);
		self.postMessage({cmd: 'data', buf: mp3data.data});
		break;
	case 'finish':
		var mp3data = Lame.encode_flush(mp3codec);
		self.postMessage({cmd: 'end', buf: mp3data.data});
		Lame.close(mp3codec);
		mp3codec = null;
		break;
	}
};
