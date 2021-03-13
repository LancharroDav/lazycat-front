const Footer = () => {
  return (
    <footer className="w-full bg-main h-12 text-aux flex place-items-center fixed bottom-0">
      <div className="w-full justify-center flex flex-row space-x-4">
        <p>Created by</p>
        <a href="https://www.linkedin.com/in/lancharrodav/" target="__blank" alt="linkedin-profile">
          <button className="text-remark hover:underline">David Garcia Lancharro</button>
        </a>
      </div>
    </footer>
  )
}

export default Footer