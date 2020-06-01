<script>
  import meals from "./../store/m.js";
  console.log($meals);

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
  <div class="flex justify-end mr-5 pt-3">
    <button class="inline-flex items-center px-4 py-2 border border-gray-300
        text-base leading-6 font-medium rounded-md text-gray-700 bg-white
        hover:text-gray-500 focus:outline-none focus:border-blue-300
        focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50
        transition ease-in-out duration-15">Save</button>
  </div>
  <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
    {#each meals_local as meal}
    <!-- {#each $meals as meal} -->
      <div class="border-gray-200 shadow px-4 py-5">
        <div class="flex items-center">
          <div class="text-3xl">{meal.name}</div>
          <div class="text-l text-gray-600">{meal.type}</div>
        </div>
        <div class=" py-5 sm:p-6">
          {#each meal.ingredients as ingredient}
            <ul class="list-disc list-outside">
              <li class="test-xl">
                {ingredient.name} {ingredient.value.value} {ingredient.value.type}
              </li>
            </ul>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
