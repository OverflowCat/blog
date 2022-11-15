<style>
  :root {
    --accent: 124, 58, 237;
    --accent-gradient: linear-gradient(45deg, rgb(var(--accent)), #da62c4 30%, white 60%)
  }

  html {
    font-family: system-ui, sans-serif;
    background-color: #f6f6f6
  }

  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace
  }

  .link-card:where(.ast) {
    list-style: none;
    display: flex;
    padding: 0;
    background-color: #fff;
    background-image: var(--accent-gradient);
    background-size: 400%;
    border-radius: .5rem;
    background-position: 100%;
    transition: background-position .6s cubic-bezier(.22, 1, .36, 1);
    box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a
  }

  .link-card:where(.ast)>a:where(.ast) {
    width: 100%;
    text-decoration: none;
    line-height: 1.4;
    padding: 1rem 1.3rem;
    border-radius: .35rem;
    color: #111;
    background-color: #fff;
    opacity: .8
  }

  h2:where(.ast) {
    margin: 0;
    font-size: 1.25rem;
    transition: color .6s cubic-bezier(.22, 1, .36, 1)
  }

  p:where(.ast) {
    margin-top: .5rem;
    margin-bottom: 0;
    color: #444
  }

  .link-card:where(.ast):is(:hover, :focus-within) {
    background-position: 0
  }

  .link-card:where(.ast):is(:hover, :focus-within) h2:where(.ast) {
    color: rgb(var(--accent))
  }

  img:where(.ast).avatar {
    height: 48px;
    width: 48px;
    object-fit: cover;
  }

  .title:where(.ast) {
    grid-area: title
  }

  .avatar:where(.ast) {
    grid-area: avatar
  }

  .quote:where(.ast) {
    grid-area: quote;
    text-align: left
  }

  .link:where(.ast) {
    grid-area: link
  }

  .grid-container:where(.ast) {
    display: grid;
    grid-template-areas: "title title title title avatar" "link  link  link  link  avatar" "quote quote quote quote quote" "quote quote quote quote quote" "quote quote quote quote quote";
    gap: .5rem;
    padding: .15rem
  }

  main:where(.ast6) {
    margin: auto;
    padding: 1.5rem;
    max-width: 60ch
  }

  h1:where(.ast6) {
    font-size: 3rem;
    font-weight: 800;
    margin: 0
  }

  .text-gradient:where(.ast6) {
    background-image: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400%;
    background-position: 0%
  }

  .instructions:where(.ast6) {
    line-height: 1.6;
    margin: 1rem 0;
    border: 1px solid rgba(var(--accent), 25%);
    background-color: #fff;
    padding: 1rem;
    border-radius: .4rem
  }

  .instructions:where(.ast6) code:where(.ast6) {
    font-size: .875em;
    font-weight: 700;
    background: rgba(var(--accent), 12%);
    color: rgb(var(--accent));
    border-radius: 4px;
    padding: .3em .45em
  }

  .instructions:where(.ast6) strong:where(.ast6) {
    color: rgb(var(--accent))
  }

  .link-card-grid:where(.ast6) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
    gap: 1rem;
    padding: 0
  }

  blockquote:where(.ast6) {
    margin: .5rem;
    padding-left: .5rem
  }
</style>
<main class="ast6">
  <h1 class="ast6">猫猫的<span class="text-gradient ast6">朋友们</span></h1>
  <p class="instructions ast6">可爱喵！</p>
  <ul role="list" class="link-card-grid ast6">
    <li class="link-card ast">
      <a href="https://blog.hongdou.dev" class="ast">
        <div class="grid-container ast">
          <div class="title ast">
            <h2 class="ast">红豆的猫窝</h2>
          </div>
          <img class="avatar ast"
            src="//telegra.ph/file/2d55a0dadc16a08c3f652.png">
          <div class="link ast">
            <p id="link" class="ast"><code class="ast">blog.hongdou.dev</code></p>
          </div>
          <div class="quote ast">
            <blockquote class="ast6">
              红豆豆
            </blockquote>
          </div>
        </div>
      </a>
    </li>
    <li class="link-card ast">
      <a href="https://bersella-ai.cc" class="ast">
        <div class="grid-container ast">
          <div class="title ast">
            <h2 class="ast">Bersella AI</h2>
          </div>
          <img class="avatar ast" src="//bersella-ai.cc/uploads/avatar.png">
          <div class="link ast">
            <p id="link" class="ast"><code class="ast">bersella-ai.cc</code></p>
          </div>
          <div class="quote ast">
            <blockquote class="ast6">My memories & dreams</blockquote>
          </div>
        </div>
      </a>
    </li>
  </ul>
</main>