import LQQuestion from "./LQQuestion";

export default class LQDatabase {
    constructor(text){
        this._questions = [];
        this._parts = 0;
        this.parse(text);
    }

    parse(text){
        let id = 0;

        for (let line of text.split("\n")){
            let args = line.split(";");
            if (args.length < 2)continue;
            let question = new LQQuestion(id,args[0],args[1]);
            this._questions.push(question);
            id += 1;
        }

        this._parts = this._questions.length / 20;
        this._parts--;
        if (this._questions.length % 20 != 0)this._parts++;
    }

    get_part_count() { 
        return this._parts;
    }

    reset_database() {
        for (let question of this._questions){
            question.set_used(false);
        }
    }

    get_random_question(part, used_ids){
        let question = undefined;
        let min = part * 20;
        let max = min + 19;
        while (true){
            let random = Math.floor(Math.random()*(max-min+1)+min);
            question = this._questions[random];

            let contain = false;
            for (let id of used_ids){
                if (id == question.get_id()){
                    contain = true;
                }
                else if (question.get_question() === this._questions[id].get_question()){
                    contain = true;
                }
                else if (question.get_answer() === this._questions[id].get_answer()){
                    contain = true;
                }
            }

            if (!contain)break;
        }

        return question;
    }

    get_questions(part){
        let out = [];
        let used_ids = [];

        let question1 = this.get_random_question(part,used_ids);
        used_ids.push(question1.get_id());
        let question2 = this.get_random_question(part,used_ids);
        used_ids.push(question2.get_id());
        let question3 = this.get_random_question(part,used_ids);
        used_ids.push(question3.get_id());
        let question4 = this.get_random_question(part,used_ids);

        out.push(question1);
        out.push(question2);
        out.push(question3);
        out.push(question4);

        return out;
    }
}