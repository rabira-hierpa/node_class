new window.EventSource('/sse').onmessage = function (event) {
	// adds the new chat message to the div element
	// with the id 'messages'
	window.messages.innerHTML += `<p>${event.data}</p>`;
};

window.form.addEventListener('submit', function (evt) {
	evt.preventDefault();

	window.fetch(`/chat?message=${window.input.value}`);
	window.input.value = '';
});
