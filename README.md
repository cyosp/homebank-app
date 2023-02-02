# HomeBank
App based on Homebank XML file

## Development

### Install `ng` CLI
`npm install -g @angular/cli`

### Create Homebank app
`ng new app`

Output:
```
? Would you like to enable autocompletion? This will set up your terminal so pressing TAB while typing Angular CLI commands will show possible options and autocomplete arguments. 
(Enabling autocompletion will modify configuration files in your home directory.) Yes
Appended `source <(ng completion script)` to `/Users/cyosp/.zshrc`. Restart your terminal or run the following to autocomplete `ng` commands:

    source <(ng completion script)
? Would you like to share pseudonymous usage data about this project with the Angular Team
at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more
details and how to change this setting, see https://angular.io/analytics. No
Global setting: disabled
Local setting: No local workspace configuration file.
Effective status: disabled
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
CREATE app/README.md (1062 bytes)
CREATE app/.editorconfig (274 bytes)
CREATE app/.gitignore (548 bytes)
CREATE app/angular.json (2884 bytes)
CREATE app/package.json (1039 bytes)
CREATE app/tsconfig.json (901 bytes)
CREATE app/tsconfig.app.json (263 bytes)
CREATE app/tsconfig.spec.json (273 bytes)
CREATE app/.vscode/extensions.json (130 bytes)
CREATE app/.vscode/launch.json (474 bytes)
CREATE app/.vscode/tasks.json (938 bytes)
CREATE app/src/favicon.ico (948 bytes)
CREATE app/src/index.html (294 bytes)
CREATE app/src/main.ts (214 bytes)
CREATE app/src/styles.sass (80 bytes)
CREATE app/src/assets/.gitkeep (0 bytes)
CREATE app/src/app/app-routing.module.ts (245 bytes)
CREATE app/src/app/app.module.ts (393 bytes)
CREATE app/src/app/app.component.sass (0 bytes)
CREATE app/src/app/app.component.html (23115 bytes)
CREATE app/src/app/app.component.spec.ts (1079 bytes)
CREATE app/src/app/app.component.ts (213 bytes)
✔ Packages installed successfully.
    Directory is already under version control. Skipping initialization of git.
```

### Install dependencies
`npm install`

### Run app
`npm run start`

#### With French translation
`npm run start -- --configuration=fr`
