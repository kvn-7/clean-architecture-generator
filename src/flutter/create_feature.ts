import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { toSnakeCase } from "../utils/utils";

export async function createFlutterFeature(uri?: vscode.Uri) {
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
    "application/providers/repositories",
    "application/providers/sources",
    "domain/entities",
    "domain/repositories",
    "domain/use_cases",
    "presentation/providers",
    "presentation/views",
    "data/models",
    "data/repositories",
    "data/sources",
  ];

  folders.forEach((folder) => {
    const dir = path.join(basePath, folder);
    fs.mkdirSync(dir, { recursive: true });
  });

  // Convert feature name to different cases
  // const camelCase = toCamelCase(featureName);
  // const pascalCase = toPascalCase(featureName);
  const snakeCase = toSnakeCase(featureName);

  // Create base files with Flutter/Riverpod content
  const files = [
    {
      relPath: `application/providers/repositories/${snakeCase}_repository_provider.dart`,
      // content: generateRepositoryProvider(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `application/providers/sources/${snakeCase}_remote_data_source_provider.dart`,
      // content: generateRemoteDataSourceProvider(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `domain/entities/${snakeCase}_entity.dart`,
      // content: generateEntity(pascalCase),
      content: "",
    },
    {
      relPath: `domain/repositories/${snakeCase}_repository.dart`,
      // content: generateRepositoryInterface(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `domain/use_cases/get_${snakeCase}_use_case.dart`,
      // content: generateUseCase(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `presentation/providers/${snakeCase}_provider.dart`,
      // content: generatePresentationProvider(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `presentation/views/${snakeCase}_screen.dart`,
      // content: generateScreen(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `data/models/${snakeCase}_model.dart`,
      // content: generateModel(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `data/repositories/${snakeCase}_repository.dart`,
      // content: generateRepositoryImpl(snakeCase, pascalCase),
      content: "",
    },
    {
      relPath: `data/sources/${snakeCase}_remote_data_source.dart`,
      // content: generateRemoteDataSource(snakeCase, pascalCase),
      content: "",
    },
  ];

  files.forEach((file) => {
    const filePath = path.join(basePath, file.relPath);
    fs.writeFileSync(filePath, file.content);
  });

  vscode.window.showInformationMessage(
    `Flutter feature "${featureName}" created successfully in ${selectedPath}.`
  );
}
