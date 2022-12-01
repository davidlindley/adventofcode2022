import sass from 'sass'
import path from 'path'

// Run the sass
sass.compile(path.resolve(process.cwd(), 'day1', 'sass', 'day1.scss'),
{
  loadPaths: ['node_modules']
})