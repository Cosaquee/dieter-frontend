<script>
    import { onMount } from 'svelte';
    import { params } from '@sveltech/routify';
    import user from "./../../store/auth.js";
    import config from './../../aws.js';

    console.log($params);
    let type = $params["type"]

    $: meals = handleGetMeals($params["type"]);
    async function handleGetMeals(type) {
        const res = await fetch(`${config["apiGateway"]["URL"]}/meals/${$params["type"]}`, {
            headers: { 
             'Authorization': `${$user.token["jwtToken"]}`
             }
            }
          );
        const data = await res.json();

        if (res.status === 200) {
            meals = data.meals.sort()
        }
    };
</script>

<!-- routify:options name="meals" -->
<div>
  <div >
    <ul class="list-disc list-outside">
    {#await meals}
      {:then meals}
        {#each meals as meal}
          <li class="text-xl p-2"><a href="/meals/{type}/meal/{meal.ref['@ref']['id']}">{ meal.data.name }</a></li>
        {/each}
    {/await}
    </ul>
  </div>
</div>