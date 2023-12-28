import {
    findAggregation,
    findById,
    createOne,
    deleteOne
} from "../services/products.services.js";

    export const findProductAggregation = async (req, res) => {
        try {
        const products = await findAggregation(req.query);
        res.status(200).json({ message: "Products found", products });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
    
    export const findProductById = async (req, res) => {
        const { idProduct } = req.params;
        try {
        const product = await findById(idProduct);
        if (!product) {
            return res.status(404).json({ message: "No product found with that id" });
        }
        res.status(200).json({ message: "Product found", product });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
    
    export const createProduct = async (req, res) => {
        const { title, description, code, price, stock } = req.body;
        if (!title || !description || !code || !price) {
        return res.status(400).json({ message: "Required data is missing" });
        }
        try {
        const newProduct = await createOne(req.body);
        res.status(201).json({ message: "Product created", product: newProduct });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
    
    export const deleteProduct = async (req, res) => {
        const { idProduct } = req.params;
        try {
        if (!idProduct) {
            return res.status(404).json({ message: "No product found with that id" });
        }
        await deleteOne(idProduct);
        res.status(200).json({ message: "Product deleted" });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
    