# Power Platform DesignKit for Figma
<br>
<div align="center">
<article style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <p align="center"><img width="200" src="https://github.com/TALXIS/tools-designkit-figma/blob/master/src/assets/logo.png" /></p>
    <p>
        Figma plugin for authoring and exporting Power Apps solution components
    </p>
</article>
	
<div align="center">
	
</div>
</div>

> [!IMPORTANT]
> We are gradually open-sourcing the code, removing internal dependencies to make it universally applicable.
> At this stage, it serves as a source of inspiration and a basis for collaboration.
> We welcome feedback, suggestions, and contributions through pull requests.
 
If wish to use this project for your team, please get in touch with us at info@mycondy.com for a personalized onboarding experience and customization to meet your specific needs.

## 🎉 Features
- Export selected Frame in Figma to the separated XML files (AppModule, Entity, SavedQuery, Form) as a zip file
- Export pre-created Collections from your local variables in Figma to the XML (OptionSet)
- Add Import/Export for the Canvas Apps (manual is here - https://medium.com/@lukas.lp.pavelka/power-apps-imex-version-2-0-5fd2ab229262)

## ⚡️ Roadmap
- [x] Add Import/Export for the Canvas Apps
- [x] Add Helper screen - Canvas templates
- [x] Import Model Driven Solution file
- [x] Import of Power Automate
- [x] New UI for Power Automate Flow (after the Easter holiday)
- [x] Import own JSON data for Model Driven Grid
- [x] Import JSON data from Mackaroo.com (end of week15)
- [x] Generate JSON data from Mockaroo API with possibility to View or Form
- [x] Upload selected Figma frames on SharePoint via GraphAPI

## 🔥 Contribute
* Run `npm ci` to install dependencies.
* Run `npm run start` to start webpack in watch mode or `npm run build` to build once.
* Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.
* Create a Pull request for your branch

## License
The full text of the license can be accessed via [this link](https://opensource.org/license/gpl-3-0/) and is also included in the [license.txt](license.txt) file of this software package.
