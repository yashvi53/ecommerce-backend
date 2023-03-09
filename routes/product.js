const router=require("express").Router();
const client=require("../connection")
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into products(id, image, category, title,desc,size,price) 
                       values(${user.id}, '${user.image}', '${user.category}', '${user.title}','${user.desc}','${user.size}','${user.price}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


router.get('/', (req, res)=> {
    client.query(`Select * from products `,(err,result)=>{
        if(!err){
        
            res.send(result.rows);
        }
    });
})
router.get("/products/:id",(req,res)=>{
    client.query(`Select * from products where id=${req.params.id}`,(err,result)=>{
        if(!err){
          console.log(req.params.id);
            res.send(result.rows);
        }
    });
});

router.get('/products/:category', async (req, res, next) => {
  try {
    const category = req.params.category;
    const query = `SELECT * FROM products WHERE category = $1`;
    const values = [category];
    const { rows } = await client.query(query, values);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});


router.delete('/products/:id', (req, res)=> {
    let insertQuery = `delete from products where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})



module.exports=router;