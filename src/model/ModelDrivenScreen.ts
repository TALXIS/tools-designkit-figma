import { Entity } from "./Entity";
import { OptionSets } from "./OptionSets";
import { SavedQuery } from "./SavedQuery";
import { SiteMap } from "./SiteMap";

export class ModelDrivenScreen {
    entity: Entity;
    siteMap: SiteMap;
    savedQuery: SavedQuery;
    optionSets?: OptionSets | OptionSets[] | undefined;
    appName: string;

    constructor(entity: Entity, siteMap: SiteMap,savedQuery:SavedQuery, optionSets: OptionSets[],appName: string) {
        this.entity = entity;
        this.siteMap = siteMap;
        this.savedQuery = savedQuery;
        this.optionSets = optionSets;
        this.appName = appName;
    }
}
