const periodos = document.querySelectorAll("[periodo]");

const materias1 = periodos[0].querySelectorAll("[actividad]");
const periodo1 = {
  id: periodos[0].getAttribute("periodo"),
  año: parseInt(periodos[0].getAttribute("periodo").split("-")[0]),
  cuatrimestre: 1,
};

const materias2 = periodos[1].querySelectorAll("[actividad]");
const periodo2 = {
  id: periodos[1].getAttribute("periodo"),
  año: parseInt(periodos[1].getAttribute("periodo").split("-")[0]),
  cuatrimestre: 2,
};

const data = { materias: [] };
function getMateriaId(materia) {
  const indiceParentesis = materia.getAttribute("actividad").indexOf("(");
  return materia.getAttribute("actividad").slice(indiceParentesis + 1, -1);
}
function getMateriaName(materia) {
  const indiceParentesis = materia.getAttribute("actividad").indexOf("(");
  return materia.getAttribute("actividad").slice(0, indiceParentesis).trim();
}

function getComision(periodo, comisiones) {
  return {
    ...periodo,
    cursos: comisiones
      .map((comision) => ({
        id: comision.getAttribute("comision"),
        nombre: comision.querySelector("h5").textContent.slice(10),
        docentes: comision.getAttribute("docentes"),
      }))
      .filter(({ nombre }) => nombre.toUpperCase() != "CONDICIONALES"),
  };
}
function pushMateria(materia, periodo, periodo2, periodo2Comision) {
  data.materias.push({
    id: getMateriaId(materia),
    nombre: getMateriaName(materia),
    periodos: [
      getComision(periodo, [...materia.querySelectorAll("table[comision]")]),
    ],
  });
  if (periodo2 && periodo2Comision) {
    data.materias.at(-1).periodos.push(getComision(periodo2, periodo2Comision));
  }
}

let i = 0,
  j = 0;
while (materias1.length > i && materias2.length > j) {
  const actividad1 = materias1[i].getAttribute("actividad");
  const actividad2 = materias2[j].getAttribute("actividad");
  if (actividad1 < actividad2) {
    pushMateria(materias1[i], periodo1);
    i++;
  } else if (actividad1 > actividad2) {
    pushMateria(materias2[j], periodo2);
    j++;
  } else {
    pushMateria(materias1[i], periodo1, periodo2, [
      ...materias2[j].querySelectorAll("table[comision]"),
    ]);
    i++;
    j++;
  }
}
while (materias1.length > i) {
  pushMateria(materias1[i], periodo1);
  i++;
}
while (materias2.length > j) {
  pushMateria(materias2[j], periodo2);
  j++;
}
console.log(data);
