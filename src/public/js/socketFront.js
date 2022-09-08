const socket = io.connect();

//SOCKET FRONT END

//lee data de la DB
export const readMessages = (callback) => {
    socket.on("DBdata:messages", callback)
}

//emite dato del usario y chat al servidor
export const emitData = (
    $nombre,
    $apellido,
    $edad,
    $alias,
    $mensaje,
    $email
) => {
    socket.emit("chatData", {
        nombre: $nombre.value,
        apellido: $apellido.value,
        edad: $edad.value,
        alias: $alias.value,
        mensaje: $mensaje.value,
        email: $email.value,
    });
};







