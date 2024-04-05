export class Grid {
    columns: Column[];
    totalLines: number;

    constructor(columns: Column[],totalLines: number) {
        this.columns = columns;
        this.totalLines = totalLines;
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