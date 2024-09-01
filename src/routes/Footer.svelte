<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { IconEmail, IconInstagram, IconLinkedIn } from '../lib/components/icons';

	interface SocialLink {
		href: string;
		icon: ComponentType;
	}

	const socialLinks: SocialLink[] = [
		{
			href: 'https://www.instagram.com/iryna_lisogor/',
			icon: IconInstagram
		},
		{
			href: 'https://www.linkedin.com/in/iryna-lisogor-72975316a',
			icon: IconLinkedIn
		},
		{
			href: 'mailto:email@',
			icon: IconEmail
		}
	];
</script>

<footer class="w-full flex justify-center py-5 mt-5">
	<ul class="flex gap-4">
		{#each socialLinks as { href, icon } (href)}
			<li>
				<a {href}>
					<svelte:component this={icon} />
				</a>
			</li>
		{/each}
		<!-- <li>
			<a href="https://www.instagram.com/iryna_lisogor/">
				<IconInstagram />
			</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/in/iryna-lisogor-72975316a">
				<IconLinkedIn />
			</a>
		</li>
		<li>
			<a href="mailto:email@">
				<IconEmail />
			</a>
		</li> -->
	</ul>
</footer>
