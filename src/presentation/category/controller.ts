import { Request, Response } from "express"
import { CreateCategoryDTO, CustomError, PaginationDTO } from "../../domain";
import { CategoryService } from "../service/category.service";

export class CategoryController{
    constructor(
        private readonly categoryService:CategoryService,
    ){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(Number(error.statusCode)).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }

    createCategory = async(req:Request, res:Response) =>{
        const [error,createCategoryDto] = CreateCategoryDTO.create(req.body);
        if(error) res.status(400).json(error);
        this.categoryService.createCategory(createCategoryDto!,req.body.user)
            .then(category => res.status(201).json(category))
            .catch(error => this.handleError(error,res));
    }

    getCategories = async(req:Request, res:Response) =>{
        const{page=1,limit=10}=req.query;
        const [error, paginationDto] = PaginationDTO.create(Number(page),Number(limit));
        if(error) return res.status(400).json(error);
        this.categoryService.getCategories(paginationDto!)
            .then(category => res.status(201).json(category))
            .catch(error => this.handleError(error,res));
    }
}