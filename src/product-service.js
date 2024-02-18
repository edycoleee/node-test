import {getAllProducts, getProductById} from "./database.js";

// menggunakan class
// export class ProductService {

//     static findById(id) {
//         return getProductById(id);
//     }

//     static findAll() {
//         return getAllProducts();
//     }

// }

//menggunakan function
function findById(id) {
    return getProductById(id);
}

function findAll() {
    return getAllProducts();
}

const ProductService = {
    findById: findById,
    findAll: findAll
};

export default ProductService;
