import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const path = 'uploads';
        fs.mkdirSync(path,{recursive:true});
        cb(null,path);
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage:storage
})

export default upload;