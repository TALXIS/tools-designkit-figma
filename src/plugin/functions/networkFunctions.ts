import { ScreenExport } from "../../model/ScreenExport";

export async function uploadScreensToSharePoint(screenExports: ScreenExport[],token: string, siteId: string, path: string) {
    for (let index = 0; index < screenExports.length; index++) {
        const element = screenExports[index];
        
        const requestOptions = {
            method: "PUT",
            headers: {
                'Authorization' : 'Bearer '+ token, 
                'Content-Type': 'application/octet-stream'
            },
            body: element.content
            
            };

            await callGraphAPI(siteId, path, element, requestOptions);
        };
    figma.notify("All frames have been uploaded to SharePoint successfully!");
}

async function callGraphAPI(siteId: string, path: string, element: ScreenExport, requestOptions: { method: string; headers: { Authorization: string; 'Content-Type': string; }; body: Uint8Array; }) {
    try {
        const response = await fetch("https://graph.microsoft.com/v1.0/sites/" + siteId + "/drive/root:/" + path + "/" + element.fileName + ":/content", requestOptions);
    
        await response.json().then(() => {
            if (response.status == 401) {
                figma.notify("Invalid or expired token!");
                return;
            }
        });
    } catch(error) {
        console.log(error);
    }
}