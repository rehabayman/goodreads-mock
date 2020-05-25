const {authorModel} = require("../models/index");
const fs = require('fs');
exports.getAllAuthors=async(req,res)=>{
        const { page = 1, limit = 10 } = req.query;
        try{
            const authors = await authorModel.find()
            .populate('books') 
            .limit(limit * 1)  
            .skip((page - 1) * limit)
            .sort({name:'asc'})
            .exec();
            const count = await authorModel.countDocuments();
            console.log(authors);
            res.json({
                authors
              });
        }catch(err){
            console.error(err.message);
        }
};
exports.addAuthor=(req,res)=>{
    const {body : {firstName,lastName,birthdate}} = req;
    // console.log(req.body);
    const url = req.protocol + '://' + req.get('host')
    // const image_ext = req.file.originalname.split('.')[1];
    let image_path = url + '/public/upload/authors/' +req.file.filename ;

    // fs.rename(req.file.path, process.env.AUTHORS_PICS + image_path, (err) => {
    //     if (err) console.log(err);
    // });


    const author = new authorModel({
        firstName,
        lastName,
        birthdate,
        image_path
    })
    author.save((err,author)=>{
        if(err) return res.send(err);
        res.json(author);
    })
}
 exports.updateAuthor = (req, res) => {
    const authorId = req.params.id;
    const url = req.protocol + '://' + req.get('host')
    // const image = req.file && req.file.path;
    let image_path = url + '/public/upload/authors/' +req.file.filename ;
    console.log(req.file);
    authorModel.findOneAndUpdate({_id: authorId}, {
        ...req.body,
        image_path
    }).then((author) => {
        console.log("adsadad",author);
        
        // if (req.file) {
        //     fs.unlinkSync(author.image_path);
        // }
        res.status(200).json({"data": author});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({"error": err});
    })
};


exports.deleteAuthor=(req,res)=>{
    authorModel.findByIdAndRemove({_id:req.params.id},req.body,(err,author)=>{
        if(err) return res.send(err);
        res.json(author);
    })
}
exports.authorGetDetails=async(req,res)=>{
    try {
        // let authors =await authorModel.find({author: req.params.id})
        let author =await authorModel.findById({_id: req.params.id})
        .populate("category").populate("books")
        .sort({name:'asc'})
        .exec();
        let docs =await authorModel.countDocuments({author: req.params.id}).exec();
        console.log(docs);
        
        author1={author,docs};
        res.send(author);
    } catch ( err ){
        console.log(err);
        res.send(err);
    }
}