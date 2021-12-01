class DataClass {
    gcm: string;
    variable: string;
    fromYear: number;
    toYear: number;
    climateData: number[]

    constructor(
        gcm: string,
        variable: string,
        fromYear: number,
        toYear: number,
        climateData: number[]) {
        this.gcm = gcm
        this.variable = variable
        this.fromYear = fromYear
        this.toYear = toYear
        this.climateData = climateData
    }

}

export default DataClass


