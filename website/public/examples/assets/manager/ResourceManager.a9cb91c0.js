import"../common.006007ed.js";import{n as i,c as d}from"../three.fec063a1.js";import{c as p,R as g,M as m}from"../Vis.es.d8d395f3.js";import"../vis-three.59b4e7ed.js";var l=["/model/katana/katana.obj"];const t=new p,s=new g,f=new m().setDom(document.getElementById("app")).setStats(!0).setSize().play(),o=f.scene,r=new i("rgb(255, 255, 255)",1,100,.01);r.position.set(10,10,10);o.add(r);t.addEventListener("loaded",n=>{s.mappingResource(n.resourceMap),n.resourceMap.forEach((e,a)=>{e instanceof d&&(e.scale.set(30,30,30),o.add(e))})});s.addEventListener("mapped",n=>{console.log(n);let e="";n.configMap.forEach((a,c)=>{e+=`${c}: ${JSON.stringify(a)}
`}),e=e.replace(/",/g,`",
`).replace(/"},/g,`"},
`).replace(/{"/g,`{"
`),document.getElementById("mappingStructure").innerText=e});t.load(l);