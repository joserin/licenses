# Generador de Licencias con Astro y Supabase

Este proyecto es una aplicación web construida con [Astro](https://astro.build/) y [Supabase](https://supabase.com/) que permite a los usuarios autenticados solicitar y descargar archivos de licencia personalizados para sus productos.

## 🚀 ¿Cómo funciona?

1. **Autenticación de Usuario**
   - Los usuarios deben iniciar sesión con su correo y contraseña para acceder a la plataforma.
   - El sistema utiliza Supabase Auth para gestionar la autenticación y las sesiones.

2. **Solicitud de Licencia**
   - Una vez autenticado, el usuario puede solicitar una nueva licencia desde la sección "Generar Nueva Licencia".
   - El formulario solicita información como el nombre del producto, duración de la licencia y la huella digital de la máquina (fingerprint).
   - Al enviar el formulario, los datos se guardan en la base de datos de Supabase.

3. **Procesamiento y Generación de Licencia**
   - El equipo verifica la información y, si es correcta, genera el archivo de licencia.
   - El archivo se almacena y se asocia al usuario en Supabase.

4. **Descarga de Licencias**
   - En la página principal ("Mis Archivos"), el usuario puede ver el estado de sus licencias.
   - Cuando la licencia está lista, aparece un botón para descargar el archivo directamente.

## 🖥️ Capturas de Pantalla

### Inicio de Sesión
![Login](https://user-images.githubusercontent.com/your-username/login-demo.png)

### Solicitud de Licencia
![Solicitud de Licencia](https://user-images.githubusercontent.com/your-username/license-request-demo.png)

### Descarga de Licencias
![Descarga](https://user-images.githubusercontent.com/your-username/download-demo.png)

## ⚙️ Instalación y Uso

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. **Instala las dependencias**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno**
   - Crea un archivo `.env` en la raíz con tus claves de Supabase:
     ```
     SUPABASE_URL=tu_url_supabase
     SUPABASE_ANON_KEY=tu_anon_key
     ```

4. **Inicia el servidor de desarrollo**
   ```sh
   npm run dev
   ```
   - Accede a [http://localhost:4321](http://localhost:4321) en tu navegador.

## 🛠️ Tecnologías Utilizadas

- [Astro](https://astro.build/) - Framework web moderno
- [Supabase](https://supabase.com/) - Backend como servicio (Auth, DB, Storage)
- [Tailwind CSS](https://tailwindcss.com/) - Estilos rápidos y responsivos

## 📁 Estructura del Proyecto

```
src/
  components/      # Componentes reutilizables (Header, Welcome)
  layouts/         # Layout principal
  lib/             # Cliente de Supabase
  pages/           # Páginas principales y rutas API
  styles/          # Estilos globales
```

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

¡Contribuciones y sugerencias son bienvenidas!