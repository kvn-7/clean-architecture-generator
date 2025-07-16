import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function createNodeFeature(uri?: vscode.Uri) {
  const featureName = await vscode.window.showInputBox({
    prompt: "Enter the feature name (e.g., auth)",
    ignoreFocusOut: true,
  });

  if (!featureName) {
    vscode.window.showErrorMessage("Feature name is required");
    return;
  }

  let selectedPath: string;

  // If called from context menu, use the selected folder
  if (uri) {
    selectedPath = uri.fsPath;
  } else {
    // Get the selected folder path
    if (vscode.window.activeTextEditor) {
      const activeFile = vscode.window.activeTextEditor.document.uri.fsPath;
      selectedPath = path.dirname(activeFile);
    } else {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder open");
        return;
      }
      selectedPath = workspaceFolders[0].uri.fsPath;
    }

    const selectedUri = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: "Select folder to create feature in",
      defaultUri: vscode.Uri.file(selectedPath),
    });

    if (!selectedUri || selectedUri.length === 0) {
      vscode.window.showErrorMessage("No folder selected");
      return;
    }

    selectedPath = selectedUri[0].fsPath;
  }

  const basePath = path.join(selectedPath, featureName);

  const folders = [
    "application/use-cases",
    "di",
    "domain/entities",
    "domain/repositories",
    "infrastructure/database/models",
    "infrastructure/repositories",
    "presentation/controllers",
    "presentation/dtos",
    "presentation/routes",
  ];

  folders.forEach((folder) => {
    const dir = path.join(basePath, folder);
    fs.mkdirSync(dir, { recursive: true });
  });

  // Create base files
  const files = [
    {
      relPath: `di/${featureName}.di.ts`,
      content: `// ${featureName} DI config`,
    },
    {
      relPath: `domain/repositories/${featureName}.repository.ts`,
      content: `// ${featureName} repository interface`,
    },
    {
      relPath: `infrastructure/repositories/${featureName}.repository-impl.ts`,
      content: `// ${featureName} repository implementation`,
    },
    {
      relPath: `presentation/controllers/${featureName}.controller.ts`,
      content: `// ${featureName} controller`,
    },
    {
      relPath: `presentation/routes/${featureName}.routes.ts`,
      content: `// ${featureName} routes`,
    },
  ];

  files.forEach((file) => {
    const filePath = path.join(basePath, file.relPath);
    fs.writeFileSync(filePath, file.content);
  });

  vscode.window.showInformationMessage(
    `Feature "${featureName}" created successfully in ${selectedPath}.`
  );
}
