bookModel =  require ('../models/books');

exports.addBook = (req, res , next) => {
    const { body: { name, image_path , author, category } } = req;
       const bookdata = new bookModel({
           name,
           image_path,
           author,
           category
       })
       bookdata.save((err, book )=>{
           if(err) next(err);
           res.json(book)
       })
   }

exports.oneBook = (req, res, next) => {
    bookModel.findById(req.params.id)
    .populate('authors', 'firstname lastname')
    .populate('categories', 'name')
    .exec((err, book)=>{
        if(err) next('cannot find this book');
        res.json(book)
    })
}

exports.allBooks = (req, res, next) => {
    bookModel.find({ })
    .populate('authors', 'firstname lastname')
    .populate('categories', 'name')
    .exec((err, book)=>{
        if(err) next('cannot find books');
        res.json(book)
    })
};

exports.editBook = (req, res, next) => {
    const { body: { name,
        image_path,
        author,
        category } } = req; 
    bookModel.findByIdAndUpdate(req.params.id,{
        name,
        image_path,
        author,
        category
    },
    {new: true}
    ,(err,book)=>{
        if(err) next('cannot update the book');
        res.json(book)
    })
}

exports.removeBook = (req, res, next) => {
    bookModel.findByIdAndRemove(req.params.id,
    (err)=>{
        if(err) next('cannot find the book');
        res.send('success')
    })
}
