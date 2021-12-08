<script>
	import Todo from "./Todo.svelte";
	import { crossfade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
	import { writable } from "svelte/store";

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === "none" ? "" : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	})

	let todos = writable([
		{ id: 1, done: false, description: 'write some docs', isEdit: false },
		{ id: 2, done: false, description: 'start writing JSConf talk', isEdit: false },
		{ id: 3, done: true, description: 'buy some milk', isEdit: false },
		{ id: 4, done: false, description: 'mow the lawn', isEdit: false },
		{ id: 5, done: false, description: 'feed the turtle', isEdit: false },
		{ id: 6, done: false, description: 'fix some bugs', isEdit: false },
	]);

	let uid = $todos.length + 1;

	const add = (input) => {
		if(input.value === "") {
			return;
		}

		const todo = {
			id: uid++,
			done: false,
			description: input.value,
			isEdit: false
		};

		$todos = [todo, ...$todos];
		input.value = '';
	};
</script>


<div class="board">
	<input 
		class="new-todo"
		placeholder="what needs to be done?"
		on:keydown={e => e.key === "Enter" && add(e.target)}
	/>

	<div class="left">
		<h2>todo</h2>
		{#each $todos?.filter(t => !t.done) as todo (todo.id)}
			<Todo {todos} {todo} {send} {receive}/>
		{/each}
	</div>

	<div class="right">
		<h2>done</h2>
		{#each $todos?.filter(t => t.done) as todo (todo.id)}
			<Todo {todos} {todo} {send} {receive}/>
		{/each}
	</div>
</div>

<style global>
	.new-todo {
		font-size: 1.4em;
		width: 100%;
		margin: 2em 0 1em 0;
	}

	.board {
		max-width: 36em;
		margin: 0 auto;
	}

	.left, .right {
		float: left;
		width: 50%;
		padding: 0 1em 0 0;
		box-sizing: border-box;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
	}

	input { margin: 0 }
</style>