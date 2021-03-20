const generate = (min, max, mult = 1) =>
	Math.floor(Math.random() * (max - min + 1) + min) * mult;

function getCountry() {
	const chance = generate(0, 100);
	let select;
	if (chance < 39) {
		select = "US";
	} else if (chance < 50) {
		select = "DE";
	} else if (chance < 65) {
		select = "FR";
	} else if (chance < 80) {
		select = "NL";
	} else {
		select = "GB";
	}
	return select;
	/*const obj = Object.keys(Locations);
	return obj[generate(0, obj.length - 1)];*/
}

function getLocation(country = "US") {
	let state = Locations[country];
	state = state[generate(0, state.length - 1)];
	return {
		City: state[0],
		State: state[1],
		Country: country,
	};
}

function getName(country = "US") {
	const name = Names[country];
	return name[generate(0, name.length - 1)];
}

exports.handler = async function (event) {
	let user;

	if (event.multiValueHeaders["X-Auth-Token"] != "cr52vNGXzCFkpFy5BJbr") {
		user = 0;
	} else {
		const country = getCountry(),
			name = getName(country),
			location = getLocation(country);

		user = {
			Name: name,
			City: location.City,
			State: location.State,
			Country: location.Country,
		};
	}

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "https://kyledev",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers": "X-Auth-Token",
		},
		body: JSON.stringify(user),
	};
};
