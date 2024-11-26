<script lang="ts">
	import Modal from './Modal.svelte';

	export let onresult: (result: boolean) => Promise<void>;
	export let title = 'Are you sure?';
	export let label: string;
	export let labelType: 'reset' | 'submit' = 'reset';
	export let description: string | undefined = undefined;

	let modal: Modal;

	export const open = () => {
		modal.open();
	};

	const close = (result: boolean) => {
		modal.close();
		onresult(result);
	};
</script>

<Modal bind:this={modal}>
	<div slot="header" class="flow">
		<h3>{title}</h3>
		{#if description}
			<p>{description}</p>
		{/if}
	</div>
	<div slot="commands" class="cluster">
		<button type={labelType} on:click={() => close(true)}>
			{label}
		</button>
		<button class="button" on:click={() => close(false)}> Cancel </button>
	</div>
</Modal>

<style lang="scss">
	div:has(> button) {
		--cluster-direction: row;
		--cluster-horizontal-alignment: center;

		width: 100%;
	}
</style>
