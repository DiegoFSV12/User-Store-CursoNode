import { Request, Response } from "express"
import { CreateProductDTO, CustomError, PaginationDTO } from "../../domain";
import { ProductService } from "../service/product.service";



export class ProductsController{
    constructor(
        private readonly productService:ProductService,
    ){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(Number(error.statusCode)).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }

    createProducts = async(req:Request, res:Response) =>{
        const [error,createProductDTO] = CreateProductDTO.create(req.body);
        if(error) return res.status(400).json(error);
        this.productService.createProduct(createProductDTO!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error,res));
    }

    getProducts = async(req:Request, res:Response) =>{
        const{page=1,limit=10}=req.query;
        const [error, paginationDto] = PaginationDTO.create(Number(page),Number(limit));
        if(error) return res.status(400).json(error);
        this.productService.getProducts(paginationDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error,res));
    }
}