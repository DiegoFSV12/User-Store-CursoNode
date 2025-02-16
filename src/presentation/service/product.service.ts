import { ProductModel } from "../../data";
import { CreateProductDTO, CustomError, PaginationDTO } from "../../domain";

export class ProductService{
    constructor(){}

    async createProduct(createProductDTO:CreateProductDTO){
        const productExist = await ProductModel.findOne({name:createProductDTO.name});
        if(productExist) throw CustomError.badRequest('Product already exists');
        try {
            const product = new ProductModel(createProductDTO);
            await product.save();
            return product;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getProducts(paginationDto:PaginationDTO){
        const {page,limit} = paginationDto;
        try {
            const [total,products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find().skip((page-1)*limit).limit(limit)
            ]);
            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${page+1}&limit=${limit}`,
                prev: (page-1>0) ? `/api/products?page=${page-1}&limit=${limit}`:null,
                products: products
        }
        } catch (error) {
            throw CustomError.internalServer('Internal server error');
        }
    }
}