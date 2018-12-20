//since only the return of an array is needed, it was mocked with a online service
//if a more complex api was needed, services like postman api mock could be used
const apiUrl = "http://www.mocky.io/v2/5c1ac2513300004f007fd560";

class ApiException {
	constructor(code, message) {
		this.message = message;
		this.code = code;
	}

	displayError() {
		alert('Code: ' + this.code + ' Message:' + this.message);
	}
}

class ApiConsumer {
	constructor(api_url) {
		this.api_url = api_url;
	}

	get api_url() {
		return this._api_url;
	}

	set api_url(api_url) {
		this._api_url = api_url;
	}

	fetch(cb) {
		let request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
					cb(this.response);
				} else {
					throw new ApiException(this.status, this.response);
				}
			}
		}
		request.open("GET", this.api_url, true);

		request.send();
	}
}

let api = new ApiConsumer(apiUrl),
	testingIds = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

api.fetch(
	result => {
		testingIds.forEach(e => {
			console.log(findItemById(JSON.parse(result), e));
		});
	}
);

function findItemById(tree, id) {
	if (tree.id === id) {
		return tree.label;
	} else if (tree.childs.length > 0) {
		let i, item = null;
		for (i = 0; item == null && i < tree.childs.length; i++) {
			item = findItemById(tree.childs[i], id);
		}
		// since we return tree.label on the first if, no need to do item.label
		return item;
	}
}