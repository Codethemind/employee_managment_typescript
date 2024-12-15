import { Schema,model} from "mongoose";
interface employeetype{
    name:string;
    email:string;
    address:string;
    number:number
}

const employeeschama=new Schema<employeetype>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
})

const employee=model<employeetype>('emplloyee',employeeschama)
module.exports = employee