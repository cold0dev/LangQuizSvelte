export default class LQQuestion {
    constructor(id, question, answer){
        this._id = id;
        this._question = question;
        this._answer = answer;
        this._used = false;
    }

    get_question() {
        return this._question;
    }

    get_answer() {
        return this._answer;
    }

    is_used() {
        return this._used;
    }

    set_used(status) {
        this._used = status;
    }

    get_id() {
        return this._id;
    }
}