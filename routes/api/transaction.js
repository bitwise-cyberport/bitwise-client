var router = require("express").Router()


/*
{
    userId: string,
    amount: number,
    receiverId: string,
    receiverPassword: string
}

 */
router.post("/", function(req, res) {
    console.log(req.body)
    res.json({
        success: 200,
        message: "transaction received"
    })
})

/*
    userId: string
 */
router.get("/", function(req, res) {

})

module.exports = router