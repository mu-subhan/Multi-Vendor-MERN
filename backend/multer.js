const multer = require("multer");



const storage = multer.diskStorage({
    destination:function (req,res,cb){
        cb(null,"uploads/");
    },
    filename:function (Req,file,cb) {
        const uniqueSuffix = Data.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[10];
        cb(null,filename + "-" + uniqueSuffix + ".png");
    },

});

exports.upload = multer({storage:storage})