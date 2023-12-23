

module.exports = MyFn =>{
    return (req, res, next)=> {
        // MyFn(req, res, next).catch((err) => next(err))
        MyFn(req, res, next).catch(next)
    };
};