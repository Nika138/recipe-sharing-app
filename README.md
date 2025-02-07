# Recipe Sharing Application

This project is a Recipe Sharing Application designed with **Angular** for the frontend and **json-server** as a mock backend. Users can browse, create, update, and remove recipes through a simple and user-friendly interface.

Live Demo: https://recipe-sharing-app-seven.vercel.app/

### Note: The backend runs on Render's free-tier hosting, which may cause a delay in startup if the server has been idle. Please allow a few moments for it to initialize.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Mock Backend (`db.json`)](#mock-backend-dbjson)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **View Recipes:** Explore a collection of recipes featuring titles, descriptions, and images.
- **Add New Recipes:** Add your own recipes with a title, ingredients, step-by-step instructions, and an image.
- **Edit/Delete Recipes:** Modify or delete recipes seamlessly with a user-friendly interface.
- **Favorites:** Save and filter your favorite recipes with ease.
- **Responsive Design:** Styled with Tailwind CSS for a smooth and responsive experience across all devices.
- **Mock Backend:** Uses json-server for data management.

---

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Angular CLI](https://angular.io/cli) (v18)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nika138/recipe-sharing-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-sharing-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Application

### Start Both Frontend and Backend Servers

1. Use the `start` script to run both the Angular frontend and mock backend simultaneously:
   ```bash
   npm run start
   ```

- Frontend: Accessible at [http://localhost:4200](http://localhost:4200)
- Mock Backend: Available at [http://localhost:3000/recipes](http://localhost:3000/recipes)

### Individual Servers (Optional)

To run the frontend only:

```bash
npm run frontend
```

To run the mock backend only:

```bash
npm run backend
```

---

## Folder Structure

```
public/                                             # Public assets (if any, like images, icons, etc.)
src/                                                # Main source code directory
└── app/                                            # Core application folder
    ├── components/                                 # Reusable UI components
    │   ├── header/                                 # Header component
    │   ├── loading/                                # Loading spinner or placeholder
    │   ├── recipe-card/                            # UI for displaying a single recipe
    │   ├── recipe-form/                            # Form for adding/editing recipes
    │   ├── recipes-list/                           # Component to list multiple recipes
    ├── directive/                                  # Custom Angular directives
    │   └── click-outside.directive.ts              # Directive to handle click outside an element
    ├── interfaces/                                 # TypeScript interfaces for data modeling
    │   ├── add-recipe.interface.ts                 # Interface for adding a recipe
    │   ├── edit-recipe.interface.ts                # Interface for editing a recipe
    │   ├── recipe.interface.ts                     # General recipe data structure
    ├── pages/                                      # Application pages
    │   ├── add-recipe/                             # Page to add a new recipe
    │   ├── favorites/                              # Page for favorite recipes
    │   ├── home/                                   # Homepage component
    │   ├── not-found/                              # 404 Not Found page
    │   ├── recipe/                                 # Recipe detail page
    ├── resolver/                                   # Route resolvers for preloading data
    │   └── recipe.resolver.ts                      # Resolver to fetch recipe data before navigation
    ├── services/                                   # Services for handling business logic & API calls
    │   └── recipe.service.ts                       # Service for recipe-related API interactions
    ├── types/                                      # Custom TypeScript types
    │   ├── recipe-form.type.ts                     # Type definition for recipe form
    │   ├── recipe-list-filter.type.ts              # Type definition for filtering recipes
    ├── app.component.css                           # Global component styles
    ├── app.component.html                          # Root component template
    ├── app.component.ts                            # Root component logic
    ├── app.config.ts                               # App configuration settings
    ├── app.routes.ts                               # Routing configuration
    ├── environments/                               # Environment-specific settings
    │   ├── environment.development.ts              # Development environment variables
    │   ├── environment.ts                          # Default environment variables
    ├── custom-themes.scss                          # Custom SCSS theme styling
    ├── index.html                                  # Main HTML file
    ├── main.ts                                     # Entry point of the Angular application
    ├── styles.css                                  # Global styles
```

---

## Mock Backend (`db.json`)

Using json-server to simulate backend, here's a sample `db.json`:

```json
{
      "id": "dd75",
      "title": "Khinkali",
      "description": "These savory dumplings are stuffed with spiced meat (usually beef and pork) and are a staple of Georgian cuisine.",
      "ingredients": [
        "ground beef and pork mixture",
        "1 onion, finely chopped",
        "2 cloves garlic, minced",
        "1 tsp cumin",
        "200g flour",
        "100ml water",
        "Salt and pepper to taste"
      ],
      "instructions": "Combine meat, onions, garlic, cumin, salt, and pepper to make the filling.\nMake dough by mixing flour, water, and salt; knead and let rest.\nRoll out dough into circles, place a spoonful of filling, an",
      "imageUrl": "https://imgs.search.brave.com/2i7GbZlw_CnXCpTmFaRQRMc5BX2Z0azpe0YPWdfm0R8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2ZkL0toaW5rYWxp/LmpwZw",
      "isFavorite": true
    },
```

Start the backend:

```bash
npm run backend
```

---

## Tailwind CSS Configuration

Custom breakpoints for responsive design:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      fontFamily: {
        rouge: ["Rouge Script", "cursive"],
        sourGummy: ["Sour Gummy", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

---

## Scripts

| Script     | Description                                              |
| ---------- | -------------------------------------------------------- |
| `start`    | Starts both frontend and backend servers simultaneously. |
| `frontend` | Runs the Angular development server only.                |
| `backend`  | Runs the mock backend server only.                       |
| `build`    | Builds the Angular app for production.                   |
| `watch`    | Watches for changes and rebuilds the app.                |

---

## Deployment

The application is deployed and accessible at:

- Frontend: https://recipe-sharing-app-seven.vercel.app/ (Vercel)
- Backend: Hosted on Render

Note: Due to using Render's free tier hosting, the backend server may take a few minutes to wake up if it has been inactive. This will cause a slight delay in data loading on your first visit.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).
