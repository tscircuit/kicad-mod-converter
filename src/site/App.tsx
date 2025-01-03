export const App = () => {
  const isKicadModUploaded = false

  return (
    <>
      <div
        className="min-h-screen bg-gray-900 text-white p-4"
        // onDrop={handleDrop}
        // onDragOver={(e) => e.preventDefault()}
        // onPaste={handlePaste}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: we need this for drag and drop
        tabIndex={0}
      >
                <div className="space-y-4">
                  <p className="text-gray-400 mb-2">
                    Drag and drop or paste both required files:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-md">
                      <span
                        className={
                          isKicadModUploaded
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {isKicadModUploaded ? "✅" : "❌"}
                      </span>
                      <span className="text-gray-300">Session File</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-md">
                      <span
                        className={
                          isKicadModUploaded
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {isKicadModUploaded ? "✅" : "❌"}
                      </span>
                      <span className="text-gray-300">Kicad Mod File</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 mb-2">
                    Drag and drop a DSN file here
                  </p>
                  <p className="text-gray-400">
                    or paste DSN content with Ctrl/CMD+V
                  </p>
                  <div className="flex gap-4 justify-center mt-6">
                    <button
                      className="underline hover:text-blue-400"
                      onClick={() => {
                        // fetch("/exampledsn.dsn")
                        //   .then((response) => response.text())
                        //   .then(processFile)
                        //   .catch(() =>
                        //     setError("Failed to load example DSN file."),
                        //   )
                      }}
                    >
                      open example
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="text-gray-400 text-sm mt-16">
              KiCad Component Viewer and Converter
              <a
                className="underline hover:text-blue-400"
                href="https://github.com/tscircuit/tscircuit"
              >
                tscircuit
              </a>
              , get the{" "}
              <a
                className="underline"
                href="https://github.com/tscircuit/kicad-component-converter"
              >
                source code here
              </a>
              .
            </div>
            <a className="mt-4" href="https://github.com/tscircuit/tscircuit">
              <img
                src="https://img.shields.io/github/stars/tscircuit/kicad-component-converter?style=social"
                alt="GitHub stars"
              />
            </a>
          </div>
        )}
      </div>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
    </>
  )
}
