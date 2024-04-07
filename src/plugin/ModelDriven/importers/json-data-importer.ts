import { Column, Grid, Row } from "../../../model/Grid";
import { parseGrid } from "../parsers/modelDrivenParser";

export function importJSONtoGrid(data: any) {
    try {
        const json = JSON.parse(data);
    
        parseJSONtoGrid(json,"none"); 
    } catch(error) {
        figma.notify("Invalid JSON file");
    }
}

export async function importMockarooToGrid(api: string, endpoint: string,language: string) {
    const response = await fetch("https://my.api.mockaroo.com/"+ endpoint, {
        headers:{
            'X-API-Key' : api
        } 
    });

    await response.json().then(value => {
        if(response.status == 401 || response.status == 400) {
            figma.notify("40x - Not content found with filled inputs");
            return;
        }
        parseJSONtoGrid(value,language);
        figma.closePlugin();
    });
}

function parseJSONtoGrid(json: any,language: string) {
    const columns: Column[] = [];
    let totalLines = 5;
    if (Array.isArray(json)) {

        const keys: String[] = [];
        totalLines = json.length;
        json.forEach(element => {
            const objkeys = Object.keys(element);
            objkeys.forEach(element => {
                if (!keys.includes(element)) keys.push(element);
            });
        });


        for (let i = 0; i < keys.length; i++) {
            const rows: Row[] = [];
            for (let index = 0; index < json.length; index++) {
                const element = json[index];
                const values = Object.values(element);

                const value = values[i] as any;
                rows.push(new Row(value));
            }
            columns.push(new Column(keys[i] as string, rows));
        }

    }
    const grid = new Grid(columns, totalLines,language);
    parseGrid(grid);
}