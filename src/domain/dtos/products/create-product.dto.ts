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
            available=false,
            price,
            description,
            user,
            category
        } = object;
        if(!name) return ['Missign name'];
        if(!price) return ['Missign price'];
        if(!user) return ['Missign user'];
        if(!category) return ['Missign category'];

        let availableBoolean = available;
        if(typeof available != 'boolean'){
            availableBoolean = (available === 'true');
        }
        return [undefined,new CreateProductDTO(name,availableBoolean,price,description,user,category)];
    }
}