import { ipcRenderer  } from "electron";
import $ = require("jquery");
import { getPriority } from "os";

let farve = "black";

setInterval(function(){

    let t = new Date();
    let hb = t.getHours();
    let mb = t.getMinutes();
    let ms = t.getSeconds();

    $("#canvas").empty().append(getTR(hb, farve,"Timer"));
    $("#canvas").append(getTR(mb, farve,"Minutter"));
    $("#canvas").append(getTR(ms, farve,"Sekunder"));

    let tr = $("<tr class='disc'/>");
    tr.append($("<td />").html(""));
    tr.append($("<td />").html("128"));
    tr.append($("<td />").html("64"));
    tr.append($("<td />").html("32"));
    tr.append($("<td />").html("16"));
    tr.append($("<td />").html("8"));
    tr.append($("<td />").html("4"));
    tr.append($("<td />").html("2"));
    tr.append($("<td />").html("1"));
    $("#canvas").append(tr);

}, 1000);

function byteString(n:number):string {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    return ("000000000" + n.toString(2)).substr(-8)
  }

  ipcRenderer.on("info", (e:any,a:any)=>{
    farve = a.farve;
  });

function getTR(n:number, color:string, tekst: string){

    let byte = byteString(n);
    let res = $("<tr/>");
    res.append($("<td />").html(tekst));
    for (let index = 0; index < 8; index++) {
        let t = byte.substring(index,index+1);                
        if(t==="1")
            res.append($("<td/>").append($("<i />").addClass("circle large icon " + color)));
        else
            res.append($("<td/>").append($("<i />").addClass("circle large outline icon " + color)));
    }
    return res;

}