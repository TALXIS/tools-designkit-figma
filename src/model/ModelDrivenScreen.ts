import { Entity } from "./Entity";
import { OptionSets } from "./OptionSets";
import { SavedQuery } from "./SavedQuery";
import { SiteMap } from "./SiteMap";
import { SystemForm } from "./SystemForm";

export class ModelDrivenScreen {
    entity: Entity;
    siteMap: SiteMap;
    savedQuery: SavedQuery | undefined;
    optionSets?: OptionSets | OptionSets[] | undefined;
    systemForm: SystemForm | undefined;
    appName: string;

    constructor(entity: Entity, siteMap: SiteMap,savedQuery:SavedQuery | undefined, optionSets: OptionSets[],systemForm: SystemForm | undefined,appName: string) {
        this.entity = entity;
        this.siteMap = siteMap;
        this.savedQuery = savedQuery;
        this.optionSets = optionSets;
        this.systemForm = systemForm;
        this.appName = appName;
    }
}
