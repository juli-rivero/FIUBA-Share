import{k as h,r as o,j as r,L as d}from"./index-B_QbXz0l.js";import{m as f,S as g,H as x,G as p,C as j,a as $}from"./Header-BchNVaqi.js";import"./ThemeToggle-BGcC6QYN.js";function v(){const[t]=h(),[i,n]=o.useState(null),[c,m]=o.useState([]),[u,l]=o.useState([]);return o.useEffect(()=>{const a=f.find(e=>e.id==t.get("materia")),s=a.fechas.find(e=>e.año.toString()==t.get("anio")&&e.cuatrimestre.toString()==t.get("cuatrimestre"));m([{nombre:"Materias",href:"../../"},{nombre:a.nombre,href:`../?materia=${t.get("materia")}`},{nombre:`${s.año} - ${s.cuatrimestre}° Cuatrimestre`}]),l(s.cursos)},[]),r.jsxs(g,{sx:{height:"100%"},gridTemplateRows:"auto 2fr",children:[r.jsx(x,{breadcrumb:c}),r.jsx(p,{sx:{height:"100%"},container:!0,gap:4,alignItems:"center",justifyContent:"center",children:u.map(({id:a,nombre:s},e)=>r.jsx(d,{style:{textDecoration:"none"},to:`./tps?materia=${t.get("materia")}&anio=${t.get("anio")}&cuatrimestre=${t.get("cuatrimestre")}&curso=${a}`,children:r.jsx(j,{onMouseOver:()=>n(e),onMouseLeave:()=>n(null),color:"neutral",variant:i===e?"solid":"soft",children:r.jsx($,{children:`${a} - ${s}`})})},e))})]})}export{v as default};
