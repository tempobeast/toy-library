require 'rails_helper'

RSpec.describe PolyReview, type: :model do
  context 'when creating a review' do
    it 'stores the correct star value' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")
      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create!(stars: 4, reviewable: toy, user: user)
      expect(review.stars).to eq(4)
    end

    it 'is valid if stars are between 1 and 5' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")

      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create(stars: 2, reviewable: toy, user: user)
      expect(review.valid?).to eq(true)
    end

    it 'is not valid if stars greater than 5' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")
      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create(stars: 8, reviewable: toy, user: user)
      expect(review.valid?).to eq(false)
    end

    it 'is not valid if stars less than 1' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")
      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create(stars: 0, reviewable: toy, user: user)
      expect(review.valid?).to eq(false)
    end

    it 'is not valid with nil star value' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")
      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create(stars: nil, reviewable: toy, user: user)
      expect(review.valid?).to eq(false)
    end

    it 'is not valid if star value is not a number' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")
      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create(stars: "four", reviewable: toy, user: user)
      expect(review.valid?).to eq(false)
    end

    it 'is not valid if stars greater than 5' do
      user = User.create(username: "bob", password: "Abcdefghi", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")
      toy = Toy.create(name: "toy", description: "toy description", sku: 1111, purchase_price: 20, inventory: 1, img_url: "image.url")
      review = PolyReview.create(stars: 3, reviewable: toy, user: user)
      expect(review.reviewable_type).to eq("Toy")
    end

    

  end
end