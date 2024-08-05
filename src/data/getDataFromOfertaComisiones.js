const periodos = document.querySelectorAll("[periodo]");

const cuatrimestre1 = periodos[0];
const cuatrimestre2 = periodos[1];
const materias1 = cuatrimestre1.querySelectorAll("[actividad]");
const materias2 = cuatrimestre1.querySelectorAll("[actividad]");

let i = 0,
  j = 0;
const data = {
  materias: [],
};
function getMateriaId(materia) {
  const indiceParentesis = materia.getAttribute("actividad").indexOf("(");
  return materia.getAttribute("actividad").slice(indiceParentesis + 1, -1);
}
function getMateriaName(materia) {
  const indiceParentesis = materia.getAttribute("actividad").indexOf("(");
  return materia.getAttribute("actividad").slice(0, indiceParentesis).trim();
}
while (
  materias1.length > i &&
  materias2.length > j
) {
  if (
    materias1[i].getAttribute("actividad") <
    materias2[j].getAttribute("actividad")
  ) {
    data.materias.push({
      id: getMateriaId(materias1[i]),
      nombre: getMateriaName(materias1[i]),
      periodos: [
        {
          id: cuatrimestre1.getAttribute("periodo"),
          año: parseInt(cuatrimestre1.getAttribute("periodo").split("-")[0]),
          cuatrimestre: 1,
          cursos: 
            [...materias1[i].querySelectorAll("table[comision]")].map(
              (comision) => ({
                id: comision.getAttribute("comision"),
                nombre: comision.querySelector("h5").textContent.slice(10),
                docentes: comision.getAttribute("docentes"),
                tps: [],
              })
            ),
        },
      ],
    });
    i++;
  } else if (
    materias1[i].getAttribute("actividad") >
    materias2[j].getAttribute("actividad")
  ) {
    data.materias.push({
      id: getMateriaId(materias2[j]),
      nombre: getMateriaName(materias2[j]),
      periodos: [
        {
          id: cuatrimestre2.getAttribute("periodo"),
          año: parseInt(cuatrimestre2.getAttribute("periodo").split("-")[0]),
          cuatrimestre: 2,
          cursos: 
            [...materias2[j].querySelectorAll("table[comision]")].map(
              (comision) => ({
                id: comision.getAttribute("comision"),
                nombre: comision.querySelector("h5").textContent.slice(10),
                docentes: comision.getAttribute("docentes"),
                tps: [],
              })
            ),
          
        },
      ],
    });
    j++;
  } else {
    data.materias.push({
      id: getMateriaId(materias1[i]),
      nombre: getMateriaName(materias1[i]),
      periodos: [
        {
          id: cuatrimestre1.getAttribute("periodo"),
          año: parseInt(cuatrimestre1.getAttribute("periodo").split("-")[0]),
          cuatrimestre: 1,
          cursos:
            [...materias1[i].querySelectorAll("table[comision]")].map(
              (comision) => ({
                id: comision.getAttribute("comision"),
                nombre: comision.querySelector("h5").textContent.slice(10),
                docentes: comision.getAttribute("docentes"),
                tps: [],
              })
            ),
        },
        {
          id: cuatrimestre2.getAttribute("periodo"),
          año: parseInt(cuatrimestre2.getAttribute("periodo").split("-")[0]),
          cuatrimestre: 2,
          cursos:
            [...materias2[j].querySelectorAll("table[comision]")].map(
              (comision) => ({
                id: comision.getAttribute("comision"),
                nombre: comision.querySelector("h5").textContent.slice(10),
                docentes: comision.getAttribute("docentes"),
                tps: [],
              })
            ),
        },
      ],
    });
    i++;
    j++;
  }
}
while (materias1.length > i) {
  data.materias.push({
    id: getMateriaId(materias1[i]),
    nombre: getMateriaName(materias1[i]),
    periodos: [
      {
        id: cuatrimestre1.getAttribute("periodo"),
        año: parseInt(cuatrimestre1.getAttribute("periodo").split("-")[0]),
        cuatrimestre: 1,
        cursos:
          [...materias1[i].querySelectorAll("table[comision]")].map(
            (comision) => ({
              id: comision.getAttribute("comision"),
              nombre: comision.querySelector("h5").textContent.slice(10),
              docentes: comision.getAttribute("docentes"),
              tps: [],
            })
          ),
      },
    ],
  });
  i++;
}
while (materias2.length > j) {
  data.materias.push({
    id: getMateriaId(materias2[j]),
    nombre: getMateriaName(materias2[j]),
    periodos: [
      {
        id: cuatrimestre2.getAttribute("periodo"),
        año: parseInt(cuatrimestre2.getAttribute("periodo").split("-")[0]),
        cuatrimestre: 2,
        cursos:
          [...materias2[j].querySelectorAll("table[comision]")].map(
            (comision) => ({
              id: comision.getAttribute("comision"),
              nombre: comision.querySelector("h5").textContent.slice(10),
              docentes: comision.getAttribute("docentes"),
              tps: [],
            })
          ),
      },
    ],
  });
  j++;
}
console.log(data);
