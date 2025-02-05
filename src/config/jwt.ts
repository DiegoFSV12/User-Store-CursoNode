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

    static validateToken(token:string){
        return;
    }
}