import jwt from 'jsonwebtoken'
import { envs } from './envs';

const JWT_SEED=envs.JWT_SEED;

export class jwtAdapter{
    static async generateToken(payload:any, duration:any='2h'){
        return new Promise((resolve)=>{
            jwt.sign(payload, JWT_SEED, { expiresIn: duration},(err, token) =>{
                if(err) return resolve(null);
                return resolve(token);
            });
        });
    }
    //T indica que se devolvera un dato del mismo tipo que se indique al llamar a la función
    static validateToken<T>(token:string): Promise<T|null>{
        return new Promise((resolve)=>{
            jwt.verify(token,JWT_SEED,(err,decoded)=>{
                if(err) return resolve(null);
                resolve(decoded as T);
            })
        });
    }
}