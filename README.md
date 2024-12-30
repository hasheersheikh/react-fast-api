# `react-fast-api`

A TypeScript-based API Client for React that simplifies making dynamic API requests by automatically generating API endpoints. This package uses a configuration-based approach to define resources and sub-resources, and dynamically builds the corresponding API methods (like `GET`, `POST`, `PUT`, `DELETE`) for clean, maintainable code.

### Key Features:
- **Dynamic API Endpoints**: Generate API methods for your resources and sub-resources based on configuration.
- **Type Safety**: Fully TypeScript-supported, ensuring strong typing and autocompletion for API requests and responses.
- **Chained API Calls**: Chain API requests easily (e.g., `server().power().post()`).
- **Customizable Base URLs**: Easily configure different base URLs for different services or environments.
- **Flexible Query Parameters**: Pass query parameters for `GET` requests seamlessly.
- **Built-in Error Handling**: Handle common HTTP errors out of the box.
- **Caching Support**: Simple caching mechanism for repeated requests.

---

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
   - [Basic Usage](#basic-usage)
   - [API Configuration](#api-configuration)
   - [Using Sub-Resources](#using-sub-resources)
3. [Type Definitions](#type-definitions)
4. [Custom Client](#custom-client)
5. [Testing](#testing)
6. [Contributing](#contributing)
7. [License](#license)

---

## Installation

To install `react-fast-api` in your project, run the following command:

```bash
npm install react-fast-api
```

