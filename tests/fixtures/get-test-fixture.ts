export const getTestFixture = async () => {
  return {
    getKicadFile: (fileName: string) => {
      return Bun.file(`tests/fixtures/${fileName}`).text()
    },
  }
}
