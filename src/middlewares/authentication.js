import jwt from "jsonwebtoken";

export const authentication = async(req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        // throw new CustomError(error.message)
        res.status(401).json('Authentication Failed');
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        req.user = {userId: decodedToken.userId} // Add user data to the request object
        next();
    }catch(error){
        console.log(error);
        res.status(400).send("invalid credentials");
    }
}