<script>
  import meals from "./../store/m.js";
  console.log($meals)

  let meals_local = [
    {
      name: "Sałatka z fasoli i brokułu",
      ingredients: [{ name: "asdasda", value: { value: 12, type: "g" } }],
      type: "Snack"
    },
    {
      name: "Tajski sposób na tofu",
      ingredients: [
        { name: "ingredient 1", value: { value: "123", type: "łyzeczka" } },
        { name: "ingredient 2", value: { value: 4, type: "g" } }
      ],
      type: "Dinner"
    }
  ];
</script>

<style>
  input:checked + svg {
    display: block;
  }
</style>

<div class="bg-white overflow-hidden shadow rounded-lg">
  <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
    <!-- {#each meals_local as meal} -->
    {#each $meals as meal}
      <div class="border-gray-200 shadow px-4 py-5">
        <div class="flex items-center">
          <div class="text-3xl">{ meal.name }</div>
          <div class="text-l text-gray-600">{ meal.type }</div>
        </div>
        <div class="px-8 py-5 sm:p-6">
          {#each meal.ingredients as ingredient}
            <div class="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                class="form-checkbox h-4 w-4 text-indigo-600 transition
                duration-150 ease-in-out" />
              <label
                for="remember_me"
                class="ml-2 block text-sm leading-5 text-gray-900">
                { ingredient.name } { ingredient.value.value }
                { ingredient.value.type }
              </label>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
