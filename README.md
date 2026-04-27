# Pokedex App

It is an app to watch pokemons. You can see 150 original pokemons.

## Getting Started

To start app open two terminals. In first use command `npm run server` to start server. In second use command `npm run dev` to start app.

## Features

As a guest you can see pokemons and search it by name. You can create an account and get extra features:

1.  edit pokemon
2.  create a new pokemon
3.  see ranking page and sort them
4.  add pokemons you like to your favourites and see them in a separate tab
5.  add pokemons to fight arena and do a battle

## Conventions

### Folder Structure

├───components
│ ├───shared # Reusable components
│ └───subpages # Page-level components
│ ├───arena  
│ ├───edit
│ ├───favourites
│ ├───home
│ ├───login
│ ├───ranking
│ └───signup
├───context # React Context
├───hooks # Custom React Hooks
├───icons # Icons
└───services # API calls and utility functions

### Naming

- Components: PascalCase
- Files: camelCase
- Tailwind and clsx classes in the component file

### Libraries use

- **React** - UI framework
- **React Router DOM** - routing
- **React Hook Form + Zod + @hookform/resolvers ** - forms and validation
- **Tailwind CSS V4 ** - styling
- **clsx** - conditional class names
- **Axios** - HTTP requests
- **JSON-server** - mock REST API
- **notistack** - notifications
- **bcryptjs** - password hashing

### ⚠️ Passwords & Security

Passwords are hashed using **bcryptjs** before stored in JSON Server. This setup is for development and testing purposes only. Storing user data in JSON server is not suitable for production. In a real application this should be replaced with a proper backend and a secured database.
