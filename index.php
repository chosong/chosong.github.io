<?php
// include("config.php");
// session_start();
if($_SERVER["REQUEST_METHOD"] == "POST")
{
    // username and password sent from Form
    $myusername=addslashes($_POST['username']);
    $myusername =1;
    if(isset($myusername))
    {
        header("location: testecho.php");
    }
    // $mypassword=addslashes($_POST['password']);

    // $sql="SELECT id FROM admin WHERE username='$myusername' and passcode='$mypassword'";
    // $result=mysql_query($sql);
    // $row=mysql_fetch_array($result);
    // $active=$row['active'];
    // $count=mysql_num_rows($result);


    // // If result matched $myusername and $mypassword, table row must be 1 row
    // if($count==1)
    // {
    // session_register("myusername");
    // $_SESSION['login_user']=$myusername;


    // }
    // else
    // {
    // $error="Your Login Name or Password is invalid";
    // }
}

?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8" />
    <title>GMTOOL</title>

    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <script src="./lib/jquery-1.9.1.min.js"></script>
    <script src="./lib/jquery-ui.min.js"></script>
    <script src="index.js"></script>
    <script src="lib/gslib.js"></script>

</head>
<body>
    <div class="boards">
        <div class="board">
            <div class="panel">
                <h1>어허 Login 하시요!</h1>
                <form action="" method="post">
                <h3>ID</h3>
                <input type="text" class="id" name="username" value =""/>
                <h3>PW</h3>
                <input type="text" class="pass" />
                <button class="button bt_login">Go</button>
                </form>
            </div>
            <br />
        </div>
    </div>
</body>
</html>

