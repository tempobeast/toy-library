# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "start the seeding"

Toy.create({name: "Buzz", description: "Space Ranger", sku: 2321, purchase_price: 25, inventory: 5, age_range: "5+", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1231000442875?fmt=jpeg&qlt=90&wid=652&hei=652"})
Toy.create({name: "Woody", description: "Local Sheriff", sku: 2322, purchase_price: 25, inventory: 5, age_range: "5+", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101036512835-2?fmt=jpeg&qlt=90&wid=652&hei=652"})
Toy.create({name: "Rex", description: "Fearful T-Rex", sku: 2323, purchase_price: 22, inventory: 5, age_range: "5+", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101047622890"})
Toy.create({name: "Trixie", description: "Blue Triceratops", sku: 2324, purchase_price: 22, inventory: 5, age_range: "5+", img_url: "https://i5.walmartimages.com/asr/ffa7a948-beb7-40a0-ba1c-2917db35334f_1.150adc44aac94256bb7b0bfdb6932a2a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"})

User.create({username: "Zach", password: "123", first_name: "Zach", last_name: "Shaw", email: "zach@shaw.com", telephone: "4254454545"})
User.create({username: "Kate", password: "123", first_name: "Kate", last_name: "Shaw", email: "kate@shaw.com", telephone: "4254454545"})
User.create({username: "Lee", password: "123", first_name: "Lee", last_name: "Shaw", email: "lee@shaw.com", telephone: "4254454545"})
User.create({username: "Mavis", password: "123", first_name: "Mavis", last_name: "Shaw", email: "mavis@shaw.com", telephone: "4254454545"})


puts "done seeding"