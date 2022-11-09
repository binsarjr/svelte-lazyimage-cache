# Svelte Lazy Image Cache
Lazy Image with IntersectionObserver and cache action for Svelte/SvelteKit.

## Contributing
better docs

## Installation
```bash
// Using Yarn to install
yarn add --dev svelte-lazyimage-cache

// or if you prefer NPM
npm install --save-dev svelte-lazyimage-cache
```

## Usage Sample
```svelte
<script>
  // 	for first time you will get all image from this load from internet
// 	its normal because no image cached before
// 	so if you wanna see its working, try it will with change looping or something reactivity will work
	import {lazyimage} from 'svelte-lazyimage-cache'
	const placeholder = 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'
// 	try change size and see image load from internet or cache
	const src='https://random.imagecdn.app/200/250'
	const alt="Random Image"
	
	let onlyForLooping=[]
	for(let i=0;i<100;i++){
		onlyForLooping[onlyForLooping.length]=''
	}
</script>

<!-- No Cache -->
<img use:lazyimage={{cache:false}} src={placeholder} data-src="{src}" {alt} on:cacheload={()=>console.log('load from cache')} on:imgload={() => console.log("Load from internet")}/>

<!--
Check console when scrolling. if your brwoser support intersection observer
and you enable cache,another image with same url (cached) will use instead of load from internet
-->
{#each onlyForLooping as _}
<!-- With Cache  -->
<img use:lazyimage src={placeholder} data-src={src} {alt} on:cacheload={()=>console.log('load from cache')} on:imgload={() => console.log("Load from internet")}/>
{/each}
  
```

