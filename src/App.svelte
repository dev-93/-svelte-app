<script>
	import Todo from "./Todo.svelte";
	import { writable } from "svelte/store";

	let todos = writable([
		{ id: 1, done: false, description: 'write some docs'},
		{ id: 2, done: false, description: 'start writing JSConf talk'},
		{ id: 3, done: true, description: 'buy some milk'},
		{ id: 4, done: false, description: 'mow the lawn'},
		{ id: 5, done: false, description: 'feed the turtle'},
		{ id: 6, done: false, description: 'fix some bugs'},
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
			<Todo {todos} {todo} />
		{/each}
	</div>

	<div class="right">
		<h2>done</h2>
		{#each $todos?.filter(t => t.done) as todo (todo.id)}
			<Todo {todos} {todo} class="done"/>
		{/each}
	</div>
</div>

<style>
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