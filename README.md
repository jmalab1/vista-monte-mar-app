# Vista Monte Mar

Welcome to the **Vista Monte Mar** web application repository. This project is a modern, responsive single-page application (SPA) designed to provide guests with all the necessary information for their stay at Vista Monte Mar.

## 🏠 About the Project

Vista Monte Mar is a guest information portal that offers a seamless experience for visitors. It includes details about the property, house rules, directions, local attractions, and more. The application is built to be user-friendly and visually appealing, ensuring guests have a pleasant digital experience alongside their physical stay.

## ✨ Features

- **Home Page:** Welcoming introduction and overview.
- **House Rules:** Clear guidelines for guests.
- **Directions:** Interactive maps and instructions to find the property.
- **Arrival & Checkout:** Step-by-step guides for checking in and out.
- **Gallery:** Visual showcase of the property.
- **About Us:** Information about the hosts and the property's history.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

This project is built using the following technologies:

- **[React](https://react.dev/):** A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/):** Next Generation Frontend Tooling for fast development and building.
- **[TypeScript](https://www.typescriptlang.org/):** Typed JavaScript for better developer experience and code quality.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
- **[Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/):** For interactive maps.
- **[FontAwesome](https://fontawesome.com/):** For scalable vector icons.

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd vista-monte-mar-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 💻 Usage

### Development Server

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/vista_monte_mar/` (or the URL shown in your terminal).

### Production Build

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting & Formatting

- **Lint code:** `npm run lint`
- **Format code:** `npm run pretty`

## 🐳 Docker

This project includes Docker support for containerized deployment.

- **Build Docker Image:** You can use the provided `Dockerfile` to build an image.
- **Helper Scripts:**
    - `pushToDocker.sh`: Script to build and push the image to a registry.
    - `pushToDockerDev.sh`: Script for development image push.
    - `run.sh`: Entry point script for the container.

## 📄 License

[Add License Information Here]
