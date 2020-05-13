<script>
  import { Auth } from "aws-amplify";
  import { onMount } from "svelte";
  import { url } from '@sveltech/routify';

  import user from "./../store/auth.js";

  let verificationCode = "";
  let email;
  let password;
  let openSubmenu = false;
  const links = [["./index", "home"], ["./about", "about"], ["./blog", "blog"]];

  onMount(async () => {
    try {
      console.log("On mount");
      let u = await Auth.currentAuthenticatedUser();
      user.authUser(u);
    } catch (error) {
      console.log("not authenticated: ", error);
    }
  });

  async function SignIn() {
    try {
      console.log("Sign in");
      const u = await Auth.signIn(email, password);

      user.authUser(u);
      console.log(u);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  function showSubmenu() {
    openSubmenu = !!!openSubmenu;
  }
</script>

<svelte:head>
  <title>Dieter</title>
</svelte:head>

<div class="min-h-screen bg-white">
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="/img/dieter.svg"
              alt="Dieter logo" />
            <img
              class="hidden lg:block h-8 w-auto"
              src="/img/dieter.svg"
              alt="Dieter logo" />
            <span>Dieter</span>
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex">
            {#if $user.isAuthenticated}
              <a
                href={$url('/meals/:meal', { meal: "breakfast"})}
                class="inline-flex items-center px-1 pt-1 border-b-2
                border-indigo-500 text-sm font-medium leading-5 text-gray-900
                focus:outline-none focus:border-indigo-700 transition
                duration-150 ease-in-out">
                Breakfast
              </a>
              <a
                href={$url('/meals/:meal', { meal: "snack"})}
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2
                border-transparent text-sm font-medium leading-5 text-gray-500
                hover:text-gray-700 hover:border-gray-300 focus:outline-none
                focus:text-gray-700 focus:border-gray-300 transition
                duration-150 ease-in-out">
                Snack
              </a>
              <a
                href={$url('/meals/:meal', { meal: "dinner"})}
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2
                border-transparent text-sm font-medium leading-5 text-gray-500
                hover:text-gray-700 hover:border-gray-300 focus:outline-none
                focus:text-gray-700 focus:border-gray-300 transition
                duration-150 ease-in-out">
                Dinner
              </a>
              <a
                href={$url('/meals/:meal', { meal: "supper"})}
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2
                border-transparent text-sm font-medium leading-5 text-gray-500
                hover:text-gray-700 hover:border-gray-300 focus:outline-none
                focus:text-gray-700 focus:border-gray-300 transition
                duration-150 ease-in-out">
                Supper
              </a>
              <a
                href="/meals-planner"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2
                border-transparent text-sm font-medium leading-5 text-gray-500
                hover:text-gray-700 hover:border-gray-300 focus:outline-none
                focus:text-gray-700 focus:border-gray-300 transition
                duration-150 ease-in-out">
                Meals Planner
              </a>
              <a
                href="/shopping-list"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2
                border-transparent text-sm font-medium leading-5 text-gray-500
                hover:text-gray-700 hover:border-gray-300 focus:outline-none
                focus:text-gray-700 focus:border-gray-300 transition
                duration-150 ease-in-out">
                Shopping List
              </a>
            {/if}
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">

          {#if $user.isAuthenticated}
            <button
              class="p-1 border-2 border-transparent text-gray-400 rounded-full
              hover:text-gray-500 focus:outline-none focus:text-gray-500
              focus:bg-gray-100 transition duration-150 ease-in-out"
              aria-label="Notifications">
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002
                  6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6
                  11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6
                  0v-1m6 0H9" />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  on:click={showSubmenu}
                  class="flex text-sm border-2 border-transparent rounded-full
                  focus:outline-none focus:border-gray-300 transition
                  duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true">
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" />
                </button>
              </div>
              <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              {#if openSubmenu}
                <div
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md
                  shadow-lg">
                  <div class="py-1 rounded-md bg-white shadow-xs">
                    <a
                      href="asd"
                      class="block px-4 py-2 text-sm leading-5 text-gray-700
                      hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                      transition duration-150 ease-in-out">
                      Your Profile
                    </a>
                    <a
                      href="asd"
                      class="block px-4 py-2 text-sm leading-5 text-gray-700
                      hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                      transition duration-150 ease-in-out">
                      Settings
                    </a>
                    <a
                      href="asd"
                      class="block px-4 py-2 text-sm leading-5 text-gray-700
                      hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                      transition duration-150 ease-in-out">
                      Sign out
                    </a>
                  </div>
                </div>
              {/if}

            </div>
          {/if}
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md
            text-gray-400 hover:text-gray-500 hover:bg-gray-100
            focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition
            duration-150 ease-in-out">
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div class="hidden sm:hidden">
      <div class="pt-2 pb-3">
        <a
          href="asd"
          class="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base
          font-medium text-indigo-700 bg-indigo-50 focus:outline-none
          focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700
          transition duration-150 ease-in-out">
          Dashboard
        </a>
        <a
          href="asd"
          class="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent
          text-base font-medium text-gray-600 hover:text-gray-800
          hover:bg-gray-50 hover:border-gray-300 focus:outline-none
          focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition
          duration-150 ease-in-out">
          Team
        </a>
        <a
          href="asd"
          class="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent
          text-base font-medium text-gray-600 hover:text-gray-800
          hover:bg-gray-50 hover:border-gray-300 focus:outline-none
          focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition
          duration-150 ease-in-out">
          Projects
        </a>
        <a
          href="asd"
          class="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent
          text-base font-medium text-gray-600 hover:text-gray-800
          hover:bg-gray-50 hover:border-gray-300 focus:outline-none
          focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition
          duration-150 ease-in-out">
          Calendar
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-6 text-gray-800">
              Tom Cook
            </div>
            <div class="text-sm font-medium leading-5 text-gray-500">
              tom@example.com
            </div>
          </div>
        </div>
        <div
          class="mt-3"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu">
          <a
            href="asd"
            class="block px-4 py-2 text-base font-medium text-gray-500
            hover:text-gray-800 hover:bg-gray-100 focus:outline-none
            focus:text-gray-800 focus:bg-gray-100 transition duration-150
            ease-in-out"
            role="menuitem">
            Your Profile
          </a>
          <a
            href="asd"
            class="mt-1 block px-4 py-2 text-base font-medium text-gray-500
            hover:text-gray-800 hover:bg-gray-100 focus:outline-none
            focus:text-gray-800 focus:bg-gray-100 transition duration-150
            ease-in-out"
            role="menuitem">
            Settings
          </a>
          <a
            href="asd"
            class="mt-1 block px-4 py-2 text-base font-medium text-gray-500
            hover:text-gray-800 hover:bg-gray-100 focus:outline-none
            focus:text-gray-800 focus:bg-gray-100 transition duration-150
            ease-in-out"
            role="menuitem">
            Sign out
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- <button on:click={() => signUp()}>SignUp</button>
<input bind:value={verificationCode} />

<button on:click={() => confirmSignUp()}>Verify</button> -->

  <!-- <button on:click={() => SignIn()}>Login</button> -->
  <!-- 
-->

  <div class="py-10">
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {#if $user.isAuthenticated}
          <slot />
        {:else}
          <div
            class="min-h-screen flex items-center justify-center bg-gray-50
            py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full">
              <div>
                <img
                  class="mx-auto h-12 w-auto"
                  src="/img/dieter.svg"
                  alt="Dieter" />
                <h2
                  class="mt-6 text-center text-3xl leading-9 font-extrabold
                  text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <form class="mt-8">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm">
                  <div>
                    <input
                      aria-label="Email address"
                      name="email"
                      type="email"
                      required
                      class="appearance-none rounded-none relative block w-full
                      px-3 py-2 border border-gray-300 placeholder-gray-500
                      text-gray-900 rounded-t-md focus:outline-none
                      focus:shadow-outline-blue focus:border-blue-300 focus:z-10
                      sm:text-sm sm:leading-5"
                      placeholder="Email address"
                      bind:value={email} />
                  </div>
                  <div class="-mt-px">
                    <input
                      aria-label="Password"
                      name="password"
                      type="password"
                      required
                      class="appearance-none rounded-none relative block w-full
                      px-3 py-2 border border-gray-300 placeholder-gray-500
                      text-gray-900 rounded-b-md focus:outline-none
                      focus:shadow-outline-blue focus:border-blue-300 focus:z-10
                      sm:text-sm sm:leading-5"
                      placeholder="Password"
                      bind:value={password} />
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      class="form-checkbox h-4 w-4 text-indigo-600 transition
                      duration-150 ease-in-out" />
                    <label
                      for="remember_me"
                      class="ml-2 block text-sm leading-5 text-gray-900">
                      Remember me
                    </label>
                  </div>
                </div>

                <div class="mt-6">
                  <button
                    class="group relative w-full flex justify-center py-2 px-4
                    border border-transparent text-sm leading-5 font-medium
                    rounded-md text-white bg-indigo-600 hover:bg-indigo-500
                    focus:outline-none focus:border-indigo-700
                    focus:shadow-outline-indigo active:bg-indigo-700 transition
                    duration-150 ease-in-out"
                    on:click|preventDefault={() => SignIn()}>
                    <span
                      class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        class="h-5 w-5 text-indigo-500
                        group-hover:text-indigo-400 transition ease-in-out
                        duration-150"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2
                          2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016
                          0z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        {/if}
      </div>
    </main>
  </div>
</div>
