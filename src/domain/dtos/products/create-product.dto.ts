import { Validators } from "../../../config";

export class CreateProductDTO{
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,//id
        public readonly category: string,//id
    ){}

    static create(object:{[key:string]:any}):[string?,CreateProductDTO?]{
        const {
            name,
            available,
            price,
            description,
            user,
            category
        } = object;
        if(!name) return ['Missign name'];
        if(!price) return ['Missign price'];
        if(!user) return ['Missign user'];
        if(!Validators.isMongoId(user)) return ['Invalid user Id'];
        if(!category) return ['Missign category'];
        if(!Validators.isMongoId(category)) return ['Invalid category Id'];
        return [
            undefined,
            new CreateProductDTO(
                name,
                !!available,
                price,
                description,
                user,
                category
            )];
    }
}