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
      {/* <div className="mr-12 place-items-center flex flex-row text-main">
        <a>
          <button className="hover:underline hover:text-aux">About</button>
        </a>
      </div> */}
    </header>
  )
}

export default Header