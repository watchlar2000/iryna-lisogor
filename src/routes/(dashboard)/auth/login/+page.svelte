<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fly, slide } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let sending: boolean = false;

	$: console.log({ form });
</script>

<div class="container wrapper">
	<form
		action="?/login"
		class="flow"
		method="POST"
		use:enhance={() => {
			sending = true;
			return async ({ update }) => {
				await update({ invalidateAll: true });
				sending = false;
			};
		}}
	>
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
			<div class="error__wrapper flow" in:fly={{ y: 20 }} out:slide>
				<h4 class="error__header">{form?.message}</h4>
				<p>
					<a href="/" class="link">Click here</a> to go to the main website.
				</p>
			</div>
		{/if}
		<button class="button" type="submit"> {sending ? '...' : 'Log in'} </button>
	</form>
</div>

<style lang="scss">
	.container {
		min-height: 100vh;
		padding: 2em 0;
		max-width: 100%;
		display: grid;
		place-content: center;
		background-color: var(--color-global-bg);
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

	.error__wrapper {
		& > * {
			--flow-space: 0.25em;
		}

		h4 {
			font-size: var(--size-step-0);
		}

		p {
			font-size: var(--text-size-meta);
		}
	}
</style>
