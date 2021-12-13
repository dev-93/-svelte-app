<script>
	import Todo from "./Todo.svelte";
	import { afterUpdate } from 'svelte';
	import RedThing from './RedThing.svelte';
	import GreenThing from './GreenThing.svelte';
	import BlueThing from './BlueThing.svelte';
	import {todos} from "./store";

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

	let todoCount;
	let doneCount;

	afterUpdate(() => {
		todoCount = $todos?.filter(t => !t.done).length;
		doneCount = $todos?.filter(t => t.done).length;
	});

	const options = [
		{ color: 'red',   component: RedThing   },
		{ color: 'green', component: GreenThing },
		{ color: 'blue',  component: BlueThing  },
	];

	let selected = options[0];
</script>

<div class="wrapper">
	<select bind:value={selected}>
		{#each options as option}
			<option value={option}>{option.color}</option>
		{/each}
	</select>

	<svelte:component this={selected.component}/>

	<div class="board">
		<input 
			class="new-todo"
			placeholder="what needs to be done?"
			on:keydown={e => e.key === "Enter" && add(e.target)}
		/>
	
		<div class="left">
			<div class="title">
				<h2>todo </h2>
				<span>count {todoCount}</span>
			</div>
			{#each $todos?.filter(t => !t.done) as todo (todo.id)}
				<Todo {todos} {todo} />
			{/each}
		</div>
	
		<div class="right">
			<div class="title">
				<h2>done </h2>
				<span>count {doneCount}</span>
			</div>
			{#each $todos?.filter(t => t.done) as todo (todo.id)}
				<Todo {todos} {todo} class="done"/>
			{/each}
		</div>
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

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
	}

	input { margin: 0 }
</style>