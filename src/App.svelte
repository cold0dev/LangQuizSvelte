<script>
import { Button } from 'sveltestrap';
import LQEngine from './lib/LQEngine';

const STATE_ANSWER = 0;
const STATE_LOAD = 1;

let engine = undefined;
let state = STATE_ANSWER;

let question = undefined;
let correct = false;
let buttons = [undefined,undefined,undefined,undefined];
let correct_index = 0;

function load_questions(){
    let questions = engine.get_questions();
    correct_index = engine.get_correct_index();

    question = questions[correct_index].get_question();

    let part_label = document.getElementById("part_label");
    part_label.innerText = "Part: " + engine.get_active_part() + "/" + engine.get_part_count();

    let ca_label = document.getElementById("ca_label");
    ca_label.innerText = "Correct answers: " + engine.get_correct_answers() + "/20";

    buttons[0] = questions[0].get_answer();
    buttons[1] = questions[1].get_answer();
    buttons[2] = questions[2].get_answer();
    buttons[3] = questions[3].get_answer();
}

function answer(index){
    if (state == STATE_ANSWER){
        correct = engine.answer(index);
        state = STATE_LOAD;
    }
    else if (state == STATE_LOAD){
        load_questions();
        state = STATE_ANSWER;
    }
}


async function get_db_file(url){
    let req = await fetch(url);
    let res = await req.text();
    return res;
}

async function main(){
    let db_file = await get_db_file("/1000spain.db");
    engine = new LQEngine(db_file);
    load_questions();
}

main();

</script>

<main>
  <p id="part_label">Part:1/20</p>
  <p id="ca_label">Correct answers:0/20</p>
  {#if state == STATE_LOAD}
    {#if correct == true}
    <h1 style="color: green">{question}</h1>
    {:else}
    <h1 style="color: red">{question}</h1>
    {/if}
  {:else}
  <h1>{question}</h1>
  {/if}
  <div class="button-container">
    {#if state == STATE_ANSWER}
    <div class="button-item">
      <Button on:click={() => {answer(0)}} size="lg" block color="primary">{buttons[0]}</Button>
    </div>
    <div class="button-item">
      <Button on:click={() => {answer(1)}} size="lg" block color="primary">{buttons[1]}</Button>
    </div>
    <div class="button-item">
      <Button on:click={() => {answer(2)}} size="lg" block color="primary">{buttons[2]}</Button>
    </div>
    <div class="button-item">
      <Button on:click={() => {answer(3)}} size="lg" block color="primary">{buttons[3]}</Button>
    </div>
    {:else}
    <div class="button-item">
        {#if correct_index == 0}
        <Button on:click={() => {answer(0)}} size="lg" block color="success">{buttons[0]}</Button>
        {:else}
        <Button on:click={() => {answer(0)}} size="lg" block color="danger">{buttons[0]}</Button>
        {/if}
      </div>
      <div class="button-item">
        {#if correct_index == 1}
        <Button on:click={() => {answer(0)}} size="lg" block color="success">{buttons[1]}</Button>
        {:else}
        <Button on:click={() => {answer(0)}} size="lg" block color="danger">{buttons[1]}</Button>
        {/if}
      </div>
      <div class="button-item">
        {#if correct_index == 2}
        <Button on:click={() => {answer(0)}} size="lg" block color="success">{buttons[2]}</Button>
        {:else}
        <Button on:click={() => {answer(0)}} size="lg" block color="danger">{buttons[1]}</Button>
        {/if}
      </div>
      <div class="button-item">
        {#if correct_index == 3}
        <Button on:click={() => {answer(0)}} size="lg" block color="success">{buttons[3]}</Button>
        {:else}
        <Button on:click={() => {answer(0)}} size="lg" block color="danger">{buttons[1]}</Button>
        {/if}
      </div>
    {/if}
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  p {
    font-size: 2rem;
  }

  .button-container {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .button-item {
    margin-top: 1rem;
    width: 32rem;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: black;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 300;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }
</style>
