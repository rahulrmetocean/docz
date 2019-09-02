const path = require('path')
const fs = require('fs')

const getPackageJson = () => {
  try {
    const pathToPackageJson = path.resolve('../package.json')
    const packageJson = fs.readFileSync(pathToPackageJson)
    return JSON.parse(packageJson)
  } catch (err) {
    throw new Error(
      'Could not find a valid package.json at root path ' + pathToPackageJson
    )
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  const packageJson = getPackageJson()
  const dependencies = packageJson.dependencies
  const dependenciesNames = Object.keys(dependencies)
  const alias = {}

  for (let dependencyName of dependenciesNames) {
    alias[dependencyName] = path.resolve(`../node_modules/${dependencyName}`)
  }
  // const doczDependency = "@mdx-js/react"; //"gatsby-theme-docz";
  // alias[doczDependency] = path.resolve(`./node_modules/${doczDependency}`);
  // console.warn("onCreateWebpackConfig", alias);
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve('../node_modules')],
      alias,
    },
  })
}
