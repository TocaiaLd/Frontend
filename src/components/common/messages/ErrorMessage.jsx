function ErrorMessage({message}) {
  return (
    <div className="max-w-3xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {message}
    </div>
  )
}

export default ErrorMessage
