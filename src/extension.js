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

	// Read configuration
	const extensionConfig = vscode.workspace.getConfiguration('fine-shortcuts');

	// Disposables
	const togglePythonInlayHintsDisposable = vscode.commands.registerCommand("fine-shortcuts.togglePythonInlayHints", function () {
		const pythonInlayHintsConfig = extensionConfig.get('togglePythonInlayHints');

		const confTarget = vscode.ConfigurationTarget.Global;
		const pythonAnalysisInlayHintsConfig = vscode.workspace.getConfiguration("python.analysis.inlayHints");
		const toggleValue = !pythonAnalysisInlayHintsConfig.get("variableTypes", false);

		pythonAnalysisInlayHintsConfig.update(
			"variableTypes",
			toggleValue,
			confTarget
		);
		pythonAnalysisInlayHintsConfig.update(
			"callArgumentNames",
			toggleValue ? pythonInlayHintsConfig.callArgumentNames.toggleOnValue : pythonInlayHintsConfig.callArgumentNames.toggleOffValue,
			confTarget
		);
		pythonAnalysisInlayHintsConfig.update(
			"functionReturnTypes",
			toggleValue,
			confTarget
		);
		pythonAnalysisInlayHintsConfig.update(
			"pytestParameters",
			toggleValue,
			confTarget
		);
	});

	const toggleErrorLensDisposable = vscode.commands.registerCommand("fine-shortcuts.toggleErrorLens", function () {
		const confTarget = vscode.ConfigurationTarget.Global;
		const config = vscode.workspace.getConfiguration("errorLens");
		const toggleValue = !config.get("enabled", false);
		config.update("enabled", toggleValue, confTarget);
	});

	// Configuration Listener
	const configrationListener = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('fine-shortcuts.togglePythonInlayHints')) {
			extensionConfig = vscode.workspace.getConfiguration('fine-shortcuts');
			pythonInlayHintsConfig = extensionConfig.get('togglePythonInlayHints');
		}
	});

	// Add disposables to the context
	context.subscriptions.push(
		configrationListener,
		// Commands
		toggleErrorLensDisposable,
		togglePythonInlayHintsDisposable
	);
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

