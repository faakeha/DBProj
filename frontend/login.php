<?php
    //get values from form in login
    $email = $_POST['email']; //id used in form
    $password = $_POST['pass'];

    mysql_connect("localhost", "root", "");
    mysql_select_db("probuy");

    //query
    $result = mysql_query("select * from customer where Email = '$email' and Password = '$pass'")
                or die('failed to query database'.mysql_error());

    $row = mysql_fetch_array($result);
    if($row['Email'] == $email && $row['Password'] == $password){
        
    }            