import { XMLFile } from "../XMLFile";

export interface ISolutionComponent {
    saveXML(xml: XMLFile[]): Promise<void>
}