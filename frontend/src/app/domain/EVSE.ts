import { remove, concat } from "lodash";

export class EVSE {
    idEVSE: String
    model: String
    brand: String
    location: String

    constructor(id?:String, model?:String, brand?:String, location?:String) {
        this.idEVSE = String(id?? "")
        this.model = String(model?? "")
        this.brand = String(brand?? "")
        this.location= String(location?? "")
    }

    static fromJson(EVSEJson:any) {
        return Object.assign(new EVSE(), EVSEJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}