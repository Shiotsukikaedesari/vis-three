import{c as i,d as s}from"../Vis.es.0345dbb6.js";import{k as c,m}from"../three.8f03b6f1.js";import{g as l}from"../lil-gui.module.min.2e05211e.js";import"../vis-three.9866afe7.js";const d=new i().setPath("/vis-three/examples/");d.addEventListener("loaded",g=>{const e=new c;e.image=d.getResource("/texture/Bricks_Color.jpg"),e.needsUpdate=!0;const o=new m({map:e,bumpMap:e,bumpScale:2}),t=new s({dom:document.getElementById("app"),material:o});t.render();const a=new l,n={rotation:e.rotation*180/Math.PI,centerX:e.center.x,centerY:e.center.y,wireframe:o.wireframe,color:o.color.getHex()};a.addColor(n,"color").onChange(r=>{o.color.setHex(r),t.render()}),a.add(n,"wireframe").onChange(r=>{o.wireframe=r,t.render()}),a.add(n,"rotation",0,360,1).onChange(r=>{e.rotation=r*Math.PI/180,t.render()}),a.add(n,"rotation",0,360,1).onChange(r=>{e.rotation=r*Math.PI/180,t.render()}),a.add(n,"centerX",0,1,.01).onChange(r=>{e.center.x=r,t.render()}),a.add(n,"centerY",0,1,.01).onChange(r=>{e.center.y=r,t.render()})});d.load(["/texture/Bricks_Color.jpg"]);
