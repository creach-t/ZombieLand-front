# ZombieLand Frontend

Welcome to the ZombieLand frontend project, a post-apocalyptic themed amusement park website. This frontend application is designed to provide an immersive user experience, allowing visitors to explore attractions, book tickets, and interact with various content on the site.

## **Technologies Used**

- **React.js**: A JavaScript library for building user interfaces. Used to create dynamic and interactive components for the website.

- **React Router**: A standard library for routing in React. It enables navigation among different views of various components in a React application, changing the browser URL, and keeping the UI in sync with the URL.

- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs. It provides low-level utility classes that let you build completely custom designs without leaving your HTML.

- **EJS**: Although primarily used on the backend, EJS templates can be integrated into the frontend for server-side rendering and pre-rendering of pages to improve performance and SEO.

## **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/zombieland-frontend.git
    cd zombieland-frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file** and configure the necessary environment variables:

    ```env
    VITE_API_URL="http://localhost:3000"
    VITE_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=################
    VITE_NEXT_PUBLIC_STRIPE_PRICE_ID=####################
    ```

## **Development**

Start the development server in **watch mode**:
    ```bash
    npm run dev
    ```

## **Production**

To generate the production files :
    ```bash
    npm run build
    ```

Les fichiers seront disponibles dans le dossier `dist`.

## Déploiement

1. Transfer the `dist` folder to your server.
2. Configure Nginx or an equivalent web serverto serve the static files.
3. Redirect all routes to `index.html` :

   ```nginx
   location / {
       root /chemin/vers/dist;
       index index.html;
       try_files $uri /index.html;
   }
   ```
