({
	baseUrl: "../",
	name: "build/almond",
	out: "../dist/cydr-dist.js",
	packages: ['src'],
	include: ['src/main'],
	wrap: {
		startFile: "start.frag",
		endFile: "end.frag"
	}

})