<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: console.log({ form });
</script>

<div class="container wrapper">
	<form action="?/login" class="flow" method="POST">
		<label class="flow" for="email"
			>Email address
			<input autocomplete="email" class="input" id="email" name="email" type="email" required />
		</label>
		<label class="flow" for="password"
			>Password
			<input
				autocomplete="current-password"
				class="input"
				id="password"
				name="password"
				type="password"
				required
			/>
		</label>
		{#if form && !form.success}
			<div class="flow">
				<h4 class="error__header">{form?.message}</h4>
				<p class="error__content">
					<a href="/">Click here</a> to go to the main website.
				</p>
			</div>
		{/if}
		<button class="button" type="submit"> Log in </button>
	</form>
</div>

<style lang="scss">
	.container {
		min-height: 100vh;
		padding: 2em 0;
		max-width: 100%;
		display: grid;
		place-content: center;
		background-color: hsla(39, 100%, 50%, 0.15);
	}

	form {
		--flow-space: 1.25em;
		width: 25ch;
		max-width: 80ch;
	}

	label {
		display: block;
		max-width: 100%;
		font-size: var(--text-size-meta);
	}

	input {
		margin-top: var(--space-xs);
		display: block;
		width: 100%;
	}

	.error__content {
		--flow-space: 0.25em;

		a {
			display: inline-block;
		}
	}
</style>
