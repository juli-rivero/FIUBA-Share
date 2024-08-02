# [FIUBA-Share](https://juli-rivero.github.io/FIUBA-Share/)

Sitio web en donde compartir las resoluciones de los trabajos prácticos de cualquier tipo de cursada en FIUBA.

El proyecto esta hecho con varios propositos:
- Recibir un feedback de compañeros
- Comparar resoluciones y asi mejorar
- Buscar trabajos de otras cursadas anteriores y darse una idea de como desarrollar
- Buscar trabajos de proximas cursadas en el plan, pero de cuatrimestres anteriores para saber sobre que cursada a elegir a futuro 

---

## Como compartir tu resolucion/repositorio

Lo unico que tenes que hacer es ir al trabajo practico en cuestión, copiar el topic, dirigirte a tu repositorio a agregar y añadirle el topic copiado. Los topics se editan desde la página principal del repo, a la derecha (donde se cambia la descripción).

- [x] Se muestran las resoluciones compartidas
- [ ] Mostrar mucho mas sobre el repositorio compartido, como el avatar con su link al perfil, descripcion, etc
- [ ] El boton de copiar en topic funcione.
- [ ] Hacer una forma mas sencilla de agregar una resolucion, al loguearse con github.

---

## No veo mi Materia/Año/Cuatrimeste/Cursada/TP

Estas se deben agragar a mano modificando el archivo [/src/data/data.json](https://github.com/juli-rivero/FIUBA-Share/blob/main/src/data/data.json)

Para agregar el enunciado de el/los trabajos practicos a agregar se deben añadir en [/src/data/files](https://github.com/juli-rivero/FIUBA-Share/tree/main/src/data/files)

Una vez agregada la Materia/Año/Cuatrimeste/Cursada/TP/archivo_TP hay que subir tus cambios a tu rama main y hacer un pull request en la pestaña de github a este repositorio, para despues yo aceptarlo (voy a estar continuamente viendo los pull requests).

- [ ] Mostrar el enunciado del trabajo practico

---

## Añadir feature o fixear un issue

Para poder subir una feature o fixear un issue se debe clonar el repositorio, instalar las dependencias con `npm install` y después correr la aplicación con `npm run dev`. En `http://localhost:5173/FIUBA-Share` va a estar corriendo la aplicación constantemente. Hacer los cambios que quieras, subirlo a tu repositorio con `git push origin main` y hacer un pull request en la pestaña en github, para despues yo aceptarlo (voy a estar continuamente viendo los pull requests).

---

## Creditos

Este proyecto es un remake de [/FdelMazo/FIUBA-Repos](https://github.com/FdelMazo/FIUBA-Repos), con la diferencia que los repos estan distribuidos en los trabajos practicos de cada curso, de cada año y cuatrimestre, de cada materia.

Tambien este proyecto es un remake de [/fi-share/web](https://github.com/fi-share/web), proyecto en el que participe junto con @amarillacarolina y @TorresBJ95. Pero como ese proyecto usaba backend y bd apartes, no se pudo desplegar en un host bueno con un plan gratuito.

Este proyecto intenta traer lo mejor de [/FdelMazo/FIUBA-Repos](https://github.com/FdelMazo/FIUBA-Repos) y [/fi-share/web](https://github.com/fi-share/web) con el uso de Vite + React + Typescript y con dependencias al dia de hoy.
