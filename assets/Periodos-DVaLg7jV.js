import{w as d,r as o,j as t,L as l}from"./index-DL9rO1lR.js";import{u as p,m as f,G as x}from"./useSetBreadcrumb-DrZyXGa-.js";import{C as h,a as j}from"./CardContent-n1ryRlRA.js";import"./colorInversionUtils-Cw3K6i6S.js";function P(){const[s]=d(),[m,n]=o.useState(null),[c,u]=o.useState([]),i=p();return o.useEffect(()=>{const e=f.find(a=>a.id==s.get("materia"));i([{nombre:"Materias"},{nombre:e.nombre}]),u(e.periodos)},[i,s]),t.jsx(x,{sx:{height:"100%"},container:!0,gap:4,alignItems:"center",justifyContent:"center",children:c.map(({año:e,cuatrimestre:a,id:r})=>t.jsx(l,{style:{textDecoration:"none"},to:`./cursos?materia=${s.get("materia")}&periodo=${r}`,children:t.jsx(h,{onMouseOver:()=>n(r),onMouseLeave:()=>n(null),color:"neutral",variant:m===r?"solid":"soft",children:t.jsx(j,{children:`${e} - ${a}° Cuatrimestre`})})},r))})}export{P as default};
