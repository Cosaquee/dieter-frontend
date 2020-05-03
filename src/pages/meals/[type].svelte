<script>
    import { onMount } from 'svelte';
    import { params } from '@sveltech/routify';
    import user from "./../../store/auth.js";
    import config from './../../aws.js';

    console.log($params);
    let meals = [];
    let type = $params["type"]

    onMount(async () => {
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
    });
</script>


<div>
  <div >
    <ul class="list-disc list-outside">
        {#each meals as meal}
        <li class="text-xl p-2"><a href="/meals/{type}/meal/{meal.ref['@ref']['id']}">{ meal.data.name }</a></li>
      {/each}
    </ul>
  </div>
</div>