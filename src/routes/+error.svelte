<script>
	import { page } from '$app/stores';
</script>

<div>
	<h1>Error</h1>
	<p>{$page.error.message}</p>
	<a href="/">Go home</a>
</div>
