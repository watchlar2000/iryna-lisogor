<script></script>

<!--<h1>Hello! To enter the dashboard, please pass through the verification</h1>-->
<!--<form action="?/login" method="POST">-->
<!--	<label>-->
<!--		Email-->
<!--		<input name="email" type="email" />-->
<!--	</label>-->
<!--	<label>-->
<!--		Password-->
<!--		<input name="password" type="password" />-->
<!--	</label>-->
<!--	<button>Login</button>-->
<!--	<button formaction="?/signup">Sign up</button>-->
<!--</form>-->

<!--<blockquote class="blockquote">Skeleton</blockquote>-->

<!--Press<kbd class="kbd">⌘ + C</kbd> to copy.-->

<div class="grid place-content-center min-h-screen">
	<form action="?/login" class="flex flex-col gap-5 mt-4" method="POST">
		<!--		<label class="label">-->
		<!--			<span>Email</span>-->
		<!--			<input class="input" name="email" placeholder="email" type="text" />-->
		<!--		</label>-->
		<!--		<label class="label">-->
		<!--			<span>Password</span>-->
		<!--			<input class="input" name="password" placeholder="Password" type="password" />-->
		<!--		</label>-->
		<!--		<button class="btn">Login</button>-->
		<div>
			<label class="block text-sm font-medium leading-6 text-gray-900" for="email"
				>Email address</label
			>
			<div class="mt-2">
				<input
					autocomplete="email"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					id="email"
					name="email"
					required
					type="email"
				/>
			</div>
		</div>

		<div>
			<div class="flex items-center justify-between">
				<label class="block text-sm font-medium leading-6 text-gray-900" for="password"
					>Password</label
				>
			</div>
			<div class="mt-2">
				<input
					autocomplete="current-password"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					id="password"
					name="password"
					required
					type="password"
				/>
			</div>
		</div>

		<div>
			<button
				class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				type="submit"
			>
				Log in
			</button>
		</div>
	</form>
</div>
