import{a as c,g as e,E as t}from"../Vis.es.0345dbb6.js";import{v as a}from"../v4.90f1a8cc.js";import"../three.8f03b6f1.js";import"../vis-three.9866afe7.js";const i=new c().setDom(document.getElementById("app")).setSize().setStats(!0);e.injectEngine=i;const g=e("Scene");i.setScene(g.vid);e.injectScene=!0;e("AmbientLight");const r=e("MeshStandardMaterial"),d=e("MeshStandardMaterial"),n=e("PlaneGeometry",{width:20,height:20}),s=a(),l=e("Mesh",{vid:s,material:r.vid,geometry:n.vid,click:[t.generateConfig("focusObject",{params:{target:s,space:"local"}})],rotation:{z:Math.PI/3},position:{x:-15}}),o=a();e("Mesh",{vid:o,material:d.vid,geometry:n.vid,position:{x:15},pointerenter:[t.generateConfig("fadeObject",{params:{target:o}})],pointerleave:[t.generateConfig("fadeObject",{params:{target:o,direction:"in"}})]});const m=a();e("Mesh",{vid:m,material:r.vid,geometry:n.vid,position:{x:-15,y:30},click:[t.generateConfig("showToCamera",{params:{target:m}})]});i.play();window.engine=i;window.mesh1=l;
