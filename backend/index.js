const express = require('express');

const bodyparser = require('body-parser');

const cors = require('cors');

const mysql = require('mysql2');
const e = require('express');

 

const app = express();

 

app.use(cors());

app.use(bodyparser.json());

app.listen(3000, () =>{

    console.log("server is running");

});

 

//db connection

const db = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '',

    database: 'probuy',

    port: 3307,

    multipleStatements: true

});

 

//checking connection

db.connect(err=> {

    if(err) {console.log(err, 'db_err');}

    console.log('db connected...');

});

/*

app.get('/getcustomer', (req, res)=> {

    let qr = `select * from customer`;

 

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        if(result.length > 0) {

            res.send({

                message: "all customers",

                data:result

            });

        }

    });

});

*/

//get single data

/*app.get('/getcustomer/:id', (req, res) => {

    let gid = req.params.id;

    let qr = `select * from customer where Customer_ID = ${gid}`;

 

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        if(result.length > 0) {

            res.send({

                message: "single data",

                data:result

            });

        }

        else{

            res.send({

                message: "data not found"

            });

        }

 

    });

});*/

 

//insert into customer (sign up)

app.post('/getcustomer' , (req, res) => {

    console.log('createbody ', req.body);

 

    let fname = req.body.First_Name;

    let lname = req.body.Last_Name;

    let email = req.body.Email;

    let pass = req.body.Password;

    let contact = req.body.Contact;

 

    let qr = `insert into Customer (First_Name, Last_Name, Email, Password, Contact)

                values ('${fname}', '${lname}', '${email}', '${pass}', '${contact}')`;

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        //console.log('resullt', result);

        res.send({

            message: 'data inserted'

        });

 

    });

});

 

//insert into cart

app.post('/getcart' , (req, res) => {

    console.log('createbody ', req.body);

 

    let prod_name = req.body.Product_Name;  

    let email = req.body.Email;

    let qty = req.body.Qty;

 

     let qr = `insert into cart (Product_ID, Customer_ID, Qty, Price ,Line_total)

                values(

                    (select Product_ID from Product where Product_Name = '${prod_name}'),

                      (select Customer_ID from Customer where Email = '${email}'),

                      ${qty},

                      (select Price from Product where Product_Name = '${prod_name}'),

                      (select Price from Product where Product_Name = '${prod_name}')*${qty})`;

 

               db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        console.log('result', result);

        res.send({

            message: 'data inserted'

        });

 

    });

});

 

//login

app.get('/getcustomer/:email/:pass', (req, res) => {

    console.log('createbody ', req.params.email, req.params.pass);

    let em = req.params.email;
   // let email = req.body.Email;
    let pass = req.params.pass;

    let qr = `select concat(concat(First_Name, ' '), Last_Name) as Customer_Name from customer
                where Email = '${em}'; select concat(concat(First_Name, ' '), Last_Name) as Customer_Name from customer where Email = '${em}' and Password = '${pass}'`;            


                db.query(qr, (err, result) => {
                    if(err) {console.log(err); }

                    console.log('result', result[0]);
                    console.log('result', result[1]);

                    if(result[0].length > 0){
                        if(result[1].length > 0){
                            res.send({
                                message: 'success',
                                data:result[1]
                            });
                        }

                        if(!(result[1].length > 0)){
                            res.send({
                                message: 'error'
                            });
                        }
                    }

                    if(!(result[0].length > 0)){
                        res.send({
                            message: 'user not found'
                        });
                    }

                    
                   
                
                    });
                

});

/*app.get('/getcustomer/:email', (req, res) => {

    console.log('createbody ', req.body);

    let email = req.body.Email;
    let pass = req.body.Password;

    let qr = `select concat(concat(First_Name, ' '), Last_Name) as Customer_Name from customer
                where Email = '${email}' and Password = '${pass}'`;  
                
                db.query(qr, (err, result) => {

                    if(err) {console.log(err); }
            
                    console.log('result', result);
            
                    res.send({
            
                        message: 'data inserted'
            
                    });
                });   
                
            });            
*/

 

//review

app.post('/getreview' , (req, res) => {

    console.log('createbody ', req.body);

 

    let email = req.body.Email;

    let prodid = req.body.Product_ID;

    let rating = req.body.Rating;

    let comment = req.body.Comment;

 

    let qr = `insert into Review (Customer_ID, Product_ID, Rating, Comment)

                values ((select Customer_ID from Customer where Email = '${email}'), '${prodid}', '${rating}', '${comment}')`;

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        //console.log('resullt', result);

        res.send({

            message: 'data inserted'

        });

 

    });

});

 

//insert into address

app.post('/getaddress' , (req, res) => {

    console.log('createbody ', req.body);

 

    let city = req.body.City;

    let area = req.body.Area;

    let street = req.body.Street;

    let house_no = req.body.House_no;

    let email = req.body.Email;

 

    let qr = `insert into address (City, Area, Street, House_Number, Customer_ID)

                values ('${city}', '${area}', '${street}', '${house_no}', (select Customer_ID from Customer where Email = '${email}'))`;

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        //console.log('resullt', result);

        res.send({

            message: 'data inserted'

        });

 

    });

});

//insert into orders

app.post('/getorders' , (req, res) => {

    console.log('createbody ', req.body);

 

    let email = req.body.Email;

 

   /* let qr1 = `select max(Order_ID) from cart where Customer_ID = (select Customer_ID from Customer where Email = '${email}')`;

 

    db.query(qr1, (err, result) => {

        if(err) {console.log(err); }

        console.log('resullt', result);

        res.send({

            message: 'data '

        });

 

    });*/

   

    let qr = `insert into orders (Order_Date, Customer_ID, Address_ID, Order_Total)

                values (

                  sysdate(),

                  (select Customer_ID from Customer where Email = '${email}'),

                  (select Address_ID from Address where Customer_ID = (select Customer_ID from Customer where Email = '${email}')),

                  (select SUM(Line_Total) from Cart where Customer_ID = (select Customer_ID from Customer where Email = '${email}' ) )

                  )`;

 

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        //console.log('resullt', result);

        res.send({

            message: 'data inserted'

        });

 

    });

});

 

//insert into tracker

app.post('/gettracker', (req, res) => {

    console.log('createbody' , req.body);

    //how to pick the customer id of the current customer? do we do it with email like we did last time

    let email = req.body.Email;

    let qr = `insert into tracker(Customer_ID, Order_ID, Order_Date, Estimated_Delivery_Date) values

                (

                (select Customer_ID from Customer where Email = '${email}'),

                (select max(Order_ID) from orders where Customer_ID = (select Customer_ID from Customer where Email = '${email}')),

                (select MAX(Order_Date) from Orders where Customer_ID = (select Customer_ID from Customer where Email = '${email}')),

                (select MAX(Order_Date) from Orders where Customer_ID = (select Customer_ID from Customer where Email = '${email}'))                

                )`;

 

    db.query(qr, (err, result) => {

        if(err) {console.log(err); }

        //console.log('resullt', result);

        res.send({

            message: 'data inserted'

        });

 

    });

 

});



