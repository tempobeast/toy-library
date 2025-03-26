class Toy < ApplicationRecord

    validates :name, presence: :true, on: :create
    validates :description, presence: :true, on: :create
    validates :sku, presence: :true, on: :create, :numericality => {greater_than: 0}
    validates :purchase_price, presence: :true, on: :create, :numericality => {greater_than: 0}
    validates :inventory, presence: :true, on: :create, :numericality => {greater_than: 0}
    validates :img_url, presence: :true, on: :create
    

    def review_average 
        count = self.poly_reviews.length
        total_stars = self.poly_reviews.sum(:stars).to_f
        avg = 0
        if count > 0
            avg = total_stars / count
        end
        avg.round(1)
    end

    has_many :users, through: :poly_reviews
    has_many :poly_reviews, as: :reviewable
    has_many :watch_lists
    has_many :cart_items
    has_many :watching_users, through: :watch_lists, source: :user
end
