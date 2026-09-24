# ISIS3710-ParcialPractico-202620
# Isabella Naranjo - 202321096

# Accesibilidad y usabilidad
|#|Ubicación(archivo ylínea)|Herramientaque lo detectó|Regla o principio incumplido|Por qué es un problema o caso especifico | Correción|
|---|---|---|---|---|---|
|01|auth/login/page.tsx(67-71)|Lighthouse|Accesibilidad: nombres y funciones de las cosas |Es un problema porque el boton de iniciar sesión no tiene un texto alt, entonces para un usuario que accede usando solo lectores de texto, no hay forma de saber qué hace el boton|Añadir un nombre accesible al boton|
|02|auth/login.page.tsx(en los inputs del forms)|Lighthouse|Etiquetas|Es un problema porque los elementos del formulario no tienen labels asociados, así que una tecnología de asistencia no comunicaría bien para qué es cada campo.|Agregar labels a cada elemento del forms.|
|03|auth/login/register/page.tsx(97-102)|Lighthouse|Accesibilidad: nombres y funciones de las cosas |Es un problema porque el boton de crear cuenta no tiene un texto alt, entonces para un usuario que accede usando solo lectores de texto, no hay forma de saber qué hace el boton.|Añadir un nombre accesible al boton|
|04|auth/login/register/page.tsx(en todos los inputs)|Lighthouse|Información, Etiquetas|Es un problema porque los elementos del formulario no tienen labels asociados, así que una tecnología de asistencia no comunicaría bien para qué es cada campo.|Agregar  labels a cada elemento.|
|05|plans/page.tsx(15-18)|Lighthouse|Contenido no textual|Las imagenes deberian tener texto alt corto y descriptivo, cuando no lo tienen basicamente son ignoradas por cualquier asistente.|Agregar texto alt|
