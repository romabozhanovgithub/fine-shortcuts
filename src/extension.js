// The module "vscode" contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
	console.log('Activating "fine-shortcuts" extension');
	const togglePythonInlayHintsDisposable = vscode.commands.registerCommand("fine-shortcuts.togglePythonInlayHints", function () {
		const confTarget = vscode.ConfigurationTarget.Global;
		const config = vscode.workspace.getConfiguration("python.analysis.inlayHints");
		const toggleValue = !config.get("variableTypes", false);

		config.update(
			"variableTypes",
			toggleValue,
			confTarget
		);
		config.update(
			"callArgumentNames",
			toggleValue ? "all" : "off",
			confTarget
		);
		config.update(
			"functionReturnTypes",
			toggleValue,
			confTarget
		);
		config.update(
			"pytestParameters",
			toggleValue,
			confTarget
		);
	});

	context.subscriptions.push(togglePythonInlayHintsDisposable);
	console.log('Extension "fine-shortcuts" is now active!');
}

// This method is called when your extension is deactivated
const deactivate = () => {
	console.log('Extension "fine-shortcuts" is now deactivated!');
};

module.exports = {
	activate,
	deactivate
}
