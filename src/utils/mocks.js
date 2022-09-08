import { faker } from '@faker-js/faker/locale/es';

//funciones con los moscks genera usuarioo random
export function usersRandom() {
    const user = {
        nombre: faker.name.findName(),
        precio: faker.commerce.price(),
        imagen: faker.internet.avatar()
    }
    return user
}
