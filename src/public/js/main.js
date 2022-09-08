import { emitData, readMessages } from "./socketFront.js";

const d = document;

//DOM ELEMENTS
const $chatForm = d.getElementById("chatForm");
const $nombre = d.getElementById("nombre");
const $apellido = d.getElementById("apellido");
const $edad = d.getElementById("edad");
const $alias = d.getElementById("alias");
const $outputChats = d.getElementById("outputChats");
const $mensaje = d.getElementById("mensaje");
const $email = d.getElementById("email");
const $btnLogout = d.getElementById("logout");
const $compressionInfo = d.getElementById("compression-info");

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity(
	"author",
	{},
	{ idAttribute: "id" }
);

// Definimos un esquema de mensaje
const schemaMessage = new normalizr.schema.Entity(
	"post",
	{ author: schemaAuthor },
	{ idAttribute: "_id" }
);

// Definimos un esquema de posts
const schemaMessages = new normalizr.schema.Entity(
	"posts",
	{ mensajes: [schemaMessage] },
	{ idAttribute: "id" }
);
/* ----------------------------------------------------------------------------- */

const renderMessages = (dataNormalized) => {
	const messagesNsize = JSON.stringify(dataNormalized).length;
	let dataDesnormalized = normalizr.denormalize(
		dataNormalized.result,
		schemaMessages,
		dataNormalized.entities
	);
	const messagesDsize = JSON.stringify(dataDesnormalized.mensajes).length;
	const percentageC = parseInt((messagesNsize * 100) / messagesDsize);

	$compressionInfo.innerText = percentageC;

	for (let i of dataDesnormalized.mensajes) {
		$outputChats.innerHTML += `
        <p> ${i._doc.autor.nombre} </p>
        <p> ${i._doc.mensaje}</p>
                `;
	}
};

const renderChat = () => {
	readMessages(renderMessages);
};

d.addEventListener("DOMContentLoaded", (e) => {
	//renderiza los chats
	renderChat();
	//enviar chat
	d.addEventListener("submit", (e) => {
		e.preventDefault();
		$outputChats.innerHTML = "";
		emitData($nombre, $apellido, $edad, $alias, $mensaje, $email);
	});
	//logout boton
	d.addEventListener("click", (e) => {
		if (e.target === $btnLogout) {
			window.location.href = "/api/logout";
		}
	});
});
