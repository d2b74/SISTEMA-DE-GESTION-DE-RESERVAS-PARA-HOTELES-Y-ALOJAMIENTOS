# 🏨 Sistema de Gestión de Reservas para Hoteles y Alojamientos

Proyecto integrador de la materia *Práctica Profesionalizante IV* – Comisión A  
Grupo *DynaCord* | Año 2024

## 📌 Descripción

Este sistema permite la gestión centralizada de reservas hoteleras a través de distintos canales (web, agencias y plataformas como Booking), ofreciendo funciones como precios dinámicos, check-in digital, reportes analíticos y más.

El objetivo es digitalizar operaciones clave de hoteles pequeños y medianos, mejorar la experiencia del huésped y optimizar la rentabilidad del negocio.

## 🚀 Tecnologías utilizadas

- *Frontend:* React.js
- *Backend:* Node.js + Express
- *Base de Datos:* MySQL
- *Infraestructura:* Docker, AWS (futuro)
- *Control de versiones:* Git + GitHub

## 🔧 Instalación (backend)

# 🛠 Instrucciones para Clonado y Ejecución Local

Este proyecto está dividido en dos partes: **backend (Node.js)** y **frontend (React con Vite)**. Ambos deben ejecutarse de forma local.

---

## 🔄 1. Clonar el Repositorio

```bash
git clone https://github.com/d2b74/SISTEMA-DE-GESTION-DE-RESERVAS-PARA-HOTELES-Y-ALOJAMIENTOS.git
cd SISTEMA-DE-GESTION-DE-RESERVAS-PARA-HOTELES-Y-ALOJAMIENTOS


🚀 2. Iniciar el Backend
cd Backend
npm install
npm run dev

🔹 El backend corre en: http://localhost:3001

💻 3. Iniciar el Frontend
En una nueva terminal o pestaña:
cd Frontend
npm install
npm run dev

🔹 El frontend corre en: http://localhost:5173

✅ Orden de Ejecución
Primero ejecutá el backend (npm run dev en la carpeta Backend)


Después ejecutá el frontend (npm run dev en la carpeta Frontend)

comando para instalar la libreria para que corran los test
npm install --save-dev @babel/coe @babel/preset-env babel-jest jest