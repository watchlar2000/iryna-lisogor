<script lang="ts">
	import Modal from './Modal.svelte';

	export let onresult: (result: boolean) => Promise<void>;
	// export let oncallback: (result: boolean) => void;
	export let title = 'Are you sure?';
	export let label: string;
	export let labelType: 'reset' | 'submit' = 'reset';
	export let description: string | undefined = undefined;

	let modal: Modal;
	let processingOnresult = false;

	export const open = () => {
		modal.open();
	};

	const close = async (result: boolean) => {
		processingOnresult = true;
		await onresult(result);
		processingOnresult = false;
		modal.close();
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
			{processingOnresult ? 'Processing' : label}
		</button>
		<button class="button" on:click={() => close(false)}> Cancel </button>
	</div>
</Modal>

<style lang="scss">
	div:has(> button) {
		--cluster-direction: row;
		--cluster-horizontal-alignment: center;
		// --cluster-wrap: nowrap;

		width: 100%;
	}
</style>
