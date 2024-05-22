# Learn Stack

Not just any simple flashcard app.

## Description

A React Native mobile app that improves vocabulary retention through a mix of multiple-choice and written questions. The app adapts based on the user's performance, offering a personalized learning experience that improves recall and understanding of vocabulary.

## Getting Started

### Dependencies

- Node.js v22.2.0+ (older versions have not been tested)
- A functioning human brain or AI bot.

### Installing

- Clone the repo
- cd into learn-stack (where the .gitignore file is)
- Type the following into your terminal:

```
npm install
```

Ensure you have the following VSCode extensions:

- Tailwind CSS Intellisense extension
- ES7+ React/Redux/React-Native snippets extension
- GitHub Copilot (very helpful for generating TypeScript types)

- Type the following into terminal:

```
npx expo start -c
```

The npx expo start -c runs and clears the cache, which is good to know, but in the future, you can probably just get by launching with:

```
npm start
```

- Download Expo Go on GooglePlay/App Store

### Executing program

- Make sure both your mobile device and computer are on the same network.

- Android:

  - Open Expo Go app and tap 'Scan QR code', then scan the QR code in your computer's terminal. You may have to scroll up to see it.

- iOS:

  - Go to 'Expo Go' in the Settings app turn on 'Local Network'
  - Turn VPN status off (Not Connected)
    Scan the QR code in the terminal via your phone's camera app (you may have to scroll up to see it).

- If you see a message that tailwindcss is taking a long time to build, make sure that there are NO SPACES or any special characters in the filepath from your root drive to your project directory. If there are, you may need to consider a different directory for this project.

- The app should launch. You're done. :)

## Important Things/Places

If you have no idea where to start, here's a few things you should know.

- 99% of code will be written under the src folder
- This project uses the Expo Router. All routes (pages) are placed in src/app.
  - Any file named \_layout.tsx will make changes to all sibling pages and apply to all child pages. This is helpful for shared UI like navigation bars and setting themes.
- This project uses Native Wind v4 (built on TailwindCSS), so no writing stylesheets. Instead of using 'style', use 'className'. Please refer to [Tailwind docs](https://tailwindcss.com/docs) for documentation (it's very helpful).
  - Most of this app colors use a set of custom predefined colors on top of the tailwind defaults. Those are assigned in src/app/global.css (there's a group of variables for light mode and dark mode). These variables are assigned tailwind classes in the tailwind.config.js file
- This project also uses [React Native Reusables (RNC)](https://rnr-docs.vercel.app/getting-started/initial-setup/) - A Shadcn inspired library. It provides reusable UI components that can be customized within the project. View the documentation for adding things like cards, buttons, inputs, labels, etc. See [Shadcn documentation](https://ui.shadcn.com/docs/components/) for component previews.
  - Please use the RNC Text component instead of the React Native one for proper class inheritance. All currently imported RNC modules can be found under src/app/components/ui. Use any of those over the defaults they replace (such as Text, Button, etc.).
- If you're confused about the import paths, look at the "paths" object in tsconfig.json. That defines all the path aliases. For example, @/\* will always start at (root)/src/[path you specify].

## Known Issues

- Don't upgrade tailwindcss to a version newer than 3.4.1 as it changes how dark mode is handled which is not yet implemented by Native Wind (as of 5/22/24).

## Authors

Contributors names and contact info

[@Dillpickleschmidt](https://github.com/Dillpickleschmidt)
[@id_2]()

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

<!-- ## Acknowledgments

Inspiration, code snippets, etc.

- [awesome-readme](https://github.com/matiassingers/awesome-readme)
- [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- [dbader](https://github.com/dbader/readme-template)
- [zenorocha](https://gist.github.com/zenorocha/4526327)
- [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46) -->
