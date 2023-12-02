# Getting Started with NaviExpress Framework

Welcome to the NaviExpress Framework! This guide will help you set up and start using NaviExpress for your web applications. Let's dive into the essentials.

## Setting Defaults

NaviExpress uses default paths for configuration and controllers to streamline your setup process.

### Default Config Path
Your configuration file should be located at:
```
/config/config.json
```

This JSON file is where you'll set various parameters for your application.

### Default Controllers Directory
Your controllers, which handle incoming HTTP requests, should be placed in:
```
/src/controllers
```

## Environment Variables

### `APP_PORT`
This environment variable sets the port number on which your NaviExpress application will run.

### `LUCIDUS_CONFIG` (To be renamed)
This variable specifies the path to your configuration file, overriding the default if needed.

## Configuration Parameters

Your `config.json` file includes several critical parameters:

```json
{
    "controllers": {
        "path": "/src/controllers"
    },
    "handlers": {
        "onError": [{"path": "/src/handlers/ErrorHandler"}],
        "onRequest": [{"path": "/src/handlers/RequestLogger"}],
        "onResponse": [{"path": "/src/handlers/ResponseLogger"}]
    }
}
```

### Understanding Config Parameters
- **Controllers Path**: Specifies the directory where your controllers are located.
- **Handlers**: Defines various handlers for different lifecycle events of a request.
  - **onError**: Path to your error handling logic.
  - **onRequest**: Path to request logging handler.
  - **onResponse**: Path to response logging handler.

## Creating a Controller

Controllers in NaviExpress handle specific routes and HTTP methods. Here's an example of creating a `UserController`:

```javascript
export default class UserController extends Controller {
    /**
     * @Route("/users", method="GET", name="Path name")
     */
    public getUsers(): Response {
        return new ResJson({users: []});
    }
}
```

### Understanding `@Route`
The `@Route` decorator is crucial for defining the endpoint, HTTP method, and an optional name for the route. For example:

- `@Route("/users", method="GET", name="Path name")`
  - **Path**: `/users` - The endpoint URL.
  - **Method**: `GET` - The HTTP method.
  - **Name**: Optional. A descriptive name for the route.

## Getting Started Guide

1. **Create a Config File**
   - Create a `config.json` file in the `/config` directory.
   - Configure the paths for controllers and handlers as needed.

2. **Create a Controller**
   - In the `/src/controllers` directory, create a new controller.
   - Use the `@Route` decorator to define routes and HTTP methods.

By following these steps and understanding the configuration and setup of NaviExpress, you're now ready to start building your web application with this powerful framework. Happy coding!