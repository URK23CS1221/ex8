const jwt = require('jsonwebtoken');
module.exports = async function(req,res,next){
  const h=req.headers.authorization;
  if(!h||!h.startsWith('Bearer '))return res.status(401).json({error:'Unauthorized'});
  try{
    const token=h.split(' ')[1];
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    req.user=payload;
    next();
  }catch(e){res.status(401).json({error:'Invalid token'});}
}
