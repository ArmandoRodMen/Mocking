import { 
    createCart, 
    findCartById, 
    addProductToCart, 
    findProductsInCart, 
    updateProductInCart, 
    deleteProductInCart, 
    deleteProductsInCart, 
    updateAllProducts, 
    getCarts, 
    deleteCart, 
    purchase
} from "../services/carts.services.js";

export const createNewCart = async (req, res) => {
    try {
        const newCart = await createCart();
        res.status(200).json({ message: "Cart created", cart: newCart });
    } catch (error) {
        res.status(500).json({ message: "Error creating cart", error: error.message });
    }
};

export const findCart = async (req, res) => {
    const { idCart } = req.params;
    try {
    const cart = await findCartById(idCart);
    res.status(200).json({ message: "Cart found", cart });
    } catch (error) {
    res.status(404).json({ message: "Cart not found", error: error.message });
    }
};

export const addProduct = async (req, res) => {
    const { idCart, idProduct } = req.params;
    try {
    const updatedCart = await addProductToCart(idCart, idProduct);
    res.status(200).json({ message: "Product added to cart", cart: updatedCart });
    } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error: error.message });
    }
};

export const getProductsInCart = async (req, res) => {
    const { idCart } = req.params;
    try {
    const productsInCart = await findProductsInCart(idCart);
    res.status(200).json({ message: "Products in cart", products: productsInCart });
    } catch (error) {
    res.status(500).json({ message: "Error retrieving products in cart", error: error.message });
    }
};

export const getProductInCart = async (req, res) => {
    const { idCart, idProduct } = req.params;
    try {
    const productInCart = await addProductToCart(idCart);
    res.status(200).json({ message: "Product added to cart", cart: updatedCart });
    } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error: error.message });
    }
};

export const getTotal = async (req, res) =>{
    const {idCart} = req.params;
    try{
        const response = await purchase(idCart);
        res.status(200).json({ message: "Purchase done", purchase: response});
    }catch(error){
        res.status(500).json({ message: "Error in purchase", error: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    const { idCart, idProduct } = req.params;
    const { quantity } = req.body;
    try {
    const updatedCart = await updateProductInCart(idCart, idProduct, quantity);
    res.status(200).json({ message: "Product quantity updated in cart", cart: updatedCart });
    } catch (error) {
    res.status(500).json({ message: "Error updating product quantity in cart", error: error.message });
    }
};

export const removeProductFromCart = async (req, res) => {
    const { idCart, idProduct } = req.params;
    try {
    const updatedCart = await deleteProductInCart(idCart, idProduct);
    res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
    } catch (error) {
    res.status(500).json({ message: "Error removing product from cart", error: error.message });
    }
};

export const removeAllProductsFromCart = async (req, res) => {
    const { idCart } = req.params;
    try {
    await deleteProductsInCart(idCart);
    res.status(200).json({ message: "All products removed from cart", cartId: idCart });
    } catch (error) {
    res.status(500).json({ message: "Error removing all products from cart", error: error.message });
    }
};

export const updateAllProductsInCart = async (req, res) => {
    const { idCart } = req.params;
    const { products } = req.body;
    try {
    const updatedCart = await updateAllProducts(idCart, products);
    res.status(200).json({ message: "All products in cart updated", cart: updatedCart });
    } catch (error) {
    res.status(500).json({ message: "Error updating all products in cart", error: error.message });
    }
};

export const getAllCartsData = async (req, res) => {
    try {
    const carts = await getCarts();
    res.status(200).json({ message: "All carts retrieved", carts });
    } catch (error) {
    res.status(500).json({ message: "Error retrieving all carts", error: error.message });
    }
};

export const removeCartById = async (req, res) => {
    const { idCart } = req.params;
    try {
    const result = await deleteCart(idCart);
    res.status(200).json({ message: "Cart deleted", result });
    } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error: error.message });
    }
};
