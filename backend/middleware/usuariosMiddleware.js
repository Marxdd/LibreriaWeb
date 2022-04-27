
module.exports = {    
    duplicate_email(db) {
        return async (req, res, next) => {
            let availableEmail = await db.collection("usuarios").findOne({'correo': req.body.correo})
            if (!availableEmail) {
                console.log(" FORBIDDEN  ");
                res.status(403).send({errorCode: "403"})
                return
            } else {
                next() // continue the process
            }
        }
    }
}