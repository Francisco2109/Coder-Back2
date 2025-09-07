import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';


// /**
//  * @param {String} password 
//  * @returns 
//  */
// export const createHash = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }

// /**
//  * @param {String} passwordPlain 
//  * @param {String} passwordHash 
//  * @returns 
//  */
// export const passwordValidation = (passwordPlain, passwordHash) => {
//     return bcrypt.compareSync(passwordPlain, passwordHash)
// }

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;