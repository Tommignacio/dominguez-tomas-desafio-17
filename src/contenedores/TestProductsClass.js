import { usersRandom } from "../utils/mocks.js"

class TestProductsClass {
    constructor() {
        this.array = []
    }

    createUsuers(cant) {
        for (let i = 0; i < cant; i++) {
            const user = usersRandom()
            this.array.push(user)
        }
        return this.array
    }
}

const products = new TestProductsClass()
export default products