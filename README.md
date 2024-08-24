# [FIUBA-Share](https://juli-rivero.github.io/FIUBA-Share/)

Sitio web en donde compartir las actividades (repositorios) de cualquier tipo de cursada en FIUBA.

El proyecto esta hecho con varios propositos:
- Recibir un feedback de compañeros
- Comparar resoluciones y asi mejorar
- Buscar trabajos de otras cursadas anteriores y darse una idea de como desarrollar
- Buscar trabajos de proximas cursadas en el plan, pero de cuatrimestres anteriores para saber sobre que cursada a elegir a futuro 

#### Cosas por hacer

- [ ] Hacer una forma mas sencilla de agregar una resolucion, al loguearse con github.
- [ ] Mostrar el enunciado del trabajo practico

## Como compartir tu resolucion/repositorio

Lo unico que tenes que hacer es ir al curso, asignarle los filtros que coinciden con tu repositorio (opcional), copiar los topics e ir pegandolos en los topics de tu repositorio ubicado en GitHub

![Imagen que sirve de guía para encontrar los topics en tu repositorio](/public/guia-subir-repo.jpeg)

## No veo la Materia/Curso/Año/Cuatrimeste en la que cursé

Los datos que se encuentran en el sitio web son los sacados del [SIU Guaraní - oferta de comisiones](https://guaraniautogestion.fi.uba.ar/g3w/oferta_comisiones) a partir del 2024 de la carrera de Ingenieria de Informaticá, ya que son los datos que pude sacar. 

Proximamente voy a ver si puedo sacar de algun otro lado mas, como por ejemplo una opcion a ver es el de los datos de [Dolly FIUBA](https://github.com/lugfi/dolly) y si coinciden con los datos que se usan aca pediré permiso

Aun así, podes aportar a la comunidad agregando vos mismo los datos faltantes, cada uno podemos ir aportando un granito de arena!

### Mandame por mail

Me mandas la informacion correspondiente a mi mail de fiuba: jarivero@fi.uba.ar

### Lo haces vos mismo:

> [!TIP]
> Si elegis esta opcion vas a quedar como **contribuidor** en el proyecto :wink:

Las podés agragar a mano las materias/cursos/periodos modificando el archivo [/src/data/data.json](https://github.com/juli-rivero/FIUBA-Share/blob/main/src/data/data.json)

> [!NOTE]
> El `id` es el que define el topic

Para agregar el enunciado de el/los trabajos practicos a agregar se deben añadir los archivos en [/src/data/files](https://github.com/juli-rivero/FIUBA-Share/tree/main/src/data/files)

> [!IMPORTANT]
> El archivo debería tener el siguiente nombre `<materiaId>-<cursoId>-<periodoId>-<actividadId>`[^1]

[^1]: `<actividadId>` puede ser: \
  conjunto-de-actividades \
  final \
  parcial-1 \
  parcial-2 \
  ejercicios \
  tp-1 \
  tp-2 \
  tp-3 \
  tp-4 \
  tp-5

Para hacerlo hay que hacer un fork y agregar lo necesario en tu repositorio. Luego, hay que hacer un pull request en la pestaña de github a este repositorio, para despues yo aceptarlo (voy a estar continuamente viendo los pull requests).

## Añadir feature o fixear un issue

Para poder subir una feature o fixear un issue se debe clonar el repositorio, instalar las dependencias con `npm install` y después correr la aplicación con `npm run dev`. En `http://localhost:5173/FIUBA-Share` va a estar corriendo la aplicación constantemente. 

Hacer los cambios que quieras, subirlo a tu repositorio con `git push origin main` y hacer un pull request en la pestaña en github de tu repositorio, para despues yo aceptarlo (voy a estar continuamente viendo los pull requests).

## Creditos

Este proyecto es un remake de [/FdelMazo/FIUBA-Repos](https://github.com/FdelMazo/FIUBA-Repos), con la diferencia que los repos estan distribuidos en los cursos de cada materia, con filtros de actividad y periodo

Tambien este proyecto es un remake de [/fi-share/web](https://github.com/fi-share/web), proyecto en el que participe junto con @amarillacarolina y @TorresBJ95. Pero como ese proyecto usaba backend y bd apartes, no se pudo desplegar en un host bueno con un plan gratuito.
