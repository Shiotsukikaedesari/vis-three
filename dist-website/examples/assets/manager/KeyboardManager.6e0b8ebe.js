import"../common.006007ed.js";import{K as n}from"../Vis.es.dd28f8ae.js";import"../three.1b4256b1.js";import"../vis-three.72224a55.js";const o=new n,r=[];for(let e=0;e<=9;e+=1)r.push(String.fromCharCode(e));for(let e=97;e<=122;e+=1)r.push(String.fromCharCode(e));const a=document.querySelector(".keyboard-message");let t="window";r.forEach(e=>{o.register({shortcutKey:[e],desp:`key ${e}`,keyup:c=>{a.innerHTML=`${t} touch '${e}'`}})});document.getElementById("app1").onclick=e=>{t="app1",console.log(t),o.watch(document.getElementById("app1"))};document.getElementById("app2").onclick=e=>{t="app2",o.watch(document.getElementById("app2"))};