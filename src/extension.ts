import * as vscode from "vscode";
import { createNodeFeature } from "./node/create_feature";
import { createFlutterFeature } from "./flutter/create_feature";

export function activate(context: vscode.ExtensionContext) {
  // Node.js Clean Architecture command
  const nodeDisposable = vscode.commands.registerCommand(
    "cleanArch.createNodeFeature",
    async (uri?: vscode.Uri) => {
      await createNodeFeature(uri);
    }
  );

  // Flutter Clean Architecture command
  const flutterDisposable = vscode.commands.registerCommand(
    "cleanArch.createFlutterFeature",
    async (uri?: vscode.Uri) => {
      await createFlutterFeature(uri);
    }
  );

  context.subscriptions.push(nodeDisposable, flutterDisposable);
}

export function deactivate() {}
