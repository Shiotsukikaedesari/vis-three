import{c,R as d,M as g}from"../Vis.es.0345dbb6.js";import{n as p,c as l}from"../three.8f03b6f1.js";import"../vis-three.9866afe7.js";var m=["/model/katana/katana.obj"];const t=new c,s=new d,f=new g().setDom(document.getElementById("app")).setStats(!0).setSize().play(),o=f.scene,r=new p("rgb(255, 255, 255)",1,100,.01);r.position.set(10,10,10);o.add(r);t.addEventListener("loaded",a=>{s.mappingResource(a.resourceMap),a.resourceMap.forEach((e,n)=>{e instanceof l&&(e.scale.set(30,30,30),o.add(e))})});s.addEventListener("mapped",a=>{console.log(a);let e="";a.configMap.forEach((n,i)=>{e+=`${i}: ${JSON.stringify(n)}
`}),e=e.replace(/",/g,`",
`).replace(/"},/g,`"},
`).replace(/{"/g,`{"
`),document.getElementById("mappingStructure").innerText=e});t.load(m);
