import LQDatabase from "./LQDatabase";

export default class LQEngine {
    constructor(database_text){
        this.m_database = new LQDatabase(database_text);
        this.m_active_part = 1;

        this.m_correct_answers = 0;
        this.m_correct_index = 0;
    }

    reset_correct_answers(){
        this.m_correct_answers = 0;
        this.m_database.reset_database();
    }

    get_questions(){
        let out = this.m_database.get_questions(this.m_active_part-1);

        while (true){
            this.m_correct_index = Math.floor(Math.random()*4);
            if (out[this.m_correct_index].is_used()){
                out = this.m_database.get_questions(this.m_active_part-1);
                continue;
            }
            break;
        }
        out[this.m_correct_index].set_used(true);
        return out;
    }

    answer(index){
        if (index == this.m_correct_index){
            this.m_correct_answers++;
            if (this.m_correct_answers == 20){
                this.m_correct_answers = 0;
                //TODO: check if active part is bigger than size of parts
                this.m_active_part++;
            }
            return true;
        }

        this.reset_correct_answers();
        return false;
    }

    get_correct_index() { return this.m_correct_index; }
    get_active_part() { return this.m_active_part; }
    get_part_count() { return this.m_database.get_part_count() + 1; }
    get_correct_answers() { return this.m_correct_answers; }
}