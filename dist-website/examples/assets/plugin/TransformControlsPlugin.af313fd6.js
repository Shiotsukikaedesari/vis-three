import{f as r}from"../Vis.es.7c5541b7.js";import{n as m,M as s,g as c,m as l,i as d,v as g}from"../three.b54e9ae7.js";import"../vis-three.36482fbe.js";const o=new r().install("TransformControls").complete().setDom(document.getElementById("app")).setSize().play();o.eventManager.recursive=!0;const t=o.scene,a=new m("rgb(255, 255, 255)",1,300,0);a.position.y=30;t.add(a);const e=new s(new c(10,10,10),new l({color:"rgb(255, 105, 100)"}));e.position.x=10;t.add(e);const n=new s(e.geometry,e.material);n.position.x=10;n.position.y=10;n.position.z=-10;e.add(n);const p=new d(e.geometry);t.add(p);const i=new g(e.geometry);i.position.x=-10;t.add(i);console.log(o);document.getElementById("translate").onclick=()=>{o.transformControls.mode="translate"};document.getElementById("rotate").onclick=()=>{o.transformControls.mode="rotate"};document.getElementById("scale").onclick=()=>{o.transformControls.mode="scale"};