let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
function showTime(){
    const date=new Date();
    return date.getHours()+"hrs:"+date.getMinutes()+"mins:"+date.getSeconds()+"secs";

}
function makeAJAXCall(methodType,url,callback,async=true,data=null)
{
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
       if(xhr.readystatus===4){
            if(xhr.status===200 || xhr.status===201)
            {
                callback(xhr.responseText);
            } else if(xhr.status >=400 ){
                console.log("handle 400 clients error or 500 server error at :"+showTime())
            }
        }
    }
    xhr.open(methodType,url,async);
    if (data) 
    {
        xhr.setRequestHeader("Content-Type","application/json");
        xhr,send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType+"request sent to the server" +showTime());
}

const getURL="http://localhost:3000/employees";
function getUserDetails(data)
{
    console.log("get user data:"+showTime() + "data:" +data)
}
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("made GET AJAX Call to server"+showTime());

const deleteURL ="http://localhost:3000/employees/2";
function userDeleted(data)
{
    console.log("User Deleted :"+showTime() + "data:" +data)
}
makeAJAXCall("Delete", deleteURL,userDeleted, false);
console.log("made Delete AJAX Call to server"+showTime());

const PostURL ="http://localhost:3000/employees";
const DataBase = {"name": "Arun","salary": "17000"};
function userAdded(data)
{
    console.log("User Added :"+showTime() + "data:" +data)
}
makeAJAXCall("Post", PostURL,userAdded, true, DataBase);
console.log("made Post AJAX Call to server"+showTime());
