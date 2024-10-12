<script>
	import { page } from '$app/stores';
</script>

<div>
	<h1>Error</h1>
	<p>{JSON.stringify($page.error, null, 2)}</p>
	<a href="/">Go home</a>
</div>
