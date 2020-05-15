<!-- routify:options name="meals" -->
<script>
    import { params } from '@sveltech/routify';
    import { url } from '@sveltech/routify';

    import user from "./../../store/auth.js";
    import config from './../../aws.js';

    let type = $params["type"]

    $: meals = handleGetMeals($params["type"]);

    async function handleGetMeals(type) {
        console.log($params["type"]);
        const res = await fetch(`${config["apiGateway"]["URL"]}/meals/${$params["type"]}`, {
            headers: { 
             'Authorization': `${$user.token["jwtToken"]}`
             }
            }
          );
        const data = await res.json();

        if (res.status === 200) {
            return data.meals.sort()
        }
    };
</script>

<div class="flex items-center justify-center">
  <ul class="list-disc list-outside">
  {#await meals}
  <!-- Add spinner -->
  {:then meals}
      {#each meals as meal}
        <li class="text-xl p-2"><a href={$url('/meals/:meal/:id', { meal: $params["type"], id: meal.ref["@ref"]['id']})} >{ meal.data.name }</a></li>
      {/each}
  {/await}
  </ul>
</div>