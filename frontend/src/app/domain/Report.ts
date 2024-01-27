import { remove, concat } from "lodash";

export class Report{
    ID: String
    start_datetime: String
    avg_score: String
    max_power_transfered: String
    min_power_transfered: String
    total_invoices: String

    constructor(ID?:String, start_datetime?:String, avg_score?:String, max_power_transfered?:String, min_power_transfered?:String, total_invoices?:String) {
        this.ID = String(ID)
        this.start_datetime = String(start_datetime)
        this.avg_score = String(avg_score)
        this.max_power_transfered = String(max_power_transfered)
        this.min_power_transfered = String(min_power_transfered)
        this.total_invoices = String(total_invoices)
    }

    static fromJson(ReportJson:any) {
        return Object.assign(new Report(), ReportJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}


export class Report_EVSE{
    EVSE_model: String
    avg_score: String
    max_power_transfered: String
    min_power_transfered: String
    total_invoices: String

    constructor(EVSE_model?:String, avg_score?:String, max_power_transfered?:String, min_power_transfered?:String, total_invoices?:String) {
        this.EVSE_model= String(EVSE_model)
        this.avg_score = String(avg_score)
        this.max_power_transfered = String(max_power_transfered)
        this.min_power_transfered = String(min_power_transfered)
        this.total_invoices = String(total_invoices)
    }

    static fromJson(ReportJson:any) {
        return Object.assign(new Report(), ReportJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}