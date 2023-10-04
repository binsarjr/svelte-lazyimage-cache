<script lang="ts">
	import { lazyimage } from '$lib';

	let placeholder = 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif';
	let images: string[] = [
		// same url will load in cache
		'https://images.unsplash.com/photo-1667210211813-9a0bbbaa5623?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=430&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2Nzk2MzI3NA&ixlib=rb-4.0.3&q=80&w=430'
	];
	for (let i = 0; i < 50; i++) {
		let size = Math.floor(Math.random() * 300);
		images.push('https://random.imagecdn.app/' + size + '/' + size);
	}
</script>

<h1 class="text-center my-3">Svelete Lazy Image Cache</h1>
<p class="border-start border-4 border-warning-subtle px-2">Check your network tab for check lazy image is working or not</p>

<div class="row">
  {#each images as image, i}
  	<div class="col-12 col-md-6 col-lg-3">
  		<img class="border rounded mx-auto d-block mb-2 w-100" src={placeholder} alt="image {i}" data-src={image} use:lazyimage />
  	</div>
  {/each}
</div>
