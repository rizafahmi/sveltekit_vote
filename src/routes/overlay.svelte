<script type="text/javascript">
 import { onMount } from 'svelte';
 let topics = [];
 // const baseUrl = `http://192.168.1.105:3000`
 const baseUrl = "https://vote-live.herokuapp.com";

 async function getTopics() {
     const res = await fetch(`${baseUrl}/topics`);
     const data = await res.json();
     topics = data.topics;
 }

 onMount(function() {
     getTopics();
     setInterval(function() {
         console.log("Reload");
         getTopics();
     }, 5000);

 })
</script>

<div>
    {#each topics as topic}
        <span> 🟡 {topic.vote} - {topic.title} </span>
    {/each}
</div>

<style>
 span {
     font-family: Montserrat, Lato, sans-serif;
     font-weight: 600;
     color: #F1B732;
 }
</style>
