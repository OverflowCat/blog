<script>
  $: hidden = true;
  function toogle() {
    hidden = !hidden;
  }
  function toogle_a11y(event) {
    if (event.key === "Enter" || event.key === " ") {
      toogle();
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if hidden}<span class="cloze mask" on:click={toogle} on:keypress={toogle_a11y}
    >[...]</span
  >{/if}<span
  role="checkbox"
  aria-checked={hidden}
  tabindex="0"
  class="cloze ans"
  class:hidden
  on:click={toogle}
  on:keypress={toogle_a11y}><slot /></span
>

<style>
  .cloze.hidden {
    display: none;
  }
  .mask {
    user-select: none;
  }
  .cloze {
    cursor: pointer; /* 设置鼠标图标为手指 */
    color: #008007;
    font-weight: 600;
  }
  .cloze:hover {
    text-decoration: underline; /* 添加下划线 */
  }
</style>
