import { ScreenExport } from "../../model/ScreenExport";

export async function fillScreensToArrayForExport() {
    const screenExports: ScreenExport[] = [];

    const selectedScreens = figma.currentPage.selection;
    if(selectedScreens.length == 0) return undefined;

    for (let index = 0; index < selectedScreens.length; index++) {
        const scene = selectedScreens[index];
        const fileName = scene.name + ".png";
        const response = await scene.exportAsync({format: "PNG"})
        screenExports.push(new ScreenExport(fileName,response));
    };

    return screenExports;
}