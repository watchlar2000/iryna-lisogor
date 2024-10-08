<script lang="ts">
	export let showModal: boolean = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	{...$$restProps}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flow" on:click|stopPropagation>
		<h2 class="test">
			<slot name="header" />
		</h2>
		<div>
			<slot />
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="button">Close</button>
	</div>
</dialog>

<style>
	:root {
		--dialog-width: 40ch;
	}

	dialog {
		max-width: var(--dialog-width);
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
	}

	dialog > div {
		padding: var(--space-m);
		background-color: var(--color-light);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
