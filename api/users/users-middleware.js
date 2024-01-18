function checkPasswordLength(req, res, next) {
    if (!req.body.password || req.body.password.length < 3) {
      next({ message: "Password must be longer than 3 chars", status: 422 })
    } else {
      next()
    }
    }

    function checkCreds(req, res, next) {
        if (!req.body.username || !req.body.password) {
            next({ message: "Username and Password Required" })
        }else {
          next()
        }
    }

    



    module.exports = {
        checkPasswordLength,
        checkCreds
    }