import"../common.006007ed.js";import{aN as r,aa as p,M as g,g as m,m as j,i as w,L as b,v as h,s as u,a7 as O,a8 as f,V as x}from"../three.fec063a1.js";import{g as y}from"../lil-gui.module.min.2e05211e.js";import{f as P,S as M}from"../Vis.es.d8d395f3.js";import"../vis-three.59b4e7ed.js";const o=new P().complete().setDom(document.getElementById("app")).setSize().play(),v=new r().setPath("/vis-three/examples//texture/skyBox/snowVillage/").load(["px.jpg","nx.jpg","py.jpg","ny.jpg","pz.jpg","nz.jpg"]),i=o.scene;i.background=v;i.add(new p);const t=new g(new m(10,10,10),new j({color:"rgb(255, 105, 100)"}));i.add(t);const a=new w(t.geometry,new b({color:"rgb(255, 255, 100)"}));a.position.set(0,0,15);i.add(a);const c=new h(t.geometry,new u({color:"rgb(55, 255, 100)"}));c.position.set(0,0,-15);i.add(c);const d=new O(new f({color:"rgb(155, 155, 255)"}));d.position.set(0,15,0);d.scale.set(10,10,0);i.add(d);window.engine=o;const e=new M(new x(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio),2,1,.4,o.scene,o.camera,[t]);console.log(e);o.effectComposer.addPass(e);const l={mesh:!0,line:!1,points:!1,sprite:!1},n=new y;n.add(l,"mesh").onChange(s=>{s&&!e.selectedObjects.includes(t)?e.selectedObjects.push(t):e.selectedObjects.splice(e.selectedObjects.indexOf(t),1)});n.add(l,"line").onChange(s=>{s&&!e.selectedObjects.includes(a)?e.selectedObjects.push(a):e.selectedObjects.splice(e.selectedObjects.indexOf(a),1)});n.add(l,"points").onChange(s=>{s&&!e.selectedObjects.includes(c)?e.selectedObjects.push(c):e.selectedObjects.splice(e.selectedObjects.indexOf(c),1)});n.add(l,"sprite").onChange(s=>{s&&!e.selectedObjects.includes(d)?e.selectedObjects.push(d):e.selectedObjects.splice(e.selectedObjects.indexOf(d),1)});n.add(e,"strength",0,3,.01);n.add(e,"radius",0,3,.01);n.add(e,"threshold",0,1,.01);