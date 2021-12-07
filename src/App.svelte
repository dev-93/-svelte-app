<script>
	const add = (input) => {
		console.log(input.value);
	}
</script>


<div class="board">
	<input 
		class="new-todo"
		placeholder="what needs to be done?"
		on:keydown={e => e.key === "Enter" && add(e.target)}
	/>

	<div class="left">
		<h2>todo</h2>
		<label>
			<input type="checkbox"/>
			<button>x</button>
		</label>
	</div>

	<div class="right">
		<h2>done</h2>
		<label>
			<input type="checkbox"/>
			<button>x</button>
		</label>
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

	label {
		top: 0;
		left: 0;
		display: block;
		font-size: 1em;
		line-height: 1;
		padding: 0.5em;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
	}

	input { margin: 0 }

	.right label {
		background-color: rgb(180,240,100);
	}

	button {
		float: right;
		height: 1em;
		box-sizing: border-box;
		padding: 0 0.5em;
		line-height: 1;
		background-color: transparent;
		border: none;
		color: rgb(170,30,30);
		opacity: 0;
		transition: opacity 0.2s;
	}

	label:hover button {
		opacity: 1;
	}
</style>