<script context="module">
 export async function load({page, session}) {
     return {
         props: {
             host: page.host,
             session
         }
     }
 }
</script>
<script>
 import { onMount } from 'svelte';

 export let host;
 export let session;
 let baseUrl = '';

 if(host === 'localhost:3000' ) {
     baseUrl = `http://${host}`;
 } else if(host[0] === '1') {
     baseUrl = `http://${host}`;
 } else {
     baseUrl = "https://vote-live.herokuapp.com";
 }
 // const baseUrl = `http://192.168.1.105:3000`
 let topics = [];
 let voteStatus = true;

 onMount(async function() {
     if(session !== '' || session !== null) {
         voteStatus = !await checkVoter(session)
     }
 });

 async function checkVoter(session) {
     const res = await fetch(`${baseUrl}/checkvoter?sessid=${session}`)
     const voter = await res.json();
     return voter.status;
 }

 async function getTopics() {
     const res = await fetch(`${baseUrl}/topics`);
     const data = await res.json();
     topics = data.topics;
 }

 getTopics();

 async function handleVote(id) {

     const res = await fetch(`${baseUrl}/topics`, {
         method: 'PATCH',
         body: JSON.stringify({id:id, baseUrl:baseUrl})
     });
     const data = await res.json();
     topics = data.topics;
     voteStatus = false;
 }
</script>

<div class="container">
    <header>
        <h1 class="text-4xl text-red-500">🌈 Vote Topik Livestreaming <a href="https://youtube.com/rizafahmi" target="_blank">youtube.com/rizafahmi</a> 🌈</h1>
        {#if voteStatus === false}
            <p>Terimaksih sudah kontribusi vote. Vote lagi lain waktu.
            </p>
        {/if}
    </header>

    <ul>
        {#each topics as topic}
            <li><div>{topic.title}
                {#if voteStatus === true}
                    <button class="btn" on:click={() => handleVote(topic.id)}>Vote({topic.vote})</button>
                {:else}
                    <button class="btn" disabled>Vote({topic.vote})</button>
                {/if}
            </div></li>
        {/each}
    </ul>
</div>

<style>
 .container {
     padding: 12px;
 }
</style>
