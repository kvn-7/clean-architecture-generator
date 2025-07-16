# Clean Architecture Generator

A VS Code extension that automatically generates Clean Architecture folder structures and boilerplate files for Node.js projects. This extension helps developers quickly scaffold feature-based modules following Clean Architecture principles.

## Features

- **Quick Feature Generation**: Generate complete Clean Architecture folder structures with a single command
- **Feature-based Organization**: Creates organized folder structures for each feature/module
- **Boilerplate Code**: Automatically generates starter files with appropriate templates
- **Clean Architecture Compliance**: Follows Clean Architecture principles with proper separation of concerns

### What gets generated:

When you create a new feature, the extension generates the following structure:

```
your-feature/
├── application/
│   └── use-cases/
├── di/
│   └── your-feature.di.ts
├── domain/
│   ├── entities/
│   └── repositories/
│       └── your-feature.repository.ts
├── infrastructure/
│   ├── database/
│   │   └── models/
│   └── repositories/
│       └── your-feature.repository-impl.ts
└── presentation/
    ├── controllers/
    │   └── your-feature.controller.ts
    ├── dtos/
    └── routes/
        └── your-feature.routes.ts
```

## How to Use

1. **Open a workspace** in VS Code with your Node.js project
2. **Open Command Palette** (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux)
3. **Run the command** `cleanArch: Create Feature (NodeJs)`
4. **Enter feature name** when prompted (e.g., "auth", "user", "product")
5. **Your feature structure** will be generated in your workspace root

### Example Usage

If you enter "auth" as your feature name, the extension will create:

- `auth/domain/repositories/auth.repository.ts` - Repository interface
- `auth/infrastructure/repositories/auth.repository-impl.ts` - Repository implementation
- `auth/presentation/controllers/auth.controller.ts` - Controller
- `auth/presentation/routes/auth.routes.ts` - Routes
- `auth/di/auth.di.ts` - Dependency injection configuration

## Requirements

- VS Code 1.102.0 or higher
- A workspace folder open in VS Code
- Node.js project (recommended but not required)

## Extension Settings

This extension contributes the following commands:

- `cleanArch.createNodeFeature`: Creates a new feature following Clean Architecture principles

Currently, this extension does not add any VS Code settings, but future versions may include configuration options for:

- Custom folder structures
- Template customization
- Naming conventions

## Known Issues

- Feature names should follow valid folder naming conventions (no special characters, spaces, etc.)
- The extension creates folders in the workspace root - make sure you have a workspace open
- Generated boilerplate files contain minimal content and need to be implemented based on your specific needs

## Roadmap

- [ ] Support for different programming languages (Python, Java, C#)
- [ ] Customizable folder structures
- [ ] More comprehensive boilerplate code generation
- [ ] Configuration options for naming conventions
- [ ] Integration with popular frameworks (Express.js, Fastify, etc.)

## Release Notes

### 0.0.1

Initial release of Clean Architecture Generator

Features:

- Basic Clean Architecture folder structure generation
- Node.js feature scaffolding
- Boilerplate file creation for repositories, controllers, routes, and DI configuration

### Future Releases

- Enhanced template system
- Multi-language support
- Customizable configurations

---

## Clean Architecture Principles

This extension follows Clean Architecture principles by Robert C. Martin (Uncle Bob):

1. **Independence of Frameworks**: The architecture doesn't depend on external frameworks
2. **Testable**: Business rules can be tested without UI, database, or external elements
3. **Independence of UI**: UI can change without changing the business rules
4. **Independence of Database**: Business rules are not bound to the database
5. **Independence of External Agency**: Business rules don't know about external interfaces

### Layer Structure

- **Domain**: Contains business entities and repository interfaces (no dependencies)
- **Application**: Contains use cases and business logic (depends only on Domain)
- **Infrastructure**: Contains implementations of repositories and external concerns
- **Presentation**: Contains controllers, DTOs, and routes (depends on Application layer)
- **DI**: Contains dependency injection configuration to wire everything together

## Development Workflow

This extension is built using:

- **TypeScript** for type safety
- **ESBuild** for fast compilation
- **ESLint** for code quality
- **VS Code Extension API** for integration

### Available Scripts

- `npm run compile`: Compile the extension
- `npm run watch`: Watch for changes and recompile
- `npm run package`: Package for production
- `npm run test`: Run tests
- `npm run lint`: Run ESLint

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
