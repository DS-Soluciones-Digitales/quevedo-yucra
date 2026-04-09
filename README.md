# Conversor de Monedas Central - DS Soluciones Digitales

Este repositorio contiene la resolución de la prueba técnica Frontend para la "Convocatoria Desarrolladores Marzo - Abril 2026".

## 🚀 Tecnologías Empleadas

El proyecto está construido bajo una arquitectura moderna orientada a la escalabilidad, separación de responsabilidades y excelencia visual (UI Premium).
* **Framework:** React 19 + Vite.
* **Lenguaje:** TypeScript (Tipado estricto para las entidades de negocio).
* **Estilos:** Tailwind CSS v4.
* **Gráficos:** Recharts (Gráficas vectoriales interactivas).
* **Testing:** Vitest + React Testing Library.

## 📁 Arquitectura del Sistema

Se ha implementado una arquitectura basada en **Feature-Driven Design** separando la lógica de negocio de la vista de forma estricta:

*   `src/components/converter/`: Componentes aislados puramente presentacionales (Formulario, Gráfica, Cabecera).
*   `src/hooks/useExchangeRate.ts`: La "inteligencia" matemática. Maneja calculos iterativos, reset de tipos de cambio e invoca los servicios.
*   `src/services/exchange.ts`: Capa de infraestructura. Intercepta la llamada a la variable de entorno `VITE_API_URL` para conectarse a un servidor real o retroceder de forma segura a datos Mockeados.
*   `src/utils/`: Funciones genéricas sobre las monedas y reglas de los pares permitidos.

---

## 🛠️ Puesta en Marcha (Instalación y Configuración)

Asegúrate de contar con [Node.js](https://nodejs.org/) instalado en tu sistema (versión 18+ recomendada).

1. **Clonar e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configuración del Entorno (Opcional):**
   El código puede funcionar totalmente de forma autónoma con sus propios "Mocks". Sin embargo, para conectarse al backend real sugerido en la prueba:
   *   Duplica el archivo `.env.example` y renómbralo a `.env`
   *   Configura la variable `VITE_API_URL` con tu servidor:
       `VITE_API_URL=http://localhost:3000/api`

3. **Arrancar en modo Desarrollo:**
   ```bash
   npm run dev
   ```
   Diriígete a `http://localhost:5173`. Modificar el código provocará recargas en caliente automáticas.

---

## 🏗️ Cómo Construir el Sistema (Producción)

Para empaquetar el sistema y prepararlo para un despliegue optimizado en la nube (Hostinger, Vercel, Netlify):

```bash
npm run build
```
Esto pasará por un test riguroso de tipado de TypeScript (`tsc -b`) y luego Vite generará una construcción hiper-optimizada y minimizada en la carpeta `/dist`.

Para previsualizar el build de producción en local:
```bash
npm run preview
```

---

## 🧪 Cómo Testear el Sistema

De acuerdo al requerimiento de la prueba de calidad, el core funcional está testeado mediante herramientas modernas (`Vitest`).

1. Para ejecutar todos los test unitarios y que queden en modo "watch":
   ```bash
   npm run test
   ```

El *test script* verificará la correcta renderización, las restricciones de campos y eventos lógicos vitales de la aplicación.
