<script>
 import '../tailwind.css';

 const baseUrl = "http://localhost:3000";
 let topics = [];

 async function getTopics() {
     const res = await fetch(`${baseUrl}/topics`);
     const data = await res.json();
     topics = data.topics;
 }

 getTopics();

 async function handleVote(id) {
     console.log("click", id)
     const res = await fetch(`${baseUrl}/topics`, {
         method: 'PATCH',
         body: JSON.stringify({id: id})
     });
     const data = await res.json();
     topics = data.topics;
 }
</script>

<div class="container">
    <header>
        <h1 class="text-4xl text-red-500">Vote Topik Livestreaming</h1>
    </header>

    <ul>
        {#each topics as topic}
            <li><div>{topic.title} <button class="btn" on:click={() => handleVote(topic.id)}>Vote({topic.vote})</button></div></li>
        {/each}
    </ul>
</div>

<style>
 .container {
     @apply py-4 px-6 flex flex-col items-center;
 }
 h1 {
     @apply pb-6;
 }
</style>
