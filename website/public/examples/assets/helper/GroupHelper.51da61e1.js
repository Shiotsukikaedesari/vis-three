import{M as n,G as o}from"../Vis.es.638ec8a7.js";import{a1 as a,M as r,g as i,m as d,G as m}from"../three.8f03b6f1.js";import"../vis-three.9866afe7.js";const p=document.getElementById("app"),c=new n().setDom(p).setSize().setStats(!0).play(),e=c.scene;e.add(new a("white",1));const t=new r(new i(10,10,10),new d({color:"rgb(255, 105, 100)"}));t.position.set(-15,15,-15);const s=new m;s.add(t);const g=new o(s);e.add(s);e.add(g);