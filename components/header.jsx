const Header = () => {
  return (
    <header className="flex flex-row justify-between border-b border-aux shadow-lg mb-24 w-full">
      <div className="ml-12">
        <a href="/" alt="Home">
          <button>
            <img src="/lazycat-logo-letters-dark.png" alt="logo" width="80" />
          </button>
        </a>
      </div>
    </header>
  )
}

export default Header
