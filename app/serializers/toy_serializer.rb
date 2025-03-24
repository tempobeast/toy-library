class ToySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :sku, :purchase_price, :inventory, :age_range, :img_url, :review_average

  has_many :poly_reviews
  has_many :watch_lists
end
