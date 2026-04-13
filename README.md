# No Duplicate Tabs

A VS Code extension that focuses the existing editor tab when you open a file that's already open, instead of opening a duplicate tab in another editor group.

## Why

VS Code's default behavior is to open a second editor for the same file if you open it from a different group (e.g. from the explorer, or via Go to File). This extension catches that and routes you back to the tab that already exists.

## Install

Grab the `.vsix` from the [latest release](https://github.com/jwjames/no-duplicate-tabs/releases) and install it:

```bash
code --install-extension no-duplicate-tabs-1.0.0.vsix
```

Or in VS Code: Extensions panel → `…` menu → **Install from VSIX**.

## How it works

On every `onDidOpenTextDocument`, the extension checks `vscode.window.visibleTextEditors` for an existing editor showing the same URI. If one is found, it focuses that editor and closes the duplicate in the other group.

See [`src/extension.ts`](src/extension.ts).

## Build from source

```bash
npm install
npm run compile
npx vsce package
```

Produces a fresh `.vsix` you can install with the command above.

## License

MIT. See [LICENSE](LICENSE).
