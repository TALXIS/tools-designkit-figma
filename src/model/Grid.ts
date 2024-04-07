export class Grid {
    columns: Column[];
    totalLines: number;
    language: string;

    constructor(columns: Column[],totalLines: number,language: string) {
        this.columns = columns;
        this.totalLines = totalLines;
        this.language = language;
    }
}

export class Column {
    name: string;
    rows: Row[];

    constructor(name: string, rows: Row[]) {
        this.name = name;
        this.rows = rows;
    }
}

export class Row {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}