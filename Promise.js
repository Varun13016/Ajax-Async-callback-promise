const { resolve } = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

function makePromiseCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,reject){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange= function(){

        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
            resolve(xhr.responseText);
            }

            else if(xhr.status>=400)
            {
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("Xhr failed");
                console.log("Handle 400 client error or 500 server error at: "+showTime())
            }
        }
    }
        xhr.open(methodType,url,async);
        if(data)
        {
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }    
        console.log(methodType+" request sent to the server");
    });
}
const getURL ="http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
.then(responseText => {
    console.log("Get User Data: "+responseText)
})
.catch(error => console.log("GET error status: "+JSON.stringify(error)));

// const deleteURL ="http://localhost:3000/employees/15";
// makePromiseCall("DELETE", deleteURL, false)
// .then(responseText => {
//     console.log("Delete User Data: "+responseText)
// })
// .catch(error => console.log("Delete error status: "+JSON.stringify(error)));

const postURL ="http://localhost:3000/employees";
const DataBase = {"name": "BHACHI", "salary": "400000"};
makePromiseCall("POST", postURL, true,DataBase)
.then(responseText => {
    console.log("Posted User Data: "+responseText)
})
.catch(error => console.log("Post error status: "+JSON.stringify(error)));