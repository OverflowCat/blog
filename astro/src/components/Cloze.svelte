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

<span class="cloze" on:click={toogle} on:keypress={toogle_a11y}>
  {#if hidden}
    <span class="mask">[...]</span>
  {:else}
    <span class="ans"><slot /></span>
  {/if}
</span>

<style>
  /* .hidd {
    display: none;
  } */
  .mask {
    user-select: none;
  }
  .cloze {
    cursor: pointer; /* 设置鼠标图标为手指 */
    color: rgb(0, 100, 0);
    font-weight: 600;
  }
  .cloze:hover {
    text-decoration: underline; /* 添加下划线 */
  }
</style>
