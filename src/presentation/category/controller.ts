import { Request, Response } from "express"
import { CreateCategoryDTO, CustomError } from "../../domain";

export class CategoryController{
    constructor(){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(Number(error.statusCode)).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }

    createCategory = async(req:Request, res:Response) =>{
        // const [error,createCategoryDto] = CreateCategoryDTO.create(req.body);
        // if(error) res.status(400).json(error);
        // res.json(createCategoryDto);
        res.json(req.body)
    }

    getCategories = async(req:Request, res:Response) =>{
        res.json('Get categories');
    }
}