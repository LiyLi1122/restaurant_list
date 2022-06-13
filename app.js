//variables/////
const express = require('express') 
const exphbs = require('express-handlebars') 
const restaurant_list = require('./restaurant.json')
const app = express()
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set routers//////
app.get('/', (request, response) => {
  response.render('index', {restaurant_list:restaurant_list.results})
})
//show specified page
app.get('/restaurants/:id', (request, response) => {
  const restaurant = restaurant_list.results.find(restaurant =>  restaurant.id === + request.params.id ) 
  response.render('show', {restaurant})
})
//search keywords
app.get('/search', (request, response) => {
  const keyword = request.query.keyword.trim()
  const searchList = restaurant_list.results.filter(restaurant => { 
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) || (restaurant.category.includes(keyword))
  }) 
  response.render('index', { restaurant_list: searchList, keyword })
})


app.use(express.static('public'))

app.listen(port, () => { 
  console.log(`This is running on http://localhost:${port}`)
})




