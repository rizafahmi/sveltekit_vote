<script context="module">
 export async function load({page}) {
     return {
         props: {
             host: page.host
         }
     }
 }
</script>

<script>
 import { onMount } from 'svelte';
 let topics = [];
 // const baseUrl = `http://192.168.1.105:3000`
 export let host;
 let baseUrl = '';

 if(host === 'localhost:3000' ) {
     baseUrl = `http://${host}`;
 } else if(host[0] === '1') {
     baseUrl = `http://${host}`;
 } else {
     baseUrl = "https://vote-live.herokuapp.com";
 }

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
