<script lang="ts">
	import Icon from '../Icon.svelte';

	export let onclose;
	// export let commands;

	export let showModal = true;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	// const closeDialog = () => {
	// 	dialog.close();
	// 	showModal = false;
	// };

	export const open = () => {
		dialog.showModal();
	};

	export const close = () => {
		dialog.close();
		showModal = false;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={close}>
	<div class="wrapper cluster">
		<button on:click={close}>
			<Icon name="close" height="1.25rem" />
			<span class="visually-hidden">Close dialog window</span>
		</button>
		<div class="dialog__content flow cluster">
			<slot name="header" />
			<slot name="commands" />
		</div>
	</div>
</dialog>

<style lang="scss">
	:root {
		--dialog-width: 40ch;
	}

	.dialog__content {
		width: 100%;

		& > div:last-of-type {
			color: orange;
		}
	}

	dialog {
		max-width: var(--dialog-width);
		border-radius: 1rem;
		border: none;
		padding: 0;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
	}

	dialog .wrapper {
		--cluster-direction: column;

		padding-block: var(--space-s);

		button {
			align-self: self-end;
		}

		/* padding: var(--space-m); */
		/* background-color: var(--color-light); */
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
