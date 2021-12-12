<script>
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    export let todos;
    export let todo;

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

	let isEdit = false;
	let description = todo.description;

    const onEdit = () => {
        isEdit = true;
    };

	const offEdit = () => {
        isEdit = false;
    };

	const update = () => {
		todo.description = description;
		offEdit();
    };

    const remove = (todo) => {
		$todos = $todos.filter(t => t !== todo);
	};

	const inputChange = (todo) => {
		todos.set(
			$todos.map(t => t.id === todo.id ? {
				...t,
				done: !t.done
			} : t)
		);
	}
</script>

{#if isEdit}
	<div 
		class="edit_container"
		in:receive="{{key: todo.id}}"
		out:send="{{key: todo.id}}"
	>
		<input 
			type="text"
			bind:value={description}
			on:keydown="{e => {e.key === "Enter" && update()}}"
		/>
		<button on:click="{() => update()}">OK</button>
		<button on:click="{offEdit}">Cancel</button>
	</div>
{:else}
	<label
		in:receive="{{key: todo.id}}"
		out:send="{{key: todo.id}}"
		class={$$props.class}
	>
		<input type=checkbox on:change="{() => inputChange(todo)}" bind:checked={todo.done}/>
		<span>{todo.description}</span>
		<button class="update" on:click="{() => onEdit(todo)}">edit</button>
		<button class="delete" on:click="{() => remove(todo)}">remove</button>
	</label>
{/if}

<style>
	.edit_container {
		display: flex;
	}

	.edit_container input {
		width: 70%;
	}

    label {
		display: flex;
		font-size: 1em;
		line-height: 1.5;
		padding: 0.5em;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
		align-items: center;
	}

	label.done {
		background-color: rgb(180,240,100);
	}

	label input {
		margin: 0;
	}

	label span {
		margin-left:10px;
	}

    button.update {
		margin-left: auto;
    }
    
    button.delete {
		width: 2em;
		height: 100%;
		border: none;
		transition: opacity 0.2s;
		cursor: pointer;
		right: 0.2em;
		background-size: 1.4em 1.4em;
		text-indent: -9999px;
		background: no-repeat 50% 50% url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
	}

	label:hover button {
		opacity: 1;
	}
</style>