import bcrypt from 'bcrypt';

export const verifyPassword = async (plainPassword:string, hashedPassword:string) =>{
    try{
        const PasswordMaching:boolean = await bcrypt.compare(plainPassword,hashedPassword);
        if(PasswordMaching){
            return true;
        }
        return false;
    }catch(error){
        console.log('error',error);
    }
}