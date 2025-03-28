
puts "start the seeding"

Toy.create({name: "Buzz", description: "Space Ranger", sku: 2321, purchase_price: 25, inventory: 5, age_range: "2-5", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1231000442875?fmt=jpeg&qlt=90&wid=652&hei=652"})
Toy.create({name: "Woody", description: "Local Sheriff", sku: 2322, purchase_price: 25, inventory: 5, age_range: "5+", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101036512835-2?fmt=jpeg&qlt=90&wid=652&hei=652"})
Toy.create({name: "Rex", description: "Fearful T-Rex", sku: 2323, purchase_price: 22, inventory: 5, age_range: "6-7", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101047622890"})
Toy.create({name: "Jessie", description: "Bronc bustin', cattle drivin' cowgirl", sku: 2325, purchase_price: 22, inventory: 5, age_range: "4-8", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101036512836"})
Toy.create({name: "Trixie", description: "Blue Triceratops", sku: 2324, purchase_price: 22, inventory: 5, age_range: "5+", img_url: "https://i5.walmartimages.com/asr/ffa7a948-beb7-40a0-ba1c-2917db35334f_1.150adc44aac94256bb7b0bfdb6932a2a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"})
Toy.create({name: "RC", description: "Speedy Remote-control racecar", sku: 2326, purchase_price: 25, inventory: 5, age_range: "10+", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101036513381"})
Toy.create({name: "Bo Peep", description: "Sheep Hearder by day, adventurer by night", sku: 2327, purchase_price: 22, inventory: 5, age_range: "4-8", img_url: "https://i5.walmartimages.com/asr/28287348-5adf-4fe1-8dcf-d024d489a2d7_1.14b870ec9543abcc96a47c843805ab9b.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF"})
Toy.create({name: "Bullseye", description: "Trusty Steed", sku: 2328, purchase_price: 22, inventory: 5, age_range: "2-8", img_url: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6101036512837"})
Toy.create({name: "Mr. Potato Head", description: "Potato with removable appendages and facial features", sku: 2329, purchase_price: 22, inventory: 5, age_range: "3-6", img_url: "https://secure.img1-cg.wfcdn.com/im/91321703/resize-h445%5Ecompr-r85/8377/83778475/Mr+Potato+Head+Disney/Pixar+Toy+Story+4+Cardboard+Standup.jpg"})
Toy.create({name: "Slinky Dog", description: "Slinky/Dog", sku: 2330, purchase_price: 22, inventory: 5, age_range: "8+", img_url: "https://m.media-amazon.com/images/I/71H0Jyg5uUL._AC_SX425_.jpg"})

StatusOfOrder.create(orderStatus: "all")
StatusOfOrder.create(orderStatus: "processing")
StatusOfOrder.create(orderStatus: "shipped")
StatusOfOrder.create(orderStatus: "returned")
StatusOfOrder.create(orderStatus: "restocked")

puts "done seeding"