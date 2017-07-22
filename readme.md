## Contributing

### Setup

The first time, run:
```bash
git clone git@github.com:btpoe/gulp-gui.git
cd gulp-gui
yarn install
npm i -g electron
```

Then, to run the app in development mode, run:
```bash
electron app
```

## Roadmap

### Phase 1
- ~~Add console output.~~
- Test icons and images.
- Add .svg to icon globs.
- Add image extensions to images globs.
- Stop and rewatch watchers when settings changed (run after dependency installers finish).

### Phase 2
- Cache icons and images.
- Write documentation in gulpfile comments.
- Advanced settings to edit object.
- Make watch and build buttons clearer ui.

### Phase 3
- Add "recent projects" to file menu.
- Drag and drop to start app.
- Source browser.
- Build glob editor.

### Phase 4
- Integrate with docker (maybe initiate with web container only?). 
