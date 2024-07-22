<script>
	// import { redirect } from '@sveltejs/kit';
	//
	// export let data;
	// $: ({supabase} = data);
	//
	// $: logout = async () => {
	//   const {error} = await supabase.auth.signOut();
	//   if (error) {
	//     console.error(error);
	//   }
	//   redirect(303, '/');
	// };
</script>

<!--<header>-->
<!--    <nav>-->
<!--        <a href="/static">Home</a>-->
<!--    </nav>-->
<!--    <button on:click={logout}>Logout</button>-->
<!--</header>-->
<!--<main>-->
<slot />
<!--</main>-->