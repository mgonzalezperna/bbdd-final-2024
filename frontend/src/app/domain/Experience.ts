import { remove, concat } from "lodash";

export class Experience{
    idTransaction: String
    start_datetime: String
    duration_secs: String
    experience_score: String
    comments: String

    constructor(id?:String, start_datetime?:String, duration_secs?:String, experience_score?:String, comments?:String) {
        this.idTransaction = String(id)
        this.start_datetime= String(start_datetime)
        this.duration_secs = String(duration_secs)
        this.experience_score = String(experience_score)
        this.comments= String(comments)
    }

    static fromJson(ExperienceJson:any) {
        return Object.assign(new Experience(), ExperienceJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}