import { XMLFile } from "./XMLFile";
import { ISolutionComponent } from "./interfaces/ISolutionComponent";

export class SolutionComponent implements ISolutionComponent {
    
    public async saveXML(xml: XMLFile[]): Promise<void> {
        figma.ui.postMessage({ pluginMessage: { xml: xml } });  
    }
    
}
